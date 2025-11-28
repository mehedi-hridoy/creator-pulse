import Analytics from "../models/Analytics.js";
import { detectPlatform } from "../services/detectPlatform.js";

// parsers
import { parseYouTube } from "../services/parsers/parseYouTube.js";
import { parseInstagram } from "../services/parsers/parseInstagram.js";
import { parseTikTok } from "../services/parsers/parseTikTok.js";
import { parseFacebook } from "../services/parsers/parseFacebook.js";
import { parseGeneric } from "../services/parsers/parseGeneric.js";

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
        const explicitKeys = ["platform", "platform_name", "source", "provider"];
        let explicitPlatform = null;
        for (const k of explicitKeys) {
          const v = content && typeof content === "object" ? content[k] : undefined;
          if (typeof v === "string" && v.trim()) {
            const s = v.trim().toLowerCase();
            if (["instagram", "insta", "ig"].includes(s)) explicitPlatform = "instagram";
            else if (["youtube", "yt", "you_tube"].includes(s)) explicitPlatform = "youtube";
            else if (["facebook", "fb", "meta-fb", "meta_fb"].includes(s)) explicitPlatform = "facebook";
            else if (["tiktok", "tik tok", "tik_tok", "tt"].includes(s)) explicitPlatform = "tiktok";
            if (explicitPlatform) break;
          }
        }

        const platform = explicitPlatform || detectPlatform(content, file.originalname);
        console.log("Upload - Detected platform:", platform);

        if (!platform) {
          results.push({
            file: file.originalname,
            status: "rejected",
            reason: "Unknown or unsupported JSON structure"
          });
          continue;
        }

        // 3. Parse based on platform/schema
        let parsedData = [];

        // If platform explicitly declared, first try generic schema (common CreatorPulse format)
        if (explicitPlatform) {
          parsedData = parseGeneric(content);
          if (!parsedData || parsedData.length === 0) {
            if (explicitPlatform === "youtube") parsedData = parseYouTube(content);
            else if (explicitPlatform === "instagram") parsedData = parseInstagram(content);
            else if (explicitPlatform === "tiktok") parsedData = parseTikTok(content);
            else if (explicitPlatform === "facebook") parsedData = parseFacebook(content);
          }
        } else {
          // No explicit platform: prefer generic only when content[] exists, else platform parsers
          if (Array.isArray(content?.content)) parsedData = parseGeneric(content);
          if (!parsedData || parsedData.length === 0) {
            if (platform === "youtube") parsedData = parseYouTube(content);
            else if (platform === "instagram") parsedData = parseInstagram(content);
            else if (platform === "tiktok") parsedData = parseTikTok(content);
            else if (platform === "facebook") parsedData = parseFacebook(content);
          }
        }

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
