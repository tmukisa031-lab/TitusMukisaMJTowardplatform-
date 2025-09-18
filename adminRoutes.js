// DELETE media entry -> move to trash.json
router.delete("/media/:category/:id", authMiddleware, isAdmin, (req, res) => {
  const {
    category, id
  } = req.params;

  const mediaFile = path.join(__dirname, "../media_storage/lists/media.json");
  const trashFile = path.join(__dirname, "../media_storage/lists/trash.json");

  const media = JSON.parse(fs.readFileSync(mediaFile, "utf-8"));
  let trash = [];
  if (fs.existsSync(trashFile)) {
    trash = JSON.parse(fs.readFileSync(trashFile, "utf-8"));
  }

  const index = media[category]?.findIndex((m) => m.id == id);
  if (index === -1) return res.status(404).json({
    message: "Item not found"
  });

  // Get item
  const item = media[category][index];

  // Add to trash with metadata
  trash.push({
    ...item,
    category,
    deletedAt: new Date().toISOString(),
  });

  // Remove from main media.json
  media[category].splice(index, 1);

  // Save changes
  fs.writeFileSync(mediaFile, JSON.stringify(media, null, 2));
  fs.writeFileSync(trashFile, JSON.stringify(trash, null, 2));

  res.json({
    message: "Media moved to trash 🗑️", item
  });
});