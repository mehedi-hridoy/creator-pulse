export const parseInstagram = (json) => {
  let posts = [];

  // Determine where the posts array is
  if (Array.isArray(json)) {
    // Direct array of posts
    posts = json;
  } else if (json?.content && Array.isArray(json.content)) {
    // Insights export format with content array
    posts = json.content;
  } else if (json?.data && Array.isArray(json.data)) {
    // Data wrapper format
    posts = json.data;
  } else if (json?.media?.data && Array.isArray(json.media.data)) {
    // Media nested format
    posts = json.media.data;
  } else if (json?.posts && Array.isArray(json.posts)) {
    // Posts wrapper format
    posts = json.posts;
  } else if (json?.business_discovery?.media?.data) {
    // Business discovery format
    posts = json.business_discovery.media.data;
  } else if (json?.media_type) {
    // Single post object
    posts = [json];
  }

  if (!posts || posts.length === 0) {
    console.log("Instagram parser: No posts found in structure:", Object.keys(json || {}));
    return [];
  }

  // Heuristic: ensure these look like IG posts to avoid false positives
  const isIGPost = (p) =>
    p?.media_type !== undefined ||
    (typeof p?.permalink === "string" && p.permalink.includes("instagram.com")) ||
    (typeof p?.media_url === "string" && p.media_url.includes("cdninstagram")) ||
    p?.type === "reel" ||
    p?.type === "photo" ||
    (p?.caption !== undefined && p?.hashtags !== undefined) ||
    p?.saves !== undefined ||
    p?.retention !== undefined;

  const igCount = posts.reduce((acc, p) => acc + (isIGPost(p) ? 1 : 0), 0);
  if (igCount === 0) {
    // Not an IG-like shape — return [] so detector can try other platforms
    console.log("Instagram parser: No clear IG indicators found, skipping");
    return [];
  }

  console.log(`Instagram parser: Found ${igCount}/${posts.length} posts with IG indicators`);

  return posts.map((post) => ({
    title: post.caption || post.title || post.description || "Instagram Post",
    views: Number(
      post.media_view_count || 
      post.video_view_count || 
      post.views || 
      post.impressions || 
      post.reach ||
      post.plays ||
      0
    ),
    likes: Number(
      post.like_count || 
      post.likes || 
      post.likes_count ||
      0
    ),
    comments: Number(
      post.comments_count || 
      post.comments || 
      0
    ),
    shares: Number(
      post.shares_count || 
      post.shares || 
      post.saved ||
      post.saves ||
      0
    ),
    postedAt: post.timestamp || post.created_time || post.taken_at || post.date || post.posted_at || null,
  }));
};
