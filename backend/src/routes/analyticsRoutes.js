import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getOverview } from "../controllers/analyticsController.js";
import Analytics from "../models/Analytics.js";

const router = express.Router();

router.get("/overview", authMiddleware, getOverview);

// Clear all analytics for current user (useful for testing/resetting)
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    await Analytics.deleteMany({ userId: req.userId });
    res.json({ success: true, message: "All analytics cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
