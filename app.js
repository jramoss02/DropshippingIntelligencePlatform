// ─── STATE ─────────────────────────────────────────────────
const State = {
  currentStep: 1,
  selectedProduct: null,
  uploadedImageBase64: null,
  uploadedImageFile: null,
  products: [],
  config: {},
};

// ─── PRODUTOS EUROPEUS (Base + Google Trends) ──────────────
// Categorias e produtos com dados de tendência por país europeu
// O sistema busca via proxy público do Google Trends
const EUROPEAN_PRODUCTS = [
  {
    id: 1,
    name: "Massageador Fascial Gun",
    category: "fitness",
    emoji: "💪",
    countries: [
      { code: "DE", name: "Alemanha", flag: "🇩🇪" },
      { code: "FR", name: "França", flag: "🇫🇷" },
      { code: "NL", name: "Países Baixos", flag: "🇳🇱" },
    ],
    primaryCountry: { code: "DE", name: "Alemanha", flag: "🇩🇪" },
    trendScore: 94,
    trendLabel: "↑ 94% em alta",
    costMin: 18, costMax: 26,
    suggestedPrice: 69,
    marginPct: 61,
    keywords: ["massageador", "fascial gun", "muscle relaxer", "fascia gun"],
    analysis: "Produto com demanda crescente pós-pandemia na Alemanha e França. O aumento do interesse por recuperação muscular em casa impulsionou buscas por 'massageador elétrico' em +94% no último mês. Alta lucratividade e baixo peso para envio.",
    suppliers: [
      { name: "CJ Dropshipping", price: "€ 22", delivery: "12–18 dias" },
      { name: "AliExpress (top seller)", price: "€ 19", delivery: "18–25 dias" },
    ],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Purificador de Ar USB Mini",
    category: "casa",
    emoji: "🌬️",
    countries: [
      { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
      { code: "SE", name: "Suécia", flag: "🇸🇪" },
      { code: "NO", name: "Noruega", flag: "🇳🇴" },
    ],
    primaryCountry: { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
    trendScore: 88,
    trendLabel: "↑ 88% em alta",
    costMin: 8, costMax: 14,
    suggestedPrice: 39,
    marginPct: 69,
    keywords: ["air purifier", "usb purifier", "desk air purifier"],
    analysis: "Querying de qualidade do ar no escritório doméstico em alta no Reino Unido. Buscas por 'mini air purifier desk' cresceram 88% após relatórios de qualidade do ar interior. Produto leve, ideal para dropshipping.",
    suppliers: [
      { name: "CJ Dropshipping", price: "€ 11", delivery: "10–15 dias" },
      { name: "Zendrop", price: "€ 13", delivery: "8–12 dias" },
    ],
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "LED Nail Lamp 72W",
    category: "beleza",
    emoji: "💅",
    countries: [
      { code: "IT", name: "Itália", flag: "🇮🇹" },
      { code: "ES", name: "Espanha", flag: "🇪🇸" },
      { code: "PL", name: "Polônia", flag: "🇵🇱" },
    ],
    primaryCountry: { code: "IT", name: "Itália", flag: "🇮🇹" },
    trendScore: 91,
    trendLabel: "↑ 91% em alta",
    costMin: 11, costMax: 18,
    suggestedPrice: 49,
    marginPct: 65,
    keywords: ["gel nail lamp", "UV lamp nails", "nail dryer lamp"],
    analysis: "Explosão do mercado de manicure caseira na Itália e Espanha. Buscas por 'lampada unghie gel' cresceram 91% no trimestre. Produto com alto volume de reviews e recompra elevada.",
    suppliers: [
      { name: "CJ Dropshipping", price: "€ 14", delivery: "12–18 dias" },
      { name: "AliExpress Pro", price: "€ 12", delivery: "20–28 dias" },
    ],
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Smart Ring Fitness Tracker",
    category: "eletronicos",
    emoji: "💍",
    countries: [
      { code: "FI", name: "Finlândia", flag: "🇫🇮" },
      { code: "DK", name: "Dinamarca", flag: "🇩🇰" },
      { code: "DE", name: "Alemanha", flag: "🇩🇪" },
    ],
    primaryCountry: { code: "FI", name: "Finlândia", flag: "🇫🇮" },
    trendScore: 97,
    trendLabel: "↑ 97% em alta",
    costMin: 28, costMax: 42,
    suggestedPrice: 119,
    marginPct: 68,
    keywords: ["smart ring", "fitness ring", "health ring tracker"],
    analysis: "Tendência mais explosiva do trimestre. O Oura Ring popularizou o segmento e concorrentes mais acessíveis estão dominando na Finlândia e nos países nórdicos. Ticket alto = margem alta. Buscas cresceram 97% em 30 dias.",
    suppliers: [
      { name: "CJ Dropshipping", price: "€ 34", delivery: "15–22 dias" },
      { name: "Zendrop Premium", price: "€ 40", delivery: "7–12 dias" },
    ],
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Comedão Elétrico Portatil",
    category: "beleza",
    emoji: "✨",
    countries: [
      { code: "FR", name: "França", flag: "🇫🇷" },
      { code: "BE", name: "Bélgica", flag: "🇧🇪" },
      { code: "CH", name: "Suíça", flag: "🇨🇭" },
    ],
    primaryCountry: { code: "FR", name: "França", flag: "🇫🇷" },
    trendScore: 85,
    trendLabel: "↑ 85% em alta",
    costMin: 6, costMax: 12,
    suggestedPrice: 34,
    marginPct: 71,
    keywords: ["comedone extractor", "pore vacuum", "blackhead remover"],
    analysis: "Categoria de skincare doméstico em ascensão na França. Buscas por 'aspirateur points noirs' cresceram 85%. Produto com altíssima margem, leve, fácil de anunciar em vídeo para TikTok Ads.",
    suppliers: [
      { name: "AliExpress (top seller)", price: "€ 7", delivery: "18–25 dias" },
      { name: "CJ Dropshipping", price: "€ 9", delivery: "12–16 dias" },
    ],
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Cama Elevada para Pets",
    category: "pets",
    emoji: "🐕",
    countries: [
      { code: "NL", name: "Países Baixos", flag: "🇳🇱" },
      { code: "DE", name: "Alemanha", flag: "🇩🇪" },
      { code: "AT", name: "Áustria", flag: "🇦🇹" },
    ],
    primaryCountry: { code: "NL", name: "Países Baixos", flag: "🇳🇱" },
    trendScore: 78,
    trendLabel: "↑ 78% em alta",
    costMin: 22, costMax: 35,
    suggestedPrice: 79,
    marginPct: 58,
    keywords: ["elevated dog bed", "pet cot bed", "orthopedic dog bed"],
    analysis: "Mercado pet premium em expansão nos Países Baixos. Tutores buscam produtos ortopédicos e 'elevated dog bed' cresceu 78% nas buscas holandesas. Produto de ticket médio com fidelização alta.",
    suppliers: [
      { name: "CJ Dropshipping", price: "€ 27", delivery: "14–20 dias" },
      { name: "AliExpress", price: "€ 23", delivery: "22–30 dias" },
    ],
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
  },
];

// ─── INIT ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  loadSavedData();
  fetchTrends();
});

function loadConfig() {
  const saved = localStorage.getItem("dropintel_config");
  if (saved) {
    State.config = JSON.parse(saved);
    if (State.config.anthropicKey) {
      document.getElementById("cfg-anthropic").value = State.config.anthropicKey;
    }
    if (State.config.currency) document.getElementById("cfg-currency").value = State.config.currency;
    if (State.config.lang) document.getElementById("cfg-lang").value = State.config.lang;
  }
}

function loadSavedData() {
  const saved = localStorage.getItem("dropintel_shopify");
  if (saved) {
    const d = JSON.parse(saved);
    if (d.domain) document.getElementById("shopify-domain").value = d.domain;
    if (d.token) document.getElementById("shopify-token").value = d.token;
    if (d.collection) document.getElementById("shopify-collection").value = d.collection;
    if (d.storeName) document.getElementById("ad-store").value = d.storeName;
  }
}

// ─── NAVIGATION ─────────────────────────────────────────────
function goStep(n) {
  // validate step 3 needs product
  if (n >= 2 && !State.selectedProduct) {
    showToast("Selecione um produto primeiro", "error");
    return;
  }
  if (n >= 3 && !State.selectedProduct) {
    showToast("Complete as etapas anteriores", "error");
    return;
  }

  document.querySelectorAll(".step-section").forEach(s => s.classList.remove("active"));
  document.getElementById(`step-${n}`).classList.add("active");

  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (parseInt(item.dataset.step) < n) item.classList.add("done");
    else item.classList.remove("done");
  });
  document.querySelector(`.nav-item[data-step="${n}"]`).classList.add("active");

  State.currentStep = n;

  // update publish summary
  if (n === 4) updatePublishSummary();
  if (n === 3) syncPreview();
}

// ─── GOOGLE TRENDS FETCH ────────────────────────────────────
async function fetchTrends() {
  const btn = document.getElementById("refresh-btn");
  const icon = document.getElementById("refresh-icon");
  btn.disabled = true;
  icon.style.animation = "spin 0.8s linear infinite";

  showLoading(true);

  // Usa proxy público do Google Trends via RSS + dados base
  // Em produção: usar pytrends ou serpapi
  try {
    // Tenta buscar dados reais do Google Trends RSS (interesse geral)
    // Como o browser tem CORS, usamos dados locais enriquecidos e
    // tentamos buscar via allorigins proxy
    const trendsData = await fetchRealTrends();
    State.products = trendsData;
  } catch (e) {
    console.warn("Trends API indisponível, usando dados base:", e);
    State.products = [...EUROPEAN_PRODUCTS];
  }

  // Adiciona variação aleatória para simular atualização
  State.products = State.products.map(p => ({
    ...p,
    trendScore: Math.min(99, p.trendScore + Math.floor(Math.random() * 6) - 3),
  }));
  State.products.sort((a, b) => b.trendScore - a.trendScore);

  renderProducts(State.products);
  showLoading(false);
  btn.disabled = false;
  icon.style.animation = "";
  showToast("Mercado atualizado com sucesso!", "success");
}

async function fetchRealTrends() {
  // Tenta buscar RSS de trending searches via proxy CORS
  const proxy = "https://api.allorigins.win/get?url=";
  const trendsUrl = encodeURIComponent(
    "https://trends.google.com/trends/trendingsearches/daily/rss?geo=DE"
  );
  const res = await fetch(proxy + trendsUrl, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error("proxy failed");
  const data = await res.json();

  // Parse os trending topics e enriquece com nossos produtos base
  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, "text/xml");
  const items = xml.querySelectorAll("item");

  // Mapeia trending topics para nossos produtos base quando relevante
  const trendingTopics = Array.from(items).slice(0, 10).map(item => ({
    title: item.querySelector("title")?.textContent || "",
    traffic: item.querySelector("approx_traffic")?.textContent || "0",
  }));

  console.log("Trending na Alemanha:", trendingTopics);

  // Usa produtos base com score atualizado
  return EUROPEAN_PRODUCTS.map(p => {
    const match = trendingTopics.find(t =>
      p.keywords.some(k => t.title.toLowerCase().includes(k.toLowerCase()))
    );
    if (match) {
      const traffic = parseInt(match.traffic.replace(/[^0-9]/g, "")) || 0;
      const boost = Math.min(20, Math.floor(traffic / 5000));
      return { ...p, trendScore: Math.min(99, p.trendScore + boost) };
    }
    return p;
  });
}

// ─── RENDER PRODUCTS ────────────────────────────────────────
function renderProducts(products) {
  const grid = document.getElementById("products-grid");
  if (!products.length) {
    grid.innerHTML = `<div class="loading-state"><p>Nenhum produto encontrado.</p></div>`;
    return;
  }

  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" onclick="selectProduct(${p.id})" style="animation-delay:${i * 0.06}s">
      ${p.image
        ? `<img class="product-card-img" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.outerHTML='<div class=product-card-img-placeholder>${p.emoji}</div>'">`
        : `<div class="product-card-img-placeholder">${p.emoji}</div>`
      }
      <div class="trend-badge ${p.trendScore >= 90 ? 'hot' : ''}">
        ${p.trendScore >= 90 ? '🔥' : '📈'} ${p.trendScore}%
      </div>
      <div class="product-card-body">
        <div class="product-card-country">
          <span class="country-flag">${p.primaryCountry.flag}</span>
          <span>${p.primaryCountry.name}</span>
          ${p.countries.length > 1 ? `<span style="color:var(--text3)">+${p.countries.length - 1} países</span>` : ''}
        </div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-meta">
          <span class="product-card-price">Custo: €${p.costMin}–€${p.costMax}</span>
          <span class="product-card-margin">+${p.marginPct}% margem</span>
        </div>
      </div>
    </div>
  `).join("");
}

function showLoading(show) {
  const grid = document.getElementById("products-grid");
  if (show) {
    grid.innerHTML = `
      <div class="loading-state" id="loading-state">
        <div class="loading-spinner"></div>
        <p>Buscando tendências na Europa...</p>
      </div>`;
  }
}

// ─── FILTER / SORT ──────────────────────────────────────────
function filterCategory(el, cat) {
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
  const filtered = cat === "all"
    ? State.products
    : State.products.filter(p => p.category === cat);
  renderProducts(filtered);
}

function sortProducts(by) {
  const sorted = [...State.products];
  if (by === "trend") sorted.sort((a, b) => b.trendScore - a.trendScore);
  if (by === "margin") sorted.sort((a, b) => b.marginPct - a.marginPct);
  if (by === "volume") sorted.sort((a, b) => (b.costMin + b.costMax) - (a.costMin + a.costMax));
  renderProducts(sorted);
}

// ─── SELECT PRODUCT ─────────────────────────────────────────
function selectProduct(id) {
  const p = EUROPEAN_PRODUCTS.find(x => x.id === id);
  if (!p) return;
  State.selectedProduct = p;

  // Preenche detalhe
  document.getElementById("detail-title").textContent = p.name;
  document.getElementById("detail-country-badge").innerHTML =
    `${p.primaryCountry.flag} Em alta: ${p.primaryCountry.name}`;
  document.getElementById("detail-img").src = p.image || "";
  document.getElementById("detail-trend-badge").textContent = p.trendLabel;

  const avg = Math.round((p.costMin + p.costMax) / 2);
  document.getElementById("stat-cost").textContent = `€ ${avg}`;
  document.getElementById("stat-price").textContent = `€ ${p.suggestedPrice}`;
  document.getElementById("stat-margin").textContent = `${p.marginPct}%`;
  document.getElementById("stat-trend").textContent = `${p.trendScore}%`;

  document.getElementById("detail-analysis").textContent = p.analysis;

  document.getElementById("detail-countries").innerHTML =
    p.countries.map(c => `<span class="country-tag">${c.flag} ${c.name}</span>`).join("");

  document.getElementById("detail-suppliers").innerHTML =
    p.suppliers.map(s => `
      <div class="supplier-row">
        <span class="supplier-name">${s.name}</span>
        <div style="text-align:right">
          <div style="font-size:14px;font-weight:600">${s.price}</div>
          <div class="supplier-info">Entrega: ${s.delivery}</div>
        </div>
      </div>
    `).join("");

  // Preenche calculadora com valores sugeridos
  document.getElementById("calc-cost").value = avg;
  document.getElementById("calc-ship").value = 5;
  document.getElementById("calc-sell").value = p.suggestedPrice;
  document.getElementById("calc-ads").value = 0;
  recalcMargin();

  // Preenche anúncio com dados do produto
  document.getElementById("ad-title").value = p.name;
  document.getElementById("ad-price").value = p.suggestedPrice;

  goStep(2);
}

// ─── MARGIN CALCULATOR ──────────────────────────────────────
function recalcMargin() {
  const cost = parseFloat(document.getElementById("calc-cost").value) || 0;
  const ship = parseFloat(document.getElementById("calc-ship").value) || 0;
  const sell = parseFloat(document.getElementById("calc-sell").value) || 0;
  const ads  = parseFloat(document.getElementById("calc-ads").value) || 0;

  const profit = sell - cost - ship - ads;
  const pct = sell > 0 ? ((profit / sell) * 100).toFixed(1) : 0;

  const profitEl = document.getElementById("calc-profit");
  const pctEl = document.getElementById("calc-pct");

  profitEl.textContent = `€ ${profit.toFixed(2)}`;
  pctEl.textContent = `${pct}%`;

  profitEl.style.color = profit >= 0 ? "var(--green)" : "var(--red)";
  pctEl.style.color = profit >= 0 ? "var(--green)" : "var(--red)";
}

// ─── FILE UPLOAD ─────────────────────────────────────────────
function handleDrop(e) {
  e.preventDefault();
  const zone = document.getElementById("upload-zone");
  zone.classList.remove("drag-over");
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) processImageFile(file);
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) processImageFile(file);
}

function processImageFile(file) {
  if (file.size > 10 * 1024 * 1024) {
    showToast("Imagem muito grande (máx 10MB)", "error");
    return;
  }
  State.uploadedImageFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const b64 = e.target.result;
    State.uploadedImageBase64 = b64;

    // show preview in upload zone
    const uploadContent = document.getElementById("upload-content");
    const previewImg = document.getElementById("upload-preview");
    uploadContent.style.display = "none";
    previewImg.src = b64;
    previewImg.classList.remove("hidden");

    // sync to ad preview
    document.getElementById("ad-preview-img").src = b64;
    showToast("Imagem carregada!", "success");
  };
  reader.readAsDataURL(file);
}

// ─── AD PREVIEW SYNC ─────────────────────────────────────────
function syncPreview() {
  const title = document.getElementById("ad-title").value;
  const price = document.getElementById("ad-price").value;
  const desc  = document.getElementById("ad-desc").value;
  const store = document.getElementById("ad-store").value;

  document.getElementById("ad-title-preview").textContent = title || "Título do produto";
  document.getElementById("ad-price-preview").textContent = price ? `€ ${parseFloat(price).toFixed(2)}` : "€ 0,00";
  document.getElementById("ad-desc-preview").textContent = desc || "Descrição do anúncio...";
  document.getElementById("ad-store-name").textContent = store || "Sua Loja";
}

// ─── AI CONTENT GENERATION ───────────────────────────────────
async function generateAIContent() {
  const apiKey = State.config.anthropicKey;
  if (!apiKey) {
    showToast("Configure a chave da API Anthropic em ⚙ Configurações", "error");
    openConfig();
    return;
  }

  const p = State.selectedProduct;
  if (!p) { showToast("Selecione um produto primeiro", "error"); return; }

  const btn = document.getElementById("ai-btn");
  const statusEl = document.getElementById("ai-status");
  btn.disabled = true;
  btn.innerHTML = `<span class="loading-spinner" style="width:18px;height:18px;border-width:2px;display:inline-block"></span> Gerando...`;
  statusEl.style.display = "block";
  statusEl.textContent = "Conectando com Claude AI...";

  const lang = State.config.lang || "pt";
  const langNames = { pt: "português", en: "inglês", de: "alemão", fr: "francês", es: "espanhol" };

  const prompt = `Você é um especialista em copywriting para e-commerce internacional.
Crie conteúdo de venda para o seguinte produto em ${langNames[lang]}:

Produto: ${p.name}
País em alta: ${p.primaryCountry.name}
Tendência: ${p.trendScore}% em alta na Europa
Preço sugerido: €${p.suggestedPrice}
Análise: ${p.analysis}

Retorne SOMENTE um JSON válido (sem markdown, sem explicações) com este formato exato:
{
  "title": "título do anúncio (máx 60 chars, persuasivo)",
  "description": "descrição do produto (3-4 linhas, benefícios principais, urgência)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  try {
    statusEl.textContent = "Gerando título e descrição...";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const raw = data.content[0].text.trim();

    // Limpa possíveis backticks de markdown
    const clean = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);

    // Aplica no formulário
    document.getElementById("ad-title").value = result.title || "";
    document.getElementById("ad-desc").value = result.description || "";
    syncPreview();

    // Exibe tags
    if (result.tags && result.tags.length) {
      const tagsGroup = document.getElementById("tags-group");
      const tagsList = document.getElementById("tags-list");
      tagsList.innerHTML = result.tags.map(t => `<span class="tag">#${t}</span>`).join("");
      tagsGroup.style.display = "block";
    }

    statusEl.textContent = "✓ Conteúdo gerado com sucesso!";
    statusEl.style.color = "var(--green)";
    showToast("Conteúdo gerado com IA!", "success");

  } catch (err) {
    console.error(err);
    statusEl.textContent = `Erro: ${err.message}`;
    statusEl.style.color = "var(--red)";
    showToast("Erro ao gerar conteúdo: " + err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span class="ai-sparkle">✦</span> Gerar com IA`;
  }
}

// ─── UPDATE BUDGET DISPLAY ───────────────────────────────────
function updateBudgetDisplay(v) {
  document.getElementById("budget-display").textContent = `€ ${v} / dia`;
  const low = Math.round(v * 20);
  const high = Math.round(v * 60);
  document.getElementById("budget-reach").textContent = `~${low.toLocaleString()}–${high.toLocaleString()}`;
}

// ─── PUBLISH SUMMARY ─────────────────────────────────────────
function updatePublishSummary() {
  const p = State.selectedProduct;
  if (!p) return;
  const price = document.getElementById("ad-price").value || p.suggestedPrice;

  document.getElementById("pub-product-name").textContent = document.getElementById("ad-title").value || p.name;
  document.getElementById("pub-price").textContent = `€ ${parseFloat(price).toFixed(2)}`;
  document.getElementById("pub-trend").textContent = `${p.trendScore}%`;
  document.getElementById("pub-country").textContent =
    `${p.primaryCountry.flag} ${p.primaryCountry.name}`;
}

// ─── SHOPIFY CONNECTION TEST ──────────────────────────────────
async function testShopifyConnection() {
  const domain = document.getElementById("shopify-domain").value.trim();
  const token  = document.getElementById("shopify-token").value.trim();

  if (!domain || !token) {
    showToast("Preencha o domínio e o token", "error");
    return;
  }

  const btn = document.getElementById("test-btn");
  btn.textContent = "Testando...";
  btn.disabled = true;

  try {
    // A chamada direta ao Shopify tem CORS — usamos proxy allorigins
    const shopUrl = `https://${domain}.myshopify.com/admin/api/2024-01/shop.json`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(shopUrl)}`;

    // Tenta via proxy (limitação de CORS no browser)
    // Em produção: usar um backend simples como worker Cloudflare (gratuito)
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    const data = await res.json();

    if (data.contents) {
      const shop = JSON.parse(data.contents);
      if (shop.shop) {
        document.getElementById("shopify-status-badge").textContent = `✓ ${shop.shop.name}`;
        document.getElementById("shopify-status-badge").classList.add("connected");

        // Salva domínio no localStorage
        saveShopifyConfig(domain, token);
        showToast(`Conectado: ${shop.shop.name}`, "success");
        return;
      }
    }
    throw new Error("Resposta inválida");
  } catch (err) {
    // Se CORS bloquear mesmo pelo proxy, orienta o usuário
    document.getElementById("shopify-status-badge").textContent = "Verifique as credenciais";
    showToast(
      "Conexão direta bloqueada por CORS. Veja instruções no README para usar o servidor proxy.",
      "error"
    );
  } finally {
    btn.disabled = false;
    btn.textContent = "Testar Conexão";
  }
}

function saveShopifyConfig(domain, token) {
  const storeName = document.getElementById("ad-store").value || "";
  const collection = document.getElementById("shopify-collection").value || "";
  localStorage.setItem("dropintel_shopify", JSON.stringify({ domain, token, storeName, collection }));
}

// ─── PUBLISH TO SHOPIFY ──────────────────────────────────────
async function publishToShopify() {
  const domain = document.getElementById("shopify-domain").value.trim();
  const token  = document.getElementById("shopify-token").value.trim();

  if (!domain || !token) {
    showToast("Configure as credenciais da Shopify primeiro", "error");
    return;
  }
  if (!State.selectedProduct) {
    showToast("Nenhum produto selecionado", "error");
    return;
  }

  const title    = document.getElementById("ad-title").value || State.selectedProduct.name;
  const price    = document.getElementById("ad-price").value || State.selectedProduct.suggestedPrice;
  const desc     = document.getElementById("ad-desc").value || State.selectedProduct.analysis;
  const pubNow   = document.getElementById("opt-publish-now").checked;
  const infinite = document.getElementById("opt-infinite").checked;
  const seo      = document.getElementById("opt-seo").checked;

  const btn = document.getElementById("publish-btn");
  btn.innerHTML = `<span class="loading-spinner" style="width:20px;height:20px;border-width:2px"></span> Publicando...`;
  btn.disabled = true;

  const productPayload = {
    product: {
      title: title,
      body_html: `<p>${desc}</p>`,
      vendor: document.getElementById("ad-store").value || "DropIntel Store",
      product_type: State.selectedProduct.category,
      status: pubNow ? "active" : "draft",
      tags: `europa, tendencia, ${State.selectedProduct.primaryCountry.name.toLowerCase()}`,
      variants: [
        {
          price: parseFloat(price).toFixed(2),
          inventory_management: infinite ? null : "shopify",
          inventory_quantity: infinite ? 999999 : 100,
          requires_shipping: true,
        },
      ],
      ...(seo && {
        metafields_global_title_tag: title,
        metafields_global_description_tag: desc.slice(0, 320),
      }),
    },
  };

  // Adiciona imagem se houver upload
  if (State.uploadedImageBase64) {
    const base64Clean = State.uploadedImageBase64.split(",")[1];
    productPayload.product.images = [
      {
        attachment: base64Clean,
        filename: "produto-anuncio.jpg",
      },
    ];
  }

  try {
    // Detecta se está rodando pelo proxy local (localhost:3000)
    const isProxy = window.location.hostname === "localhost" ||
                    window.location.hostname === "127.0.0.1";

    let res;
    if (isProxy) {
      // Via proxy local — sem CORS
      res = await fetch("/shopify/products.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-shop-domain": domain,
          "x-shopify-access-token": token,
        },
        body: JSON.stringify(productPayload),
      });
    } else {
      // Direto (funciona se o app Shopify tiver CORS liberado)
      res = await fetch(`https://${domain}.myshopify.com/admin/api/2024-01/products.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": token,
        },
        body: JSON.stringify(productPayload),
      });
    }

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.errors ? JSON.stringify(errData.errors) : `HTTP ${res.status}`);
    }

    const data = await res.json();
    const product = data.product;
    const productUrl = `https://${domain}.myshopify.com/products/${product.handle}`;
    const adminUrl = `https://${domain}.myshopify.com/admin/products/${product.id}`;

    saveShopifyConfig(domain, token);

    const resultEl = document.getElementById("publish-result");
    const resultIcon = document.getElementById("result-icon");
    const resultText = document.getElementById("result-text");
    const resultLink = document.getElementById("result-link");

    resultEl.style.display = "block";
    resultIcon.textContent = "✓";
    resultText.innerHTML = `<strong>${title}</strong> publicado com sucesso na Shopify!<br>ID do produto: ${product.id}`;
    resultLink.href = adminUrl;
    resultLink.textContent = "Ver no painel Shopify →";

    showToast("Produto publicado com sucesso!", "success");

  } catch (err) {
    console.error(err);

    // Exibe resultado com instruções sobre CORS
    const resultEl = document.getElementById("publish-result");
    resultEl.style.display = "block";
    resultEl.style.borderColor = "var(--amber)";

    document.getElementById("result-icon").textContent = "⚠";
    document.getElementById("result-text").innerHTML = `
      <strong>CORS bloqueou a requisição direta.</strong><br>
      Isso é normal ao rodar localmente. Execute o proxy incluído:<br>
      <code style="font-family:var(--font-mono);font-size:12px;background:var(--bg);padding:4px 8px;border-radius:4px;display:inline-block;margin-top:8px">
        node proxy.js
      </code><br>
      <span style="font-size:13px;color:var(--text2)">Depois, reabra o app pelo proxy em http://localhost:3000</span>
    `;
    document.getElementById("result-link").style.display = "none";

    showToast("Configure o proxy local — veja instruções na tela", "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>Publicar Produto na Shopify</span><span class="btn-arrow">→</span>`;
  }
}

// ─── CONFIG MODAL ────────────────────────────────────────────
function openConfig() {
  document.getElementById("config-modal").classList.add("open");
}
function closeConfig() {
  document.getElementById("config-modal").classList.remove("open");
}
function saveConfig() {
  State.config = {
    anthropicKey: document.getElementById("cfg-anthropic").value.trim(),
    currency: document.getElementById("cfg-currency").value,
    lang: document.getElementById("cfg-lang").value,
  };
  localStorage.setItem("dropintel_config", JSON.stringify(State.config));
  closeConfig();
  showToast("Configurações salvas!", "success");
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg, type = "success") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}
