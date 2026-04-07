# DropIntel — Sistema de Vendas Internacionais

Plataforma de dropshipping com análise de tendências europeias via Google Trends,
geração de anúncios com IA (Claude) e publicação automática na Shopify.

---

## 🚀 Como rodar

### Opção 1 — Sem Node.js (só leitura de tendências + IA)
Abra o arquivo `index.html` diretamente no browser:
```
Clique duas vezes em index.html
```
> A publicação na Shopify não vai funcionar assim por causa do CORS.
> Use a Opção 2 para publicar de verdade.

---

### Opção 2 — Com proxy local (recomendado para Shopify)
Requer Node.js 18+

```bash
# Rodar o proxy (já serve o app em http://localhost:3000)
node proxy.js
```

Abra http://localhost:3000 no browser.

---

## ⚙️ Configuração inicial

### 1. Chave da API Anthropic (para gerar textos com IA)
- Acesse: https://console.anthropic.com/keys
- Crie uma chave e cole em **⚙ Configurações** dentro do app

### 2. Shopify — Criar o Access Token
1. Entre no painel Shopify da sua loja
2. Vá em **Settings → Apps and sales channels → Develop apps**
3. Clique em **Create an app**
4. Dê um nome (ex: "DropIntel")
5. Clique em **Configure Admin API scopes**
6. Ative as permissões:
   - `write_products` ✓
   - `read_products` ✓
   - `write_inventory` ✓
7. Clique em **Save** → **Install app**
8. Copie o **Admin API access token** (começa com `shpat_`)

### 3. Preencher no app
- **Domínio da loja**: só o prefixo, sem `.myshopify.com`
  - Ex: se sua loja é `minhaloja.myshopify.com`, coloque `minhaloja`
- **Access Token**: o token copiado no passo anterior

---

## 📂 Estrutura dos arquivos

```
dropship-app/
├── index.html      # Aplicação principal
├── style.css       # Estilos (tema escuro editorial)
├── app.js          # Lógica: Trends, IA, Shopify
├── proxy.js        # Servidor proxy local (Node.js)
└── README.md       # Este arquivo
```

---

## 🔄 Fluxo de uso

```
1. TENDÊNCIAS  → Clique em "Analisar Mercado" para buscar top produtos na Europa
2. PRODUTO     → Clique em um produto para ver detalhes, análise e calcular margem
3. ANÚNCIO     → Faça upload da sua arte, use IA para gerar título e descrição
4. PUBLICAR    → Configure sua Shopify e publique com um clique
```

---

## 🌍 Como funciona a análise de tendências

O app usa:
1. **Google Trends RSS** (via proxy CORS) para trending searches na Alemanha, França, UK e outros
2. **Base de dados local** com 6 produtos validados e métricas de mercado europeu
3. **Score dinâmico**: os produtos ganham boost quando aparecem nos trending topics em tempo real

> Para análise mais precisa em produção, considere:
> - [pytrends](https://github.com/GeneralMills/pytrends) (Python, gratuito)
> - [Serpapi Google Trends](https://serpapi.com/) (~$50/mês)
> - [Sell The Trend](https://www.sellthetrend.com/) (~$40/mês)

---

## ⚠️ CORS e Shopify

A API Admin da Shopify bloqueia chamadas diretas do browser (CORS).

**Solução incluída**: o `proxy.js` é um servidor Node.js que faz a ponte:
```
Browser → proxy.js (localhost:3000) → Shopify API
```

No front-end (quando rodando pelo proxy), as chamadas à Shopify usam:
```
POST /shopify/products.json
Headers:
  x-shop-domain: sua-loja
  x-shopify-access-token: shpat_...
```

---

## 💡 Próximos passos sugeridos

- [ ] Integrar AliExpress/CJ Dropshipping API para importar produtos automaticamente
- [ ] Adicionar painel de pedidos recebidos
- [ ] Integrar Meta Ads API para criar campanhas direto no app
- [ ] Adicionar mais países além da Europa (EUA, Austrália)
- [ ] Dashboard com métricas de vendas da Shopify
