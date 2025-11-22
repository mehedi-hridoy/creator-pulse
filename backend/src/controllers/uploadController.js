// adding the parser imports
import Analytics from "../models/Analytics.js";
import { detectPlatform } from "../services/detectPlatform.js";
import { parseYouTube } from "../services/parsers/parseYouTube.js";
import { parseInstagram } from "../services/parsers/parseInstagram.js";
import { parseTikTok } from "../services/parsers/parseTikTok.js";
import { normalizeData } from "../services/normalizeData.js";
import { parseFacebook } from "../services/parsers/parseFacebook.js";

export const handleJsonUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No JSON files uploaded" });
    }

    const results = [];

    for (const file of req.files) {
      try {
        const content = JSON.parse(file.buffer.toString());
        const platform = detectPlatform(content);

        if (!platform) {
          results.push({
            file: file.originalname,
            status: "rejected",
            reason: "Unknown platform or unsupported JSON structure ",
          });
          continue;
        }

        let parsed = [];

        if (platform === "youtube") parsed = parseYouTube(content);
        else if (platform === "instagram") parsed = parseInstagram(content);
        else if (platform === "tiktok") parsed = parseTikTok(content);
        else if (platform === "facebook") parsed = parseFacebook(content);

        const normalized = normalizeData(parsed, platform, req.userId);

        // Save to DB
        await Analytics.insertMany(normalized);

        results.push({
          file: file.originalname,
          status: "saved",
          items: normalized.length,
          platform,
        });
      } catch (err) {
        results.push({
          file: file.originalname,
          status: "rejected",
          reason: "Invalid JSON format",
        });
      }
    }

    res.json({
      success: true,
      results,
    });
  } catch (err) {
    next(err);
  }
};
