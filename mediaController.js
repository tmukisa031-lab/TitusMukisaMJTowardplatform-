exports.getMediaList = async (req, res) => {
  const mediaType = req.params.type; // tv, radio, audio, video
  const { subscription } = req.user || { plan: "free" };

  let mediaList = [];

  // Load from JSON file
  const mediaData = require("../media_storage/lists/media.json");
  mediaList = mediaData[mediaType] || [];

  // Filter free vs premium
  if (subscription.plan === "free") {
    mediaList = mediaList.filter((m) => m.free === true);
  }

  res.json(mediaList);
};