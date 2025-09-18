const cron = require("node-cron");
const User = require("./models/User");

// Run at midnight daily
cron.schedule("0 0 * * *", async () => {
  const now = new Date();
  await User.updateMany(
    { "subscription.status": "active", "subscription.expiryDate": { $lt: now } },
    { $set: { "subscription.status": "expired" } }
  );
  console.log("Expired subscriptions updated ✅");
});