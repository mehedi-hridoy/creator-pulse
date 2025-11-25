import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getRecommendations,
  clearRecommendationsCache,
  askRecommendationAI,
} from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/recommendations", authMiddleware, getRecommendations);
router.post("/recommendations/clear-cache", authMiddleware, clearRecommendationsCache);
router.post("/ask", authMiddleware, askRecommendationAI);

export default router;
