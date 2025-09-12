import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MediaCard from "../components/MediaCard";
import StoreCart from "../components/StoreCart";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/global.css";

export default function MediaPage() {
  const [cartItems, setCartItems] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [offers, setOffers] = useState([]);

  const paymentMethods = ["Credit Card", "Mobile Money", "PayPal", "Crypto"];

  // Fetch media and offers dynamically
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        setMediaList(data.media || []);
        setOffers(data.offers || []);
      })
      .catch((err) => console.error("Error fetching media content:", err));
  }, []);

  const handleAddToCart = (item) => {
    if (!item.free) setCartItems((prev) => [...prev, item]);
  };

  return (
    <>
      <Header />
      <Navbar />
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Media Center</h2>
        <p className="mb-4">
          Watch videos, listen to audio, and access digital media content. Explore our{" "}
          <Link href="/storefront" className="text-blue-600 hover:underline ml-1">
            Storefront
          </Link>{" "}
          or go back to the{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Homepage
          </Link>.
        </p>

        {/* Media List */}
        <div className="flex flex-col gap-6">
          {mediaList.map((item, index) => (
            <div key={index}>
              <MediaCard {...item} />
              {!item.free && (
                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                  onClick={() => handleAddToCart(item)}
                >
                  🛒 Add to Cart
                </button>
              )}
              {item.previewUrl && (
                <Link
                  href={item.previewUrl}
                  target="_blank"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  🎬 Preview
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Store Cart */}
        {cartItems.length > 0 && (
          <StoreCart
            cartItems={cartItems}
            setCartItems={setCartItems}
            paymentMethods={paymentMethods}
          />
        )}

        {/* Offers */}
        <section className="mt-6 p-4 border rounded bg-yellow-100">
          <h3 className="font-semibold">Current Offers & Promotions</h3>
          <ul className="list-disc pl-5">
            {offers.length > 0
              ? offers.map((offer, idx) => (
                  <li key={idx}>
                    <strong>{offer.title}</strong>: {offer.description}{" "}
                    {offer.link && (
                      <Link
                        href={offer.link}
                        className="text-blue-600 hover:underline ml-1"
                      >
                        More Info
                      </Link>
                    )}
                  </li>
                ))
              : [
                  "Buy 2 media items, get 1 free",
                  "Subscribe to AI Tools and get 10% discount on all items",
                  "Free audio sample available for new visitors",
                ]}
          </ul>
        </section>

        {/* Quick Navigation */}
        <section className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-semibold">Quick Navigation</h3>
          <ul className="list-disc pl-5 space-y-1">
            {[
              { href: "/", label: "Homepage" },
              { href: "/storefront", label: "Storefront" },
              { href: "/ai-tools", label: "AI Tools" },
              { href: "/learning", label: "Learning Hub" },
              { href: "/chemistry-calculator", label: "Chemistry Calculator" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link href={link.href} className="text-blue-600 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}