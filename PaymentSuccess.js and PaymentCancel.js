// PaymentSuccess.js
import React from "react";
export default function PaymentSuccess() {
  return (
    <div className="p-6 text-center text-green-400">
      <h2 className="text-2xl font-bold">✅ Payment Successful!</h2>
      <p className="mt-2">Your subscription is now active.</p>
    </div>
  );
}

// PaymentCancel.js
import React from "react";
export default function PaymentCancel() {
  return (
    <div className="p-6 text-center text-red-400">
      <h2 className="text-2xl font-bold">❌ Payment Cancelled</h2>
      <p className="mt-2">You cancelled your payment. Please try again.</p>
    </div>
  );
}