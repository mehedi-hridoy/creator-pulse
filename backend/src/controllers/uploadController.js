import { detectPlatform } from "../services/detectPlatform.js";

export const handleJsonUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No JSON files uploaded" });
    }

    const results = [];

    for (const file of req.files) {
      try {
        const content = JSON.parse(file.buffer.toString()); // convert buffer → string → JSON

        const platform = detectPlatform(content);

        if (!platform) {
          results.push({
            file: file.originalname,
            status: "rejected",
            reason: "Unknown or unsupported JSON structure",
          });
          continue;
        }

        // For now, we ONLY detect platform and return success.
        // Parsing + normalization will come in next hour.
        results.push({
          file: file.originalname,
          status: "accepted",
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
