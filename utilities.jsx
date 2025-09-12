import Head from "next/head";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

export default function UtilitiesPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (name, price) => {
    setCartItems([...cartItems, { name, price }]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    alert(`Checkout successful! Total: $${total.toFixed(2)}`);
    setCartItems([]);
  };

  const renderCart = () => {
    if (cartItems.length === 0) return <p>🛒 Your cart is empty.</p>;
    return (
      <div>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}{" "}
              <button onClick={() => removeFromCart(index)}>❌</button>
            </li>
          ))}
        </ul>
        <button onClick={checkout}>Checkout</button>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Utilities & Platform - TitusMukisaMJToward</title>
        <meta
          name="description"
          content="Access AI tools, calculators, media utilities, learning hub, and storefront features."
        />
      </Head>
      <Header />
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto space-y-6">
        {/* AI Tools */}
        <section>
          <h2>AI Tools</h2>
          <ul>
            <li>
              <strong>AI Text Generator</strong> – $5 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("AI Text Generator", 5)}
              >
                🛒 Add to Cart
              </button>
              <a href="/ai-text-generator" className="ml-2 hyperlink">
                Go to AI Text Generator
              </a>
            </li>
            <li>
              <strong>AI Image Creator</strong> – $7 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("AI Image Creator", 7)}
              >
                🛒 Add to Cart
              </button>
              <a href="/ai-image-creator" className="ml-2 hyperlink">
                Go to AI Image Creator
              </a>
            </li>
          </ul>
        </section>

        {/* Science & Calculators */}
        <section>
          <h2>Science & Calculators</h2>
          <ul>
            <li>
              <strong>Chemistry Calculator</strong> – $2 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Chemistry Calculator", 2)}
              >
                🛒 Add to Cart
              </button>
              <a href="/chemistry-calculator" className="ml-2 hyperlink">
                Open Chemistry Calculator
              </a>
            </li>
            <li>
              <strong>Physics Calculator</strong> – $2 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Physics Calculator", 2)}
              >
                🛒 Add to Cart
              </button>
              <a href="/physics-calculator" className="ml-2 hyperlink">
                Open Physics Calculator
              </a>
            </li>
            <li>
              <strong>Math Solver</strong> – $1 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Math Solver", 1)}
              >
                🛒 Add to Cart
              </button>
              <a href="/math-solver" className="ml-2 hyperlink">
                Open Math Solver
              </a>
            </li>
          </ul>
        </section>

        {/* Media Utilities */}
        <section>
          <h2>Media Utilities</h2>
          <ul>
            <li>
              <strong>Media Player Premium Features</strong> – $3 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Media Player Premium", 3)}
              >
                🛒 Add to Cart
              </button>
              <a href="/media-player" className="ml-2 hyperlink">
                Go to Media Player
              </a>
            </li>
            <li>
              <strong>Audio Converter</strong> – $2 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Audio Converter", 2)}
              >
                🛒 Add to Cart
              </button>
              <a href="/audio-converter" className="ml-2 hyperlink">
                Go to Audio Converter
              </a>
            </li>
          </ul>
        </section>

        {/* Learning Hub */}
        <section>
          <h2>Learning Hub</h2>
          <ul>
            <li>
              <strong>Library & eBooks</strong> – $10 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Library & eBooks", 10)}
              >
                🛒 Add to Cart
              </button>
              <a href="/library" className="ml-2 hyperlink">
                Visit Library
              </a>
            </li>
            <li>
              <strong>Tutorials & Courses</strong> – $8 / month
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("Tutorials & Courses", 8)}
              >
                🛒 Add to Cart
              </button>
              <a href="/tutorials" className="ml-2 hyperlink">
                Explore Courses
              </a>
            </li>
          </ul>
        </section>

        {/* Storefront */}
        <section>
          <h2>Storefront</h2>
          <ul>
            <li>
              <strong>The Starlife (ebook)</strong> – $15
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("The Starlife", 15)}
              >
                🛒 Add to Cart
              </button>
            </li>
            <li>
              <strong>The Listener [A Story About The Man]</strong> – UGX 35,000
              <button
                className="ml-2 btn-cart"
                onClick={() => addToCart("The Listener", 35)}
              >
                🛒 Add to Cart
              </button>
            </li>
            <li>
              <strong>Network Data Bundles</strong>{" "}
              <a href="/store-bundles" className="ml-2 hyperlink">
                View Bundles
              </a>
            </li>
          </ul>
        </section>

        {/* Other Utilities */}
        <section>