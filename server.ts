import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily or safely
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

import { checkDatabaseHealth } from './src/db/client';
import { CardRepository } from './src/db/repositories/cardRepository';
import { ArticleRepository } from './src/db/repositories/articleRepository';
import { MediaRepository } from './src/db/repositories/mediaRepository';
import { SettingsRepository } from './src/db/repositories/settingsRepository';
import { generateSitemapXml, generateRobotsTxt } from './src/utils/sitemapGenerator';

// Dynamic SEO Sitemap & Robots.txt Routes
app.get("/sitemap.xml", (req, res) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const xml = generateSitemapXml(baseUrl);
  res.header("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

app.get("/robots.txt", (req, res) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const txt = generateRobotsTxt(baseUrl);
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.send(txt);
});

// API Routes
// 1. Health Check with DB Status
app.get("/api/health", async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  res.json({
    status: dbHealth.status,
    database: dbHealth.database,
    platform: "CardInsight Online — International Credit Card Information Platform",
    domain: "cardinsight.online",
    supportedCountries: ["US", "CA", "UK", "AU", "NZ"],
    timestamp: new Date().toISOString(),
  });
});

// 2. Cards API
app.get("/api/cards", async (req, res) => {
  try {
    const country = req.query.country as string;
    if (country && country !== 'all') {
      const cards = await CardRepository.getCardsByCountry(country as any);
      return res.json(cards);
    }
    const cards = await CardRepository.getAllCards();
    return res.json(cards);
  } catch (err: any) {
    console.error("GET /api/cards error:", err);
    res.status(500).json({ error: "Failed to fetch cards from database" });
  }
});

app.post("/api/cards", async (req, res) => {
  try {
    const card = req.body;
    if (!card || !card.id || !card.name) {
      return res.status(400).json({ error: "Invalid card data" });
    }
    await CardRepository.createOrUpdateCard(card);
    res.json({ success: true, card });
  } catch (err: any) {
    console.error("POST /api/cards error:", err);
    res.status(500).json({ error: "Failed to save card" });
  }
});

app.delete("/api/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await CardRepository.deleteCard(id);
    res.json({ success });
  } catch (err: any) {
    console.error("DELETE /api/cards error:", err);
    res.status(500).json({ error: "Failed to delete card" });
  }
});

// 3. Articles & Guides API
app.get("/api/articles", async (req, res) => {
  try {
    const publishedOnly = req.query.published === 'true';
    const articles = publishedOnly 
      ? await ArticleRepository.getPublishedArticles()
      : await ArticleRepository.getAllArticles();
    res.json(articles);
  } catch (err: any) {
    console.error("GET /api/articles error:", err);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

app.post("/api/articles", async (req, res) => {
  try {
    const article = req.body;
    if (!article || !article.id || !article.title) {
      return res.status(400).json({ error: "Invalid article data" });
    }
    const saved = await ArticleRepository.saveArticle(article);
    res.json({ success: true, article: saved });
  } catch (err: any) {
    console.error("POST /api/articles error:", err);
    res.status(500).json({ error: "Failed to save article" });
  }
});

app.delete("/api/articles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await ArticleRepository.deleteArticle(id);
    res.json({ success });
  } catch (err: any) {
    console.error("DELETE /api/articles error:", err);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

// 4. Media Library API
app.get("/api/media", async (req, res) => {
  try {
    const media = await MediaRepository.getAllMedia();
    res.json(media);
  } catch (err: any) {
    console.error("GET /api/media error:", err);
    res.status(500).json({ error: "Failed to fetch media library" });
  }
});

app.post("/api/media", async (req, res) => {
  try {
    const item = req.body;
    if (!item || !item.id || !item.url) {
      return res.status(400).json({ error: "Invalid media item" });
    }
    const saved = await MediaRepository.saveMedia(item);
    res.json({ success: true, item: saved });
  } catch (err: any) {
    console.error("POST /api/media error:", err);
    res.status(500).json({ error: "Failed to save media" });
  }
});

app.delete("/api/media/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const success = await MediaRepository.deleteMedia(id);
    res.json({ success });
  } catch (err: any) {
    console.error("DELETE /api/media error:", err);
    res.status(500).json({ error: "Failed to delete media item" });
  }
});

// 5. Settings API
app.get("/api/settings", async (req, res) => {
  try {
    const settings = await SettingsRepository.getAllSettings();
    res.json(settings);
  } catch (err: any) {
    console.error("GET /api/settings error:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/api/settings", async (req, res) => {
  try {
    const { key, value, type } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ error: "Key and value required" });
    }
    await SettingsRepository.setSetting(key, value, type);
    res.json({ success: true });
  } catch (err: any) {
    console.error("POST /api/settings error:", err);
    res.status(500).json({ error: "Failed to save setting" });
  }
});

// Server-side AI Credit Expert & Regulatory Fact Explainer
app.post("/api/ai/credit-explainer", async (req, res) => {
  try {
    const { query, country, contextTopic } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "A valid question or query is required." });
    }

    const ai = getGenAI();
    if (!ai) {
      // Return structured fallback informational response when key isn't provided
      return res.json({
        answer: `Credit Information Overview for ${country || "International"}: In ${country || "global markets"}, credit cards are subject to specific national consumer credit legislation. For factual verified details, consult the respective regulator (CFPB in the US, FCA in the UK, FCAC in Canada, ASIC in Australia, Commerce Commission in NZ).`,
        disclaimer: "Informational educational summary. GlobalCredit does not provide personalized legal or financial advice.",
        sourceRegulator: country === "UK" ? "Financial Conduct Authority (FCA)" : country === "US" ? "Consumer Financial Protection Bureau (CFPB)" : country === "CA" ? "Financial Consumer Agency of Canada (FCAC)" : country === "AU" ? "ASIC" : "National Financial Regulators"
      });
    }

    const systemPrompt = `You are a factual, highly professional financial education specialist at GlobalCredit, an independent international credit card information directory.
You provide free, structured, clear, and mathematically accurate explanations of credit cards, personal credit, rewards, interest rates (APR vs Representative APR, Purchase Rates), credit scores (FICO, VantageScore, Equifax, Experian, TransUnion, Illion, Centrix), balance transfers, fees, debt payoff methods, and consumer protection laws (Section 75 in UK, Truth in Lending Act & CARD Act in US, National Credit Code in Australia, Bank Act in Canada, Credit Contracts and Consumer Finance Act in NZ).

CRITICAL RULES:
1. Never invent fake statistics, fake card offers, fake ratings, or speculative rates.
2. Maintain clear country-specific terminology:
   - US: APR, FICO score (300-850), CARD Act rules.
   - UK: Representative APR (51% rule), Section 75 protection, statutory notice periods.
   - Canada: Annual Interest Rate / Purchase APR, Equifax/TransUnion Canada (300-900), FCAC rules.
   - Australia: Purchase Interest Rate, Comparison Rate / Standard Rate, Comprehensive Credit Reporting (CCR), ASIC rules.
   - New Zealand: Purchase Interest Rate, Centrix / Equifax NZ score bands, CCCFA guidelines.
3. Explicitly state that this is educational information and not personalized financial, legal, or lending advice.
4. Keep the output clean, structured with bullet points where appropriate, and directly answers the user's inquiry.`;

    const countryContext = country ? `Target Country: ${country}.` : "International perspective.";
    const topicContext = contextTopic ? `Topic area: ${contextTopic}.` : "";

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `${countryContext} ${topicContext}\n\nUser Question: ${query}`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    const text = response.text || "No response generated.";
    return res.json({
      answer: text,
      country: country || "Global",
      disclaimer: "GlobalCredit is an independent informational resource. Not financial advice.",
    });
  } catch (error: any) {
    console.error("AI Explainer Error:", error);
    return res.status(500).json({
      error: "Unable to process query at this time.",
      details: error.message || "Unknown error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GlobalCredit Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
