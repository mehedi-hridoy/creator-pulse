export const parseInstagram = (json) => {
  if (!json.data || json.data.length === 0) return [];

  return json.data.map((post) => ({
    title: post.caption || "Instagram Post",
    views: Number(post.media_view_count || 0),
    likes: Number(post.like_count || 0),
    comments: Number(post.comments_count || 0),
    postedAt: post.timestamp || null,
  }));
};
