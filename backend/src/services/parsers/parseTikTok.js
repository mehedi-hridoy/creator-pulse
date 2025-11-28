export const parseTikTok = (json) => {
  let videos = [];
  
  console.log("TikTok parser: Input keys:", Object.keys(json || {}));
  
  // Handle official TikTok API format
  if (json.aweme_list && Array.isArray(json.aweme_list)) {
    videos = json.aweme_list;
    console.log("TikTok parser: Using aweme_list format");
  }
  // Handle custom CreatorPulse format with videos array
  else if (json.videos && Array.isArray(json.videos)) {
    videos = json.videos;
    console.log("TikTok parser: Using videos format");
  }
  // Handle content array format
  else if (json.content && Array.isArray(json.content)) {
    videos = json.content;
    console.log("TikTok parser: Using content format");
  }
  // Handle posts array format
  else if (json.posts && Array.isArray(json.posts)) {
    videos = json.posts;
    console.log("TikTok parser: Using posts format");
  }
  
  if (!videos || videos.length === 0) {
    console.log("TikTok parser: No videos found");
    return [];
  }

  console.log(`TikTok parser: Processing ${videos.length} videos`);
  console.log("TikTok parser: First video keys:", Object.keys(videos[0] || {}));

  const parseDate = (dateValue) => {
    if (!dateValue) return null;
    
    // Handle Unix timestamp (seconds)
    if (typeof dateValue === 'number') {
      return new Date(dateValue * 1000);
    }
    
    // Handle ISO string
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      return isNaN(date.getTime()) ? null : date;
    }
    
    return null;
  };

  const result = videos.map((post, index) => {
    const parsed = {
      title: post.desc || post.title || post.caption || post.description || `TikTok Video ${index + 1}`,
      views: Number(
        post.statistics?.play_count || 
        post.views || 
        post.view_count || 
        post.plays || 
        post.play_count ||
        post.impressions ||
        post.reach ||
        0
      ),
      likes: Number(
        post.statistics?.digg_count || 
        post.likes || 
        post.like_count || 
        post.digg_count ||
        0
      ),
      comments: Number(
        post.statistics?.comment_count || 
        post.comments || 
        post.comment_count ||
        0
      ),
      shares: Number(
        post.statistics?.share_count || 
        post.shares || 
        post.share_count ||
        post.forward_count ||
        0
      ),
      postedAt: parseDate(post.create_time || post.timestamp || post.published_at || post.created_time || post.date),
    };
    
    if (index === 0) {
      console.log("TikTok parser: First parsed item:", parsed);
    }
    
    return parsed;
  });

  console.log(`TikTok parser: Successfully parsed ${result.length} items`);
  return result;
};
