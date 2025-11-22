import express from "express";
import { register, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.get("/test", (req, res) => {
  res.send("Auth Route Loaded");
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({ success: true, userId: req.userId });
});


export default router;
