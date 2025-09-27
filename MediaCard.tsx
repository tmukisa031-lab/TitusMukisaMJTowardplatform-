import React from "react";
import { MediaItem } from "../types/media";

interface Props {
  item: MediaItem;
}

const MediaCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
      <p className="text-sm text-gray-400 mb-2">Category: {item.category}</p>
      <p className="text-sm mb-4">{item.free ? "Free" : "Premium"}</p>

      {/* Preview button */}
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary"
      >
        Play
      </a>
    </div>
  );
};

export default MediaCard;