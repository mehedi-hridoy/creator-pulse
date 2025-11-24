// src/routes/aiRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAiInsights } from "../controllers/aiController.js";

const router = express.Router();

router.get("/insights", authMiddleware, getAiInsights);

export default router;
