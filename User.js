const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    subscription: {
      status: { type: String, default: "inactive" }, // inactive, active, expired
      plan: { type: String, default: "free" },       // free, premium, etc.
      expiryDate: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);