export const parseYouTube = (json) => {
  if (!json.items || json.items.length === 0) return [];

  return json.items.map((item) => ({
    title: item.snippet?.title || "Untitled",
    views: Number(item.statistics?.viewCount || 0),
    likes: Number(item.statistics?.likeCount || 0),
    comments: Number(item.statistics?.commentCount || 0),
    postedAt: item.snippet?.publishedAt || null,
  }));
};
