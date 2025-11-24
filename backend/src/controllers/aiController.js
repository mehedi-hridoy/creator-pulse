// src/controllers/aiController.js
import Analytics from "../models/Analytics.js";
import OpenAI from "openai";

// Initialize OpenAI client lazily to ensure env vars are loaded
let openai;
function getOpenAIClient() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

export const getAiInsights = async (req, res, next) => {
  try {
    const userId = req.userId; // same as you used in getOverview / normalizeData

    const docs = await Analytics.find({ userId }).lean();

    if (!docs.length) {
      return res.json({
        success: true,
        insights: null,
        message: "No analytics data yet",
      });
    }

    // Aggregate some stats for the prompt
    const totalViews = docs.reduce((s, d) => s + (d.views || 0), 0);
    const totalLikes = docs.reduce((s, d) => s + (d.likes || 0), 0);
    const totalComments = docs.reduce((s, d) => s + (d.comments || 0), 0);
    const totalPosts = docs.length;

    const engagementRate =
      totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;

    const platformCounts = docs.reduce((acc, d) => {
      acc[d.platform] = (acc[d.platform] || 0) + 1;
      return acc;
    }, {});

    // Top 5 posts by views
    const topPosts = [...docs]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((p) => ({
        platform: p.platform,
        views: p.views,
        likes: p.likes,
        comments: p.comments,
        message: p.message?.slice(0, 120) || "",
        postedAt: p.postedAt,
      }));

    const prompt = `
You are an analytics coach for content creators.

Here is the data for one creator:

- Total views: ${totalViews}
- Total likes: ${totalLikes}
- Total comments: ${totalComments}
- Total posts: ${totalPosts}
- Engagement rate (likes+comments / views): ${engagementRate.toFixed(2)}%
- Platform post counts: ${JSON.stringify(platformCounts, null, 2)}

Top posts (truncated):
${JSON.stringify(topPosts, null, 2)}

Based on this, return a JSON object with:
{
  "summary": "3-5 sentence plain-language overview",
  "strengths": ["bullet", "bullet", "bullet"],
  "improvements": ["bullet", "bullet", "bullet"],
  "suggestions": ["short actionable tips, 5 items"],
  "contentIdeas": ["specific post ideas, 5 items"]
}

Respond with ONLY valid JSON.
    `;

    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "{}";

    let insights;
    try {
      insights = JSON.parse(raw);
    } catch (e) {
      // fallback: wrap raw text
      insights = {
        summary: raw,
        strengths: [],
        improvements: [],
        suggestions: [],
        contentIdeas: [],
      };
    }

    res.json({
      success: true,
      insights,
    });
  } catch (err) {
    next(err);
  }
};
