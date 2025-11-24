import express from "express";
import { register, login, me, googleStart, googleCallback, logout, googleStatus, updateProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);
router.patch("/update-profile", authMiddleware, updateProfile);
router.get("/google", googleStart);
router.get("/google/callback", googleCallback);
router.get("/google/status", googleStatus);

export default router;
