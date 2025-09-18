import express from "express";
import cors from "cors";
import mediaRoutes from "./routes/mediaRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/media", mediaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Universal Media Hub API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));