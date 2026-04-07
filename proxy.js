const http  = require("http");
const https = require("https");
const fs    = require("fs");
const path  = require("path");
const url   = require("url");

const PORT = 3000;

const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);

  // ── CORS headers ─────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Shopify-Access-Token");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── SHOPIFY PROXY ─────────────────────────────────────────
  if (parsed.pathname.startsWith("/shopify/")) {
    const shopifyPath = parsed.pathname.replace("/shopify/", "");
    const shopDomain  = req.headers["x-shop-domain"];
    const shopToken   = req.headers["x-shopify-access-token"];

    if (!shopDomain || !shopToken) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing x-shop-domain or x-shopify-access-token headers" }));
      return;
    }

    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const options = {
        hostname: `${shopDomain}.myshopify.com`,
        path: `/admin/api/2024-01/${shopifyPath}`,
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopToken,
          "Content-Length": Buffer.byteLength(body || ""),
        },
      };

      console.log(`[Shopify] ${req.method} → ${options.hostname}${options.path}`);

      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        });
        proxyRes.pipe(res);
      });

      proxyReq.on("error", (err) => {
        console.error("[Shopify proxy error]", err.message);
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      });

      if (body) proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  // ── SERVE STATIC FILES ─────────────────────────────────────
  let filePath = path.join(__dirname, parsed.pathname === "/" ? "index.html" : parsed.pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // fallback to index.html for SPA
      fs.readFile(path.join(__dirname, "index.html"), (e2, d2) => {
        if (e2) {
          res.writeHead(404);
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(d2);
        }
      });
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("\n╔══════════════════════════════════════════╗");
  console.log("║   DropIntel — Servidor Local             ║");
  console.log(`║   http://localhost:${PORT}                  ║`);
  console.log("╠══════════════════════════════════════════╣");
  console.log("║  Proxy Shopify: /shopify/products.json   ║");
  console.log("║  Headers:                                ║");
  console.log("║    x-shop-domain: sua-loja               ║");
  console.log("║    x-shopify-access-token: shpat_...     ║");
  console.log("╚══════════════════════════════════════════╝\n");
});
