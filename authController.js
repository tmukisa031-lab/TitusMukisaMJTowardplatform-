import jwt from "jsonwebtoken";

const users = []; // temporary in-memory store

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "secretkey", { expiresIn: "30d" });

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password, subscribed: false };
  users.push(user);
  res.json({ ...user, token: generateToken(user.id) });
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  res.json({ ...user, token: generateToken(user.id) });
};