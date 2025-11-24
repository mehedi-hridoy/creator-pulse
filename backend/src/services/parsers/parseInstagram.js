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

  console.log(`Instagram parser: Found ${posts.length} posts`);
  console.log("Instagram parser: First post keys:", Object.keys(posts[0] || {}));

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
