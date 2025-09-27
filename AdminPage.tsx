import React, { useState } from "react";
import axios from "axios";
import { MediaItem } from "../types/media";

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    url: string;
    category: "tv" | "radio" | "audio" | "video";
    free: boolean;
  }>({
    title: "",
    url: "",
    category: "tv",
    free: true,
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/media",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`✅ Media added: ${response.data.item.title}`);
      setFormData({ title: "", url: "", category: "tv", free: true });
    } catch (err: any) {
      setMessage("❌ Error adding media (check admin rights)");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <form
        onSubmit={handleSubmit}
        className="card flex flex-col gap-4 bg-gray-800"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 rounded text-black"
          required
        />

        <input
          type="url"
          name="url"
          placeholder="Media URL"
          value={formData.url}
          onChange={handleChange}
          className="p-2 rounded text-black"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 rounded text-black"
        >
          <option value="tv">TV</option>
          <option value="radio">Radio</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="free"
            checked={formData.free}
            onChange={handleChange}
          />
          Free Access
        </label>

        <button type="submit" className="btn btn-success">
          Add Media
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AdminPage;