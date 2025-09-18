import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function TrashManager() {
  const { user } = useAuth();
  const [trash, setTrash] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTrash = async () => {
    try {
      const res = await axios.get("/api/admin/trash", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setTrash(res.data);
    } catch {
      setMessage("❌ Failed to load trash");
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const restoreItem = async (id) => {
    try {
      await axios.post(`/api/admin/media/restore/${id}`, {}, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMessage("✅ Restored");
      fetchTrash();
    } catch {
      setMessage("❌ Restore failed");
    }
  };

  const purgeTrash = async () => {
    if (!window.confirm("Permanently delete all trash?")) return;
    try {
      await axios.delete("/api/admin/trash/purge", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMessage("🧹 Trash purged");
      fetchTrash();
    } catch {
      setMessage("❌ Purge failed");
    }
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg mt-6">
      <h3 className="text-lg mb-3">Trash Bin 🗑️</h3>
      {message && <p className="mb-2">{message}</p>}
      <ul className="space-y-2">
        {trash.map((item) => (
          <li key={item.id} className="flex justify-between bg-gray-800 p-2 rounded">
            <div>
              <p>{item.title} <span className="text-sm text-gray-400">({item.category})</span></p>
              <p className="text-xs text-gray-500">Deleted: {new Date(item.deletedAt).toLocaleString()}</p>
            </div>
            <button
              onClick={() => restoreItem(item.id)}
              className="bg-green-600 px-2 py-1 rounded hover:bg-green-500"
            >
              Restore
            </button>
          </li>
        ))}
      </ul>
      {trash.length > 0 && (
        <button
          onClick={purgeTrash}
          className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-500"
        >
          Purge All
        </button>
      )}
    </div>
  );
}