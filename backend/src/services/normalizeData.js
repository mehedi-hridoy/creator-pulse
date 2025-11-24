// backend/src/services/normalizeData.js

export function normalizeData(parsedArray, platform, userId) {
  if (!Array.isArray(parsedArray)) return [];

  // Aggregate all metrics from parsed items
  const totalViews = parsedArray.reduce((sum, item) => sum + (item.views ?? 0), 0);
  const totalLikes = parsedArray.reduce((sum, item) => sum + (item.likes ?? 0), 0);
  const totalComments = parsedArray.reduce((sum, item) => sum + (item.comments ?? 0), 0);
  const totalShares = parsedArray.reduce((sum, item) => sum + (item.shares ?? 0), 0);
  const totalPosts = parsedArray.length;

  // Find the most recent postedAt date from the items
  const mostRecentDate = parsedArray
    .map(item => item.postedAt ? new Date(item.postedAt) : null)
    .filter(date => date !== null)
    .sort((a, b) => b - a)[0];

  // Return a single analytics document per platform upload
  return [{
    userId,
    platform: platform || "unknown",
    postedAt: mostRecentDate || new Date(),
    metrics: {
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      totalPosts
    },
    rawItems: parsedArray.map((item) => ({
      views: item.views ?? 0,
      likes: item.likes ?? 0,
      comments: item.comments ?? 0,
      shares: item.shares ?? 0,
      postedAt: item.postedAt ? new Date(item.postedAt) : null,
      message: item.message || "",
      raw: item.raw || item
    }))
  }];
}
