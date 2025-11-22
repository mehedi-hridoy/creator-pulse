export const normalizeData = (parsed, platform, userId) => {
  return parsed.map((p) => ({
    userId,
    platform,
    title: p.title,
    views: p.views,
    likes: p.likes,
    comments: p.comments,
    postedAt: p.postedAt ? new Date(p.postedAt) : null,
  }));
};
