import React, { useState } from "react";
import StoreCart from "../components/StoreCart";

export default function LearningHubPage() {
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (name, price) => {
    setCartItems([...cartItems, { name, price }]);
  };

  const products = [
    { name: "Physics eBook", price: 5, link: "/library/physics" },
    { name: "Chemistry eBook", price: 5, link: "/library/chemistry" },
    { name: "Math Tutorials", price: 3, link: "/tutorials/math" },
    { name: "Programming Courses", price: 5, link: "/tutorials/programming" },
  ];

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Learning Hub</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Library & eBooks</h2>
        <ul className="list-disc pl-5 space-y-2">
          {products.slice(0, 2).map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> – ${item.price} / month
              <button
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                onClick={() => addToCart(item.name, item.price)}
              >
                🛒 Add to Cart
              </button>
              <a href={item.link} className="ml-2 text-blue-600 underline">
                Open
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Tutorials & Courses</h2>
        <ul className="list-disc pl-5 space-y-2">
          {products.slice(2).map((item, idx) => (
            <li key={idx}>
              <strong>{item.name}</strong> – ${item.price} / month
              <button
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                onClick={() => addToCart(item.name, item.price)}
              >
                🛒 Add to Cart
              </button>
              <a href={item.link} className="ml-2 text-blue-600 underline">
                Explore
              </a>
            </li>
          ))}
        </ul>
      </section>
      <StoreCart cartItems={cartItems} setCartItems={setCartItems} paymentMethods={["PayPal","Mobile Money"]} />
    </main>
  );
}