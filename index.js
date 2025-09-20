const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mediaFile = path.join(__dirname, "../media_storage/lists/media.json");

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../media_storage/uploads")));

// ✅ GET all media
app.get("/api/media", (req, res) => {
  const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
  res.json(media);
});

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../media_storage/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Upload new media
app.post("/api/admin/media/upload", upload.single("file"), (req, res) => {
  const { category, title } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;

  const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
  if (!media[category]) media[category] = [];

  const newItem = {
    id: media[category].length + 1,
    title: title || req.file.originalname,
    url: fileUrl,
  };

  media[category].push(newItem);
  fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2));

  res.json({ message: "Uploaded ✅", item: newItem });
});

// ✅ Edit media
app.put("/api/admin/media/:category/:id", (req, res) => {
  const { category, id } = req.params;
  const { title } = req.body;

  const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
  const item = media[category]?.find((m) => m.id == id);
  if (!item) return res.status(404).json({ message: "Not found" });

  if (title) item.title = title;
  fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2));

  res.json({ message: "Updated ✅", item });
});

// ✅ Delete media
app.delete("/api/admin/media/:category/:id", (req, res) => {
  const { category, id } = req.params;

  const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
  const index = media[category]?.findIndex((m) => m.id == id);
  if (index === -1) return res.status(404).json({ message: "Not found" });

  const [deleted] = media[category].splice(index, 1);

  // Delete file from disk
  const filePath = path.join(__dirname, "../media_storage", deleted.url);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2));

  res.json({ message: "Deleted 🗑️" });
});

// Export app for Vercel
module.exports = app;