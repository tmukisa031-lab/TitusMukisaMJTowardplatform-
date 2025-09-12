const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- Health Check Endpoint ---
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// --- Example Endpoint ---
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from TitusMukisaMJToward API 🚀" });
});

// --- Chemistry Calculator Endpoint ---
app.post("/api/chemistry", (req, res) => {
  const { reactants } = req.body;
  if (!reactants || !Array.isArray(reactants)) {
    return res.status(400).json({ error: "Reactants must be an array" });
  }
  // Placeholder logic
  const products = ["H2O"];
  const balancedEquation = "2H2 + O2 → 2H2O";
  res.json({
    reactants,
    products,
    balancedEquation,
    message: "Calculation placeholder – replace with real logic"
  });
});

// --- Storefront Products Endpoint ---
let productsCatalog = [
  { id: 1, name: "The Listener [A Story About The Man]", price: 35000, currency: "UGX", free: false },
  { id: 2, name: "The Starlife", price: 15, currency: "USD", free: false },
  { id: 3, name: "The Tales Man Art", price: 30000, currency: "UGX", free: false },
  { id: 4, name: "Free Sample Ebook", price: 0, currency: "UGX", free: true }
];

// Get all products
app.get("/api/store/products", (req, res) => {
  res.json(productsCatalog);
});

// --- Checkout Endpoint (supports unlimited payment methods, offers, subscriptions) ---
app.post("/api/store/checkout", (req, res) => {
  const { items, paymentMethod, autoPricing } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Cart items are required" });
  }

  let total = 0;
  items.forEach((item) => {
    const product = productsCatalog.find((p) => p.name === item.name);
    if (product) {
      let price = product.price;
      if (autoPricing) price = price * 1.05; // 5% dynamic adjustment example
      total += price;
    }
  });

  res.json({
    message: "Checkout successful",
    items,
    total,
    paymentMethod,
    offersApplied: [
      "Buy 2 get 1 free",
      "Subscribe to AI Tools and get 10% discount",
      "Free sample ebook for new visitors"
    ]
  });
});

// --- Dynamic Content Endpoint ---
app.get("/api/content", (req, res) => {
  const contentPath = path.join(__dirname, "content.json");
  fs.readFile(contentPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load content" });
    try {
      const content = JSON.parse(data);
      res.json(content);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format in content file" });
    }
  });
});

// --- Media / Multimedia Endpoint ---
app.get("/api/media", (req, res) => {
  const contentPath = path.join(__dirname, "content.json");
  fs.readFile(contentPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load content" });
    try {
      const content = JSON.parse(data);
      res.json(content.media || []);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format in content file" });
    }
  });
});

// --- Offers / Promotions Endpoint ---
app.get("/api/offers", (req, res) => {
  const contentPath = path.join(__dirname, "content.json");
  fs.readFile(contentPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load content" });
    try {
      const content = JSON.parse(data);
      res.json(content.offers || []);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format in content file" });
    }
  });
});

// --- Navigation / Header Links Endpoint ---
app.get("/api/navigation", (req, res) => {
  const contentPath = path.join(__dirname, "content.json");
  fs.readFile(contentPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load content" });
    try {
      const content = JSON.parse(data);
      res.json(content.navigation || []);
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format in content file" });
    }
  });
});

// --- Search Endpoint ---
app.get("/api/search", (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.status(400).json({ error: "Query parameter 'q' is required" });

  const contentPath = path.join(__dirname, "content.json");
  fs.readFile(contentPath, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load content" });
    try {
      const content = JSON.parse(data);
      const results = [];
      if (content.products) results.push(...content.products.filter(p => p.name.toLowerCase().includes(query)));
      if (content.media) results.push(...content.media.filter(m => m.title.toLowerCase().includes(query)));
      res.json({ query, results });
    } catch (parseErr) {
      res.status(500).json({ error: "Invalid JSON format in content file" });
    }
  });
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ API Server running on http://localhost:${PORT}`));
module.exports = app;