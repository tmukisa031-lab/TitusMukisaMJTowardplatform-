import React from "react";
import Link from "next/link";
import "../styles/global.css";

export default function MediaCard({
  title,
  description,
  mediaUrl,
  type,
  free = false,
  price,
  currency,
  category,
  tags,
  previewUrl,
}) {
  return (
    <div className="card p-4 shadow rounded bg-white relative">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>

      {/* Media Player */}
      {type === "video" ? (
        <video controls className="w-full rounded mt-2">
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <audio controls className="w-full mt-2">
          <source src={mediaUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Access / Download */}
      <div className="mt-2 flex gap-2 items-center">
        <Link href={mediaUrl} target="_blank" className="btn text-blue-600 inline-block">
          {free ? "Free Access" : `Access / Download (${currency} ${price})`}
        </Link>
        {free && <span className="ml-2 text-green-600 font-semibold">🎁 Free Item</span>}
      </div>

      {/* Category & Tags */}
      {category && (
        <div className="mt-1 text-sm text-gray-500">
          Category: {category} {tags && `| Tags: ${tags.join(", ")}`}
        </div>
      )}

      {/* Optional Preview */}
      {previewUrl && (
        <Link
          href={previewUrl}
          target="_blank"
          className="mt-1 inline-block text-blue-600 hover:underline"
        >
          🎬 Preview
        </Link>
      )}
    </div>
  );
}