export const parseYouTube = (json) => {
  let videos = [];
  
  // Handle official YouTube API format
  if (json.items && Array.isArray(json.items)) {
    videos = json.items;
  }
  // Handle custom CreatorPulse format with videos array
  else if (json.videos && Array.isArray(json.videos)) {
    videos = json.videos;
  }
  // Handle content array format
  else if (json.content && Array.isArray(json.content)) {
    videos = json.content;
  }
  
  if (!videos || videos.length === 0) return [];

  return videos.map((item) => ({
    title: item.snippet?.title || item.title || item.caption || "YouTube Video",
    views: Number(item.statistics?.viewCount || item.views || item.view_count || 0),
    likes: Number(item.statistics?.likeCount || item.likes || item.like_count || 0),
    comments: Number(item.statistics?.commentCount || item.comments || item.comment_count || 0),
    postedAt: item.snippet?.publishedAt || item.timestamp || item.published_at || item.created_time || null,
  }));
};
