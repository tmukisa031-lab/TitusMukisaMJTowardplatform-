import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function FileUpload() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("audio");
  const [free, setFree] = useState(true);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("free", free);

    try {
      const res = await axios.post("/api/admin/media/upload", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("✅ " + res.data.message);
    } catch (err) {
      setMessage("❌ Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg mt-6">
      <h3 className="text-lg mb-2">Upload Media File</h3>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-white"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        >
          <option value="tv">TV</option>
          <option value="radio">Radio</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={free}
            onChange={() => setFree(!free)}
          />
          <span>Free Content</span>
        </label>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          Upload & Save
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}