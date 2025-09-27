import React, { useEffect, useState } from "react";
import axios from "axios";
import { MediaItem } from "../types/media";
import MediaCard from "../components/MediaCard";

const MediaPage: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/media", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // Flatten all categories into one array
        const allMedia: MediaItem[] = [
          ...res.data.tv.map((item: any) => ({ ...item, category: "tv" })),
          ...res.data.radio.map((item: any) => ({ ...item, category: "radio" })),
          ...res.data.audio.map((item: any) => ({ ...item, category: "audio" })),
          ...res.data.video.map((item: any) => ({ ...item, category: "video" })),
        ];
        setMedia(allMedia);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Media Library</h1>
      <div className="media-grid">
        {media.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MediaPage;