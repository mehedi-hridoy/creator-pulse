import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getOverview } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/overview", authMiddleware, getOverview);

export default router;
