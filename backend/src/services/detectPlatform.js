import { parseYouTube } from "./parsers/parseYouTube.js";
import { parseInstagram } from "./parsers/parseInstagram.js";
import { parseTikTok } from "./parsers/parseTikTok.js";
import { parseFacebook } from "./parsers/parseFacebook.js";

// Helper checkers for clearer intent and stricter matching
const isArray = Array.isArray;

const isYouTube = (json) => {
  if (!json) return false;
  if (json.kind && String(json.kind).startsWith("youtube#")) return true;
  if (isArray(json.items) && json.items[0]?.snippet && (
    json.items[0]?.statistics?.viewCount !== undefined ||
    json.items[0]?.snippet?.channelId
  )) return true;
  return false;
};

const isTikTok = (json) => Boolean(json?.aweme_list && isArray(json.aweme_list));

const isFacebook = (json) => {
  if (!(json?.data && isArray(json.data) && json.data.length)) return false;
  const p = json.data[0] || {};
  if (p.created_time && (
    p.insights ||
    (p.likes && p.likes.summary && p.likes.summary.total_count !== undefined) ||
    (p.comments && p.comments.summary && p.comments.summary.total_count !== undefined) ||
    p.message
  )) return true;
  return false;
};

const isInstagram = (json) => {
  if (!json) return false;
  if (json.platform && String(json.platform).toLowerCase() === "instagram") return true;
  if (json.business_discovery || json.instagram_business_account) return true;
  // Permalink must look like an instagram URL; media_url often points to IG CDN
  if (
    json.media_type ||
    (typeof json.permalink === "string" && json.permalink.includes("instagram.com")) ||
    (typeof json.media_url === "string" && json.media_url.includes("cdninstagram"))
  ) return true;
  if (json.media && isArray(json.media.data) && (
    json.media.data[0]?.media_type ||
    (typeof json.media.data[0]?.permalink === "string" && json.media.data[0].permalink.includes("instagram.com"))
  )) return true;
  if (isArray(json.content) && (json.content[0]?.media_type || json.content[0]?.permalink || json.content[0]?.caption)) return true;
  if (isArray(json.posts) && (json.posts[0]?.media_type || json.posts[0]?.permalink || json.posts[0]?.caption)) return true;
  if (isArray(json.data) && (json.data[0]?.media_type || json.data[0]?.permalink || json.data[0]?.caption)) return true;
  return false;
};

export const detectPlatform = (json, filename = "") => {
  // 1) Explicit declaration on payload takes priority
  try {
    const explicitKeys = ["platform", "platform_name", "source", "provider"];
    for (const k of explicitKeys) {
      const v = json && typeof json === "object" ? json[k] : undefined;
      if (typeof v === "string" && v.trim()) {
        const s = v.trim().toLowerCase();
        if (["instagram", "insta", "ig"].includes(s)) return "instagram";
        if (["youtube", "yt", "you_tube"].includes(s)) return "youtube";
        if (["facebook", "fb", "meta-fb", "meta_fb"].includes(s)) return "facebook";
        if (["tiktok", "tik tok", "tik_tok", "tt"].includes(s)) return "tiktok";
      }
    }
  } catch {}

  // 2) Heuristic-first detection
  if (isTikTok(json)) return "tiktok";
  if (isYouTube(json)) return "youtube";
  if (isFacebook(json)) return "facebook";
  if (isInstagram(json)) return "instagram";

  // 3) Probe parsers and pick the most plausible
  try {
    const candidates = [
      ["tiktok", parseTikTok(json)],
      ["youtube", parseYouTube(json)],
      ["facebook", parseFacebook(json)],
      ["instagram", parseInstagram(json)],
    ];
    const ranked = candidates
      .map(([name, arr]) => ({ name, count: Array.isArray(arr) ? arr.length : 0 }))
      .sort((a, b) => b.count - a.count);
    if (ranked[0]?.count > 0 && ranked[0].count !== ranked[1]?.count) {
      return ranked[0].name;
    }
  } catch {}

  // 4) Filename hints as last resort
  const name = String(filename).toLowerCase();
  if (name.includes("tiktok") || name.includes("tik_tok")) return "tiktok";
  if (name.includes("youtube") || name.includes("yt")) return "youtube";
  if (name.includes("facebook") || name.includes("fb")) return "facebook";
  if (name.includes("instagram") || name.includes("insta")) return "instagram";

  return null;
};
