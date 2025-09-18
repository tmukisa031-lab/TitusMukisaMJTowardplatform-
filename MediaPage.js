import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function MediaPage({ type }) {
  const { user } = useAuth();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/media/${type}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => setMedia(res.data))
      .catch((err) => console.error(err));
  }, [type, user]);

  return (
    <div>
      <h2 className="text-xl mb-4">{type.toUpperCase()}</h2>
      <ul>
        {media.map((item) => (
          <li key={item.id} className="mb-2">
            {item.title}
            {item.url && (
              <button
                className="ml-2 text-blue-400"
                onClick={() => window.open(item.url, "_blank")}
              >
                Play
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}