import { spawn } from "child_process";
import Analytics from "../models/Analytics.js";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import { generateNarrative, askWithContext } from "../services/contentBrain.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple in-memory cache { userId: { data, expiresAt } }
const CACHE = new Map();
const TTL_MS = 6 * 60 * 60 * 1000; // 6h

function getPythonBin() {
  return process.env.PYTHON_BIN || "python3";
}

function fromDocsToPlatforms(docs) {
  const platforms = {};
  for (const d of docs) {
    const p = (d.platform || "unknown").toLowerCase();
    if (!platforms[p]) platforms[p] = [];
    platforms[p].push({
      views: d.views || 0,
      likes: d.likes || 0,
      comments: d.comments || 0,
      shares: d.shares || 0,
      title: d.title || d.message || "",
      postedAt: d.postedAt ? new Date(d.postedAt).toISOString() : null,
      durationSec: d.durationSec || 0,
      platform: p,
    });
  }
  return platforms;
}

export async function getRecommendations(req, res, next) {
  try {
    const userId = req.userId;

    // Cache hit
    const hit = CACHE.get(userId);
    if (hit && hit.expiresAt > Date.now()) {
      return res.json({ success: true, ...hit.data, cached: true });
    }

    // Fetch docs and serialize to JSON for Data Brain
    const docs = await Analytics.find({ userId }).lean();
    const platforms = fromDocsToPlatforms(docs);
    const payload = { platforms };

    // Spawn Python Data Brain
    const pyPath = path.resolve(__dirname, "../../ai/data_brain.py");
    const py = spawn(getPythonBin(), [pyPath], { stdio: ["pipe", "pipe", "pipe"] });

    let out = "";
    let err = "";
    py.stdout.on("data", (d) => (out += d.toString()));
    py.stderr.on("data", (d) => (err += d.toString()));

    py.on("error", (e) => {
      err += e.message;
    });

    py.on("close", async (code) => {
      if (code !== 0 && err) {
        return next(new Error(`Data Brain failed: ${err}`));
      }
      let recos;
      try {
        recos = JSON.parse(out || "{}");
      } catch (e) {
        return next(new Error("Invalid JSON from Data Brain"));
      }

      // Generate narrative with LLM
      let narrative = { summary: "", actions: [], contentIdeas: [] };
      try {
        narrative = await generateNarrative(recos);
      } catch (e) {
        // Keep numeric results even if LLM fails
      }

      const resp = { success: true, recommendations: recos, narrative };
      CACHE.set(userId, { data: resp, expiresAt: Date.now() + TTL_MS });
      res.json(resp);
    });

    // Write payload to stdin
    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();
  } catch (err) {
    next(err);
  }
}

export function clearRecommendationsCache(req, res) {
  CACHE.delete(req.userId);
  res.json({ success: true });
}

export async function askRecommendationAI(req, res, next) {
  try {
    const userId = req.userId;
    const { question } = req.body || {};
    if (!question) return res.status(400).json({ success: false, error: "Missing question" });

    // Get cached recos or compute quickly
    let recosData = CACHE.get(userId)?.data?.recommendations;
    if (!recosData) {
      // Minimal compute: reuse getRecommendations logic without caching side-effects
      const docs = await Analytics.find({ userId }).lean();
      const platforms = fromDocsToPlatforms(docs);
      const payload = { platforms };
      const pyPath = path.resolve(__dirname, "../../ai/data_brain.py");
      const py = spawn(getPythonBin(), [pyPath], { stdio: ["pipe", "pipe", "pipe"] });
      let out = ""; let err = "";
      py.stdout.on("data", d => out += d.toString());
      py.stderr.on("data", d => err += d.toString());
      await new Promise((resolve) => {
        py.on("close", () => resolve());
        py.stdin.write(JSON.stringify(payload));
        py.stdin.end();
      });
      if (err && !out) return next(new Error(`Data Brain failed: ${err}`));
      try { recosData = JSON.parse(out || "{}"); } catch { recosData = {}; }
    }
    const q = String(question).trim().toLowerCase();
    const isGreeting = ["hi","hello","hey","yo","sup","help"].some((w)=> q===w || q.startsWith(w+" "));
    let answer;
    if (isGreeting) {
      const brand = process.env.BRAND_NAME || "CreatorPulse";
      const ts = recosData?.generatedAt ? new Date(recosData.generatedAt).toLocaleString() : "recently";
      const engine = recosData?.meta?.engine || "python";
      answer = `Hi — we're **${brand}**, your AI analytics copilot.\n\nWe analyzed your latest data (engine: ${engine}, generated ${ts}). Ask us for:\n\n1. Best posting times per platform\n2. Where to invest vs. deprioritize\n3. Risks (decline/stagnation/volatility)\n4. Content ideas from your top themes\n\nTip: Upload posts with timestamps to unlock posting windows.`;
    } else {
      answer = await askWithContext(question, recosData || {});
    }
    res.json({ success: true, answer });
  } catch (e) {
    next(e);
  }
}
