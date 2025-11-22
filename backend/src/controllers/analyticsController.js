import Analytics from "../models/Analytics.js";

export const getOverview = async (req, res, next) => {
  try {
    const userId = req.userId;

    // 1. Fetch all analytics for this user
    const data = await Analytics.find({ userId });

    if (data.length === 0) {
      return res.json({
        success: true,
        message: "No analytics data yet",
        overview: null
      });
    }

    // 2. Total values
    const totalViews = data.reduce((sum, item) => sum + (item.views || 0), 0);
    const totalLikes = data.reduce((sum, item) => sum + (item.likes || 0), 0);
    const totalComments = data.reduce((sum, item) => sum + (item.comments || 0), 0);
    const totalPosts = data.length;

    // 3. Engagement rate (simple)
    const engagementRate =
      totalPosts > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;

    // 4. Platform distribution
    const platformCounts = data.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {});

    // 5. Top 3 posts
    const topPosts = [...data]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    // 6. Monthly trend (views per month)
    const monthlyTrend = {};

    data.forEach((item) => {
      if (!item.postedAt) return;

      const date = new Date(item.postedAt);
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

      monthlyTrend[month] = (monthlyTrend[month] || 0) + item.views;
    });

    res.json({
      success: true,
      overview: {
        totalViews,
        totalLikes,
        totalComments,
        totalPosts,
        engagementRate,
        platformCounts,
        topPosts,
        monthlyTrend
      }
    });
  } catch (err) {
    next(err);
  }
};
