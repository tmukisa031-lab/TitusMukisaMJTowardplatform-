import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoreCart from "../components/StoreCart";
import MediaCard from "../components/MediaCard";
import "../styles/global.css";

export default function AIToolsPage() {
  const [cartItems, setCartItems] = useState([]);
  const [demoText, setDemoText] = useState("");
  const [toolsList, setToolsList] = useState([]);
  const [autoPricing, setAutoPricing] = useState(true);

  // Fetch AI tools dynamically from unified API content
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setToolsList(data.aiTools || []);
      })
      .catch((err) => console.error("Error fetching AI tools:", err));
  }, []);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleTextGenerate = () => {
    setDemoText("Hello! This is a quick AI-generated response preview.");
  };

  return (
    <>
      <Header />
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">AI Tools</h2>

        {/* Original Description */}
        <section className="mb-4">
          <p>
            Explore AI-powered utilities like text generation, virtual assistants, and calculators.
          </p>
          <p>
            <em>Integration with platform AI modules coming soon.</em>
          </p>
        </section>

        {/* Quick Links */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Link href="/chemistry-calculator" className="text-blue-600 hover:underline">
                Chemistry Calculator
              </Link>
            </li>
            <li>
              <Link href="/storefront" className="text-blue-600 hover:underline">
                Visit Storefront
              </Link>
            </li>
            <li>
              <Link href="/media" className="text-blue-600 hover:underline">
                Go to Media Center
              </Link>
            </li>
            <li>
              <Link href="/learning" className="text-blue-600 hover:underline">
                Learning Hub
              </Link>
            </li>
          </ul>
        </section>

        {/* Auto Pricing Toggle */}
        <section className="mb-6">
          <label>
            <input
              type="checkbox"
              checked={autoPricing}
              onChange={() => setAutoPricing(!autoPricing)}
            />
            Enable Auto Pricing
          </label>
        </section>

        {/* Dynamic AI Tools / Products */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Available AI Tools & Subscriptions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {toolsList.map((tool) => (
              <li key={tool.name}>
                <strong>{tool.name}</strong> – {tool.free ? "Free" : `${tool.currency} ${tool.price}`}<br />
                <Link
                  href={tool.downloadLink || "#"}
                  className="text-blue-600 hover:underline"
                >
                  Download / Access
                </Link>
                {!tool.free && (
                  <button
                    className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                    onClick={() => handleAddToCart(tool)}
                  >
                    🛒 Add to Cart
                  </button>
                )}
                {tool.free && <span className="ml-2 text-green-600">🎁 Free Item</span>}
                {tool.demoLink && (
                  <Link
                    href={tool.demoLink}
                    target="_blank"
                    className="ml-2 text-purple-600 hover:underline"
                  >
                    🔗 Live Demo
                  </Link>
                )}
                {tool.category && (
                  <span className="ml-2 text-gray-500">| Category: {tool.category}</span>
                )}
                {tool.tags && (
                  <span className="ml-2 text-gray-500">| Tags: {tool.tags.join(", ")}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Quick Text Generator */}
        <section className="mb-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Quick Text Generator</h3>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded mb-2"
            onClick={handleTextGenerate}
          >
            Generate Sample Text
          </button>
          {demoText && <p className="mt-2 p-2 bg-white border rounded">{demoText}</p>}
        </section>

        {/* Media Preview */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Media Preview</h3>
          <MediaCard
            title="Big Buck Bunny"
            description="Sample video from Blender."
            mediaUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
            type="video"
            free={true}
          />
        </section>

        {/* Shopping Cart */}
        <StoreCart
          cartItems={cartItems}
          setCartItems={setCartItems}
          autoPricing={autoPricing}
        />
      </main>
      <Footer />
    </>
  );
}