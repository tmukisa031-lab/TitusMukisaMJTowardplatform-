const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ================= CONFIG ==================
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_secret_key_here";

// Media storage
const mediaFile = path.join(__dirname, "media_storage/lists/media.json");

// Upload storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ================== MOCK USERS ==================
let users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 8),
    isAdmin: true,
    isSubscribed: true,
  },
  {
    id: 2,
    username: "user",
    password: bcrypt.hashSync("user123", 8),
    isAdmin: false,
    isSubscribed: false,
  },
];

// ================= MIDDLEWARE ==================
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Admin access required" });
  next();
}

// ================= AUTH ROUTES ==================
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin, isSubscribed: user.isSubscribed },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// ================= MEDIA ROUTES ==================
app.get("/api/media", authenticateToken, (req, res) => {
  if (!fs.existsSync(mediaFile)) {
    return res.json({ tv: [], radio: [], audio: [], video: [] });
  }
  const mediaData = JSON.parse(fs.readFileSync(mediaFile));
  res.json(mediaData);
});

app.post("/api/media", authenticateToken, requireAdmin, (req, res) => {
  const { category, title, url, free } = req.body;
  let mediaData = fs.existsSync(mediaFile)
    ? JSON.parse(fs.readFileSync(mediaFile))
    : { tv: [], radio: [], audio: [], video: [] };

  const newItem = {
    id: Date.now(),
    title,
    url,
    free: free || false,
  };

  if (!mediaData[category]) mediaData[category] = [];
  mediaData[category].push(newItem);

  fs.writeFileSync(mediaFile, JSON.stringify(mediaData, null, 2));
  res.json({ message: "Media added", item: newItem });
});

// ================= UPLOAD ROUTES ==================
app.post("/api/upload", authenticateToken, requireAdmin, upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

// ================= START SERVER ==================
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));