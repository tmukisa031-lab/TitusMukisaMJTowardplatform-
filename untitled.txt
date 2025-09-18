import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AdminMediaManager() {
  const { user } = useAuth();
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchMedia = async () => {
    try {
      const res = await axios.get("/api/media");
      setMedia(res.data);
      setLoading(false);
    } catch (err) {
      setMessage("❌ Error loading media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleEdit = async (category, id, title, free) => {
    try {
      await axios.put(
        `/api/admin/media/${category}/${id}`,
        { title, free },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setMessage("✅ Media updated");
      fetchMedia();
    } catch (err) {
      setMessage("❌ Update failed");
    }
  };

  const handleDelete = async (category, id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/api/admin/media/${category}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMessage("🗑️ Deleted");
      fetchMedia();
    } catch (err) {
      setMessage("❌ Delete failed");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-4 bg-gray-900 rounded-lg mt-6">
      <h3 className="text-lg mb-4">Manage Media Library</h3>
      {message && <p className="mb-2">{message}</p>}
      {Object.keys(media).map((category) => (
        <div key={category} className="mb-6">
          <h4 className="text-xl mb-2 capitalize">{category}</h4>
          <ul className="space-y-2">
            {media[category].map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-800 p-2 rounded"
              >
                <div>
                  <input
                    type="text"
                    defaultValue={item.title}
                    onBlur={(e) =>
                      handleEdit(category, item.id, e.target.value, item.free)
                    }
                    className="bg-gray-700 text-white rounded px-2"
                  />
                  <label className="ml-3 text-white">
                    <input
                      type="checkbox"
                      defaultChecked={item.free}
                      onChange={(e) =>
                        handleEdit(category, item.id, item.title, e.target.checked)
                      }
                    />
                    Free
                  </label>
                </div>
                <div className="flex space-x-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(category, item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}