# 🧠 Dropshipping Intelligence Platform
**Análise de Tendências, Criação de Anúncios e Publicação Automatizada**

Uma plataforma de dropshipping baseada em **inteligência de mercado**, desenvolvida para identificar produtos em alta, calcular margens, gerar anúncios com IA e publicar diretamente na Shopify — tudo rodando **100% localmente**, sem frameworks e sem banco de dados pago.

---

## 📌 Visão Geral

Este projeto centraliza todo o fluxo moderno de dropshipping em um único painel:

1. 📈 Descoberta de produtos em tendência na Europa  
2. 🔍 Validação de demanda e margem  
3. 🎨 Criação inteligente de anúncios  
4. 🛒 Publicação automatizada na Shopify  
5. 📦 Integração com fornecedores dropshipping  

A aplicação foi pensada como um **painel de inteligência de mercado**, ideal para validação rápida de produtos (MVP) e tomada de decisão baseada em dados.

---

## 🧩 Como o Sistema Funciona

### 🔎 Etapas 1 e 2 — Análise de Mercado (Inteligência)

A parte mais estratégica do sistema.

**Fontes de dados:**
- **Google Trends (API pública)**  
  Identificação de produtos e categorias em crescimento por país europeu
- **AliExpress (dados públicos via scraping)**  
  Validação de demanda, imagens, faixa de preço e fornecedores

**O sistema:**
- Cruza crescimento de buscas + interesse regional
- Prioriza produtos com potencial de margem
- Exibe os **Top 5 produtos em alta**, contendo:
  - Imagem do produto
  - País com maior crescimento (bandeira)
  - Score de tendência
  - Margem potencial estimada

> ⚠️ Ferramentas pagas como Minea ou Sell The Trend oferecem maior precisão, porém esta solução utiliza alternativas gratuitas ideais para início e testes.

---

### 🎨 Etapas 3 e 4 — Upload da Arte e Criação do Anúncio

Transformação do produto em uma oferta vendável.

**Funcionalidades:**
- Upload de imagem por clique ou arraste
- Preview do anúncio em tempo real (layout estilo Shopify)
- Geração automática com IA de:
  - Título
  - Descrição
  - Tags
  - Texto persuasivo  
- Integração direta com a **API da Anthropic (Claude)** rodando no browser

---

### 💰 Etapa 5 — Margem de Lucro e Ads

Calculadora financeira integrada.

O sistema calcula automaticamente:
- Custo do fornecedor
- Frete
- Taxas da plataforma
- Investimento em anúncios
- ✅ **Lucro líquido estimado**

Essencial para decidir rapidamente se um produto vale a pena antes de escalar tráfego pago (Meta Ads / TikTok Ads).

---

### 📦 Etapas 6, 7 e 8 — Fluxo de Pedido (Dropshipping)

Após a venda:
1. O pedido entra na Shopify
2. Os dados são enviados ao fornecedor (AliExpress, CJ Dropshipping, Zendrop)
3. O fornecedor envia o produto direto ao cliente final, com etiqueta personalizada da marca

---

## 🖥️ Telas da Aplicação

### ① Tendências
- Top produtos em alta na Europa
- Filtro por categoria
- Ordenação por score ou margem
- Visual de painel de inteligência de mercado

### ② Produto
- Detalhes completos do produto
- Países em destaque
- Fornecedores sugeridos
- Calculadora interativa de margem

### ③ Anúncio
- Upload de criativos
- Preview em tempo real
- Botão **“Gerar com IA”**

### ④ Publicar
- Conexão com Shopify (domínio + token)
- Configurações de status, SEO e estoque
- Simulação de budget de ads
- Publicação com um clique

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**  
  - HTML5  
  - CSS3  
  - JavaScript (Vanilla)

- **IA:**  
  - Anthropic (Claude API)

- **APIs e Integrações:**  
  - Google Trends  
  - AliExpress (dados públicos)  
  - Shopify API

- **Backend Local (opcional):**  
  - Node.js (proxy para CORS com Shopify)

- **Armazenamento:**  
  - `localStorage` (zero banco de dados)
