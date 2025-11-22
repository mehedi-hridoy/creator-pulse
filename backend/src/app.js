import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Creator Pulse API running" });
});

// API routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/analytics", analyticsRoutes);

// Error handling fallback
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});



export default app;
