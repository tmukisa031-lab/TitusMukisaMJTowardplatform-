export const subscribeUser = (req, res) => {
  const userId = req.user.id;
  // Find user (in-memory for now)
  const user = global.users?.find((u) => u.id === userId);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.subscribed = true; // simulate subscription
  res.json({ message: "Subscription activated", user });
};