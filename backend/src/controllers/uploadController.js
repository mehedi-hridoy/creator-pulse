import Analytics from "../models/Analytics.js";
import { detectPlatform } from "../services/detectPlatform.js";

// parsers
import { parseYouTube } from "../services/parsers/parseYouTube.js";
import { parseInstagram } from "../services/parsers/parseInstagram.js";
import { parseTikTok } from "../services/parsers/parseTikTok.js";
import { parseFacebook } from "../services/parsers/parseFacebook.js";

// normalization
import { normalizeData } from "../services/normalizeData.js";

export const handleJsonUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No JSON files uploaded" });
    }

    const results = [];

    for (const file of req.files) {
      try {
        // 1. Parse JSON file
        const content = JSON.parse(file.buffer.toString());
        console.log("Upload - File:", file.originalname);
        console.log("Upload - JSON keys:", Object.keys(content));
        console.log("Upload - Is Array:", Array.isArray(content));
        if (Array.isArray(content)) {
          console.log("Upload - First item keys:", Object.keys(content[0] || {}));
        }

        // 2. Detect which platform this JSON belongs to
        const platform = detectPlatform(content);
        console.log("Upload - Detected platform:", platform);

        if (!platform) {
          results.push({
            file: file.originalname,
            status: "rejected",
            reason: "Unknown or unsupported JSON structure"
          });
          continue;
        }

        // 3. Parse based on platform
        let parsedData = [];

        if (platform === "youtube") parsedData = parseYouTube(content);
        else if (platform === "instagram") parsedData = parseInstagram(content);
        else if (platform === "tiktok") parsedData = parseTikTok(content);
        else if (platform === "facebook") parsedData = parseFacebook(content);

        console.log("Upload - Parsed data count:", parsedData?.length || 0);

        if (!parsedData || parsedData.length === 0) {
          results.push({
            file: file.originalname,
            status: "rejected",
            reason: "Parsed data empty - invalid format"
          });
          continue;
        }

        // 4. Normalize into database-friendly schema
        const normalized = normalizeData(parsedData, platform, req.userId);
        console.log("Upload - Normalized count:", normalized?.length || 0);

        // 5. Save to DB
        await Analytics.insertMany(normalized);
        console.log("Upload - Saved to DB successfully");

        // 6. Push successful result
        results.push({
          file: file.originalname,
          status: "saved",
          items: normalized.length,
          platform
        });

      } catch (err) {
        console.error("File error:", err.message);
        console.error("Stack:", err.stack);

        results.push({
          file: file.originalname,
          status: "rejected",
          reason: err.message || "Invalid JSON file"
        });
      }
    }

    // Final response
    res.json({
      success: true,
      results
    });

  } catch (err) {
    next(err);
  }
};
