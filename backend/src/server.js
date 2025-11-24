import dotenv from "dotenv";
dotenv.config(); // Load env before any other imports that rely on it
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Mongo connect function
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "creator_pulse",
    });
    console.log("🚀 MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// Start server
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🔥 Server running at http://localhost:${PORT}`);
  });
}

startServer();
