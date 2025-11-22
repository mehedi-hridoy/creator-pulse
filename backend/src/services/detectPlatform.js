export const detectPlatform = (json) => {
  if (json?.items && json.items[0]?.snippet) return "youtube";
  if (json?.media_type || json?.media_url) return "instagram";
  if (json?.aweme_list) return "tiktok";

  return null;
};
