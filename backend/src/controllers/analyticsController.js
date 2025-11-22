import Analytics from "../models/Analytics.js";

export const getOverview = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Fetch all analytics for this user
    const data = await Analytics.find({ userId });

    if (data.length === 0) {
      return res.json({
        success: true,
        message: "No analytics data yet",
        overview: null
      });
    }

    // Metrics aggregated from normalized schema
    const totalViews = data.reduce((sum, item) => sum + (item.metrics?.totalViews || 0), 0);
    const totalLikes = data.reduce((sum, item) => sum + (item.metrics?.totalLikes || 0), 0);
    const totalComments = data.reduce((sum, item) => sum + (item.metrics?.totalComments || 0), 0);
    const totalShares = data.reduce((sum, item) => sum + (item.metrics?.totalShares || 0), 0);
    const totalPosts = data.reduce((sum, item) => sum + (item.metrics?.totalPosts || 0), 0);

    // Engagement rate formula
    const engagementRate =
      totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;

    // Platform distribution
    const platformCounts = data.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {});

    // Top posts (use views inside metrics)
    const topPosts = [...data]
      .sort((a, b) => (b.metrics?.totalViews || 0) - (a.metrics?.totalViews || 0))
      .slice(0, 3);

    // Monthly views trend
    const monthlyTrend = {};

    data.forEach((item) => {
      if (!item.postedAt) return;

      const date = new Date(item.postedAt);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

      monthlyTrend[monthKey] = (monthlyTrend[monthKey] || 0) + (item.metrics?.totalViews || 0);
    });

    res.json({
      success: true,
      overview: {
        totalViews,
        totalLikes,
        totalComments,
        totalShares,
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
