import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./config/googlePassport.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();





// Core middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(passport.initialize());


// CORS setup (allow multiple dev origins and env override)
// Updated line to allow 5173 AND 5174
const allowedOrigins = (process.env.CORS_ORIGINS || "https://creatorpulse.mehedihridoy.online,http://localhost:5173,http://localhost:5174").split(",");
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // allow curl/postman
      const ok = allowedOrigins.includes(origin);
      cb(ok ? null : new Error("Not allowed by CORS"), ok);
    },
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
app.use("/ai", aiRoutes);

// Error handling fallback
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});



export default app;
