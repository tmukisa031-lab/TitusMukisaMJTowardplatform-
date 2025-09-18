import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SubscribeButton = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startPayment = async (method) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/subscriptions/pay/${method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-gray-400">Login to subscribe.</p>;

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-bold">Choose Payment Method</h2>
      <button
        onClick={() => startPayment("flutterwave")}
        disabled={loading}
        className="bg-purple-500 px-4 py-2 rounded text-white w-full"
      >
        {loading ? "Redirecting..." : "Pay with Flutterwave (Mobile Money, Card)"}
      </button>
      <button
        onClick={() => startPayment("paypal")}
        disabled={loading}
        className="bg-blue-500 px-4 py-2 rounded text-white w-full"
      >
        {loading ? "Redirecting..." : "Pay with PayPal"}
      </button>
      {error && <p className="mt-2 text-red-400">{error}</p>}
    </div>
  );
};

export default SubscribeButton;