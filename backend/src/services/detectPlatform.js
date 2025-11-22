export const detectPlatform = (json) => {
  if (json?.items && json.items[0]?.snippet) return "youtube";
  if (json?.media_type || json?.media_url) return "instagram";
  if (json?.aweme_list) return "tiktok";

   // Facebook detection
  if (json?.data && json.data[0]?.created_time && json.data[0]?.likes) {
    return "facebook";
  }

  return null;
};
