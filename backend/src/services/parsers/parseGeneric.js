export const parseGeneric = (json) => {
  // Generic schema: expect a top-level "content" array with post-like items
  const items = Array.isArray(json?.content) ? json.content : null;
  if (!items || items.length === 0) return [];

  const num = (v) => {
    if (v === null || v === undefined) return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const dateOrNull = (v) => {
    if (!v) return null;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  };

  return items.map((post) => ({
    title: post.caption || post.title || post.description || "Post",
    views: num(
      post.views ?? post.impressions ?? post.reach ?? post.plays ?? post.video_view_count ?? post.media_view_count
    ),
    likes: num(post.likes ?? post.like_count ?? post.likes_count),
    comments: num(post.comments ?? post.comments_count),
    shares: num(post.shares ?? post.shares_count ?? post.saves ?? post.saved),
    postedAt: dateOrNull(post.timestamp || post.publishedAt || post.publish_time || post.created_time || post.posted_at),
    message: post.caption || post.title || post.description || "",
    raw: post,
  }));
};
