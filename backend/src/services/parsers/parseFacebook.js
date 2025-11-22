export const parseFacebook = (json) => {
  if (!json.data || json.data.length === 0) return [];

  return json.data.map((post) => {
    // extract insights (impressions/views)
    let views = 0;

    const insightsArray = post.insights?.data || [];
    const impressions = insightsArray.find((i) => i.name === "post_impressions");

    if (impressions && impressions.values && impressions.values[0]?.value) {
      views = Number(impressions.values[0].value);
    }

    return {
      title: post.message || "Facebook Post",
      views,
      likes: Number(post.likes?.summary?.total_count || 0),
      comments: Number(post.comments?.summary?.total_count || 0),
      postedAt: post.created_time || null,
    };
  });
};
