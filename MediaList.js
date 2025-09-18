import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MediaList = () => {
  const { user } = useContext(AuthContext);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch("http://localhost:5000/api/media", {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {},
      });
      const data = await res.json();
      setMedia(data);
    };
    fetchMedia();
  }, [user]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {media.map((item) => (
        <div key={item.id} className="p-4 bg-gray-800 rounded-lg">
          <h3 className="font-bold text-teal-400">{item.title}</h3>
          {item.locked ? (
            <p className="text-red-400">🔒 Premium – Subscribe to unlock</p>
          ) : (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-teal-300 underline"
            >
              ▶ Play
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaList;