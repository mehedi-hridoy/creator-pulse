import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { handleJsonUpload } from "../controllers/uploadController.js";

const router = express.Router();

// single or multiple JSON files
router.post(
  "/json",
  authMiddleware,
  upload.array("files", 10),   // allow up to 10 files at once
  handleJsonUpload
);

router.get("/test", (req, res) => {
  res.send("Upload route working");
});

export default router;
