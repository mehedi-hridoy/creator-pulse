export const detectPlatform = (json) => {
  // YouTube: has items array with snippet objects
  if (json?.items && json.items[0]?.snippet) return "youtube";
  
  // TikTok: has aweme_list array
  if (json?.aweme_list) return "tiktok";

  // Facebook: has data array with created_time and likes
  if (json?.data && json.data[0]?.created_time && json.data[0]?.likes) {
    return "facebook";
  }

  // Instagram detection - multiple formats
  // Format 1: Platform field explicitly says instagram
  if (json?.platform?.toLowerCase() === "instagram") return "instagram";
  
  // Format 2: Has content array (insights export format)
  if (json?.content && Array.isArray(json.content)) return "instagram";
  
  // Format 3: Direct media object
  if (json?.media_type || json?.media_url) return "instagram";
  
  // Format 4: Array of posts with Instagram-specific fields
  if (Array.isArray(json) && json[0]?.media_type) return "instagram";
  if (Array.isArray(json) && json[0]?.like_count !== undefined) return "instagram";
  
  // Format 5: Data wrapper with Instagram posts
  if (json?.data && json.data[0]?.media_type) return "instagram";
  if (json?.data && json.data[0]?.like_count !== undefined) return "instagram";
  
  // Format 6: Instagram insights export
  if (json?.business_discovery || json?.instagram_business_account) return "instagram";
  
  // Format 7: Media array wrapper
  if (json?.media?.data || json?.posts) return "instagram";
  
  // Format 8: Has summary with followers/engagement (insights)
  if (json?.summary?.followers !== undefined || json?.profile?.followers !== undefined) return "instagram";

  return null;
};
