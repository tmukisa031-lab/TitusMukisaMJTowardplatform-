import { useState } from "react";

export default function StoreCart({ cartItems, setCartItems }) {
  const [paypalReady, setPaypalReady] = useState(false);

  const handleRemoveItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const totalAmountUSD = cartItems.reduce((sum, item) => {
    if (item === "AI Text Generator") return sum + 5;
    if (item === "Media Player Premium") return sum + 3;
    return sum; // Free or unknown items
  }, 0);

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="text-xl font-semibold mb-2">Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-1 mb-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item}</span>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveItem(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <p className="font-medium mb-2">Total: USD {totalAmountUSD.toFixed(2)}</p>
          {/* Placeholder for PayPal Checkout */}
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => setPaypalReady(!paypalReady)}
          >
            {paypalReady ? "PayPal Loaded" : "Checkout with PayPal"}
          </button>
          {paypalReady && (
            <div className="mt-2 p-2 border rounded bg-white">
              <p>PayPal integration goes here...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}