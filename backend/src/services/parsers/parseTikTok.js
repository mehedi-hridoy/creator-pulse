export const parseTikTok = (json) => {
  if (!json.aweme_list || json.aweme_list.length === 0) return [];

  return json.aweme_list.map((post) => ({
    title: post.desc || "TikTok Video",
    views: Number(post.statistics?.play_count || 0),
    likes: Number(post.statistics?.digg_count || 0),
    comments: Number(post.statistics?.comment_count || 0),
    postedAt: post.create_time
      ? new Date(post.create_time * 1000)
      : null,
  }));
};
