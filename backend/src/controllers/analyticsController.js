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

    // Platform distribution counts
    const platformCounts = data.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {});

    // Per-platform detailed summary
    const perPlatform = {};
    data.forEach((item) => {
      const p = item.platform;
      if (!perPlatform[p]) {
        perPlatform[p] = {
          platform: p,
          views: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          posts: 0,
          engagementRate: 0
        };
      }
      perPlatform[p].views += item.metrics?.totalViews || 0;
      perPlatform[p].likes += item.metrics?.totalLikes || 0;
      perPlatform[p].comments += item.metrics?.totalComments || 0;
      perPlatform[p].shares += item.metrics?.totalShares || 0;
      perPlatform[p].posts += item.metrics?.totalPosts || 0;
    });

    // Calculate engagement rate per platform
    Object.values(perPlatform).forEach(plat => {
      plat.engagementRate = plat.views > 0
        ? ((plat.likes + plat.comments) / plat.views) * 100
        : 0;
    });

    // Top posts (use views inside metrics)
    const topPosts = [...data]
      .sort((a, b) => (b.metrics?.totalViews || 0) - (a.metrics?.totalViews || 0))
      .slice(0, 5)
      .map(post => ({
        platform: post.platform,
        postedAt: post.postedAt,
        views: post.metrics?.totalViews || 0,
        likes: post.metrics?.totalLikes || 0,
        comments: post.metrics?.totalComments || 0,
        shares: post.metrics?.totalShares || 0
      }));

    // Monthly views trend
    const monthlyTrend = {};
    data.forEach((item) => {
      if (!item.postedAt) return;
      const date = new Date(item.postedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyTrend[monthKey] = (monthlyTrend[monthKey] || 0) + (item.metrics?.totalViews || 0);
    });

    // Sort monthly trend by date
    const sortedMonthlyTrend = Object.fromEntries(
      Object.entries(monthlyTrend).sort((a, b) => a[0].localeCompare(b[0]))
    );

    // Calculate growth metrics (compare last 30 days vs previous 30)
    const now = new Date();
    const last30Days = data.filter(item => {
      if (!item.postedAt) return false;
      const diff = now - new Date(item.postedAt);
      return diff <= 30 * 24 * 60 * 60 * 1000;
    });

    const previous30Days = data.filter(item => {
      if (!item.postedAt) return false;
      const diff = now - new Date(item.postedAt);
      return diff > 30 * 24 * 60 * 60 * 1000 && diff <= 60 * 24 * 60 * 60 * 1000;
    });

    const last30Views = last30Days.reduce((sum, item) => sum + (item.metrics?.totalViews || 0), 0);
    const prev30Views = previous30Days.reduce((sum, item) => sum + (item.metrics?.totalViews || 0), 0);
    const viewsGrowth = prev30Views > 0 ? ((last30Views - prev30Views) / prev30Views) * 100 : 0;

    const last30Engagement = last30Days.reduce((sum, item) => 
      sum + (item.metrics?.totalLikes || 0) + (item.metrics?.totalComments || 0), 0);
    const prev30Engagement = previous30Days.reduce((sum, item) => 
      sum + (item.metrics?.totalLikes || 0) + (item.metrics?.totalComments || 0), 0);
    const engagementGrowth = prev30Engagement > 0 
      ? ((last30Engagement - prev30Engagement) / prev30Engagement) * 100 
      : 0;

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
        perPlatform: Object.values(perPlatform),
        topPosts,
        monthlyTrend: sortedMonthlyTrend,
        growth: {
          views: viewsGrowth,
          engagement: engagementGrowth,
          last30Days: last30Views,
          previous30Days: prev30Views
        }
      }
    });

  } catch (err) {
    next(err);
  }
};
