export const parseFacebook = (json) => {
  let posts = [];
  
  // Handle official Facebook Graph API format
  if (json.data && Array.isArray(json.data)) {
    posts = json.data;
  }
  // Handle custom CreatorPulse format with posts array
  else if (json.posts && Array.isArray(json.posts)) {
    posts = json.posts;
  }
  // Handle content array format
  else if (json.content && Array.isArray(json.content)) {
    posts = json.content;
  }
  
  if (!posts || posts.length === 0) return [];

  return posts.map((post) => {
    // extract insights (impressions/views)
    let views = 0;

    const insightsArray = post.insights?.data || [];
    const impressions = insightsArray.find((i) => i.name === "post_impressions");

    if (impressions && impressions.values && impressions.values[0]?.value) {
      views = Number(impressions.values[0].value);
    } else {
      views = Number(post.views || post.impressions || post.reach || 0);
    }

    return {
      title: post.message || post.title || post.caption || "Facebook Post",
      views,
      likes: Number(post.likes?.summary?.total_count || post.likes || post.like_count || 0),
      comments: Number(post.comments?.summary?.total_count || post.comments || post.comment_count || 0),
      shares: Number(post.shares || post.share_count || 0),
      postedAt: post.created_time || post.timestamp || post.published_at || null,
    };
  });
};
