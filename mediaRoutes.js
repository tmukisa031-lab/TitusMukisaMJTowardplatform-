import express from "express";
import fs from "fs";
import path from "path";
import { generateStreamToken } from "../utils/token.js";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mediaFile = path.join(__dirname, "../media_storage/lists/media.json");

// GET media list by category
router.get("/:category", (req, res, next) => {
  try {
    const { category } = req.params;
    if (!fs.existsSync(mediaFile)) return res.json([]);

    const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
    res.json(media[category] || []);
  } catch (err) {
    next(err);
  }
});

// GET signed stream URL
router.get("/stream/:filename", (req, res) => {
  const { filename } = req.params;
  const { token } = generateStreamToken(filename, 3600); // 1h

  const url = `${process.env.STREAM_URL}/${filename}?token=${token}`;
  res.json({ url, token });
});

export default router;