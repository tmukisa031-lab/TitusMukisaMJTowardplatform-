const checkSubscription = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });

  const { status, expiryDate } = req.user.subscription;
  const now = new Date();

  if (status !== "active" || (expiryDate && expiryDate < now)) {
    return res.status(403).json({ error: "Subscription expired or inactive" });
  }

  next();
};

module.exports = checkSubscription;