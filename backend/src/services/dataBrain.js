/**
 * Data Brain (Node.js): Pure JavaScript analytics engine
 * Replaces Python data_brain.py for cPanel compatibility
 * 
 * Computes:
 * - Posting schedule recommendations (weekday/hour windows)
 * - Platform focus analysis (growth, engagement, decision)
 * - Growth risk alerts (declining, volatility, stagnation)
 * - Content theme clusters (by engagement patterns)
 */

// ---- Utilities ----

function safeDate(dateStr) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

function engagementRate(record) {
  const views = Math.max(Number(record.views) || 0, 1);
  const likes = Number(record.likes) || 0;
  const comments = Number(record.comments) || 0;
  return (likes + comments) / views;
}

function normalizeRecord(record, platform) {
  return {
    platform,
    date: safeDate(record.postedAt),
    views: Number(record.views) || 0,
    likes: Number(record.likes) || 0,
    comments: Number(record.comments) || 0,
    shares: Number(record.shares) || 0,
    durationSec: Number(record.durationSec) || 0,
    title: record.title || record.message || "",
    er: engagementRate(record),
  };
}

// ---- Posting Schedule ----

function computePostingSchedule(records) {
  const results = {};
  
  // Group by platform
  const byPlatform = {};
  for (const r of records) {
    if (!byPlatform[r.platform]) byPlatform[r.platform] = [];
    byPlatform[r.platform].push(r);
  }

  for (const [platform, platformRecords] of Object.entries(byPlatform)) {
    const withDates = platformRecords.filter(r => r.date !== null);
    
    if (withDates.length < 3) {
      results[platform] = {
        recommendations: [],
        note: "Insufficient timestamps; unable to infer schedule",
      };
      continue;
    }

    // Determine metric: use ER if non-zero, else views
    const totalER = withDates.reduce((sum, r) => sum + r.er, 0);
    const metric = totalER > 0 ? 'er' : 'views';

    // Aggregate by (weekday, hour)
    const buckets = {};
    for (const r of withDates) {
      const weekday = r.date.getDay(); // 0=Sunday, 1=Monday, etc.
      const hour = r.date.getHours();
      const key = `${weekday}-${hour}`;
      
      if (!buckets[key]) {
        buckets[key] = { weekday, hour, sum: 0, count: 0 };
      }
      buckets[key].sum += r[metric];
      buckets[key].count += 1;
    }

    // Calculate averages and sort
    const avgBuckets = Object.values(buckets)
      .map(b => ({
        weekday: b.weekday,
        hour: b.hour,
        score: b.sum / b.count,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    // Create 2-hour windows and deduplicate
    const seen = new Set();
    const recommendations = [];
    
    for (const bucket of avgBuckets) {
      const key = `${bucket.weekday}-${bucket.hour}`;
      if (seen.has(key)) continue;
      seen.add(key);
      
      recommendations.push({
        weekday: bucket.weekday,
        hourStart: bucket.hour,
        hourEnd: (bucket.hour + 2) % 24,
        score: bucket.score,
        metric,
      });
      
      if (recommendations.length >= 3) break;
    }

    results[platform] = {
      recommendations,
      note: `Based on mean ${metric} by weekday/hour`,
    };
  }

  return results;
}

// ---- Platform Focus ----

function computePlatformFocus(records) {
  const results = [];
  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const sixtyDays = 60 * 24 * 60 * 60 * 1000;

  // Group by platform
  const byPlatform = {};
  for (const r of records) {
    if (!byPlatform[r.platform]) byPlatform[r.platform] = [];
    byPlatform[r.platform].push(r);
  }

  for (const [platform, platformRecords] of Object.entries(byPlatform)) {
    if (platformRecords.length === 0) continue;

    const hasValidDates = platformRecords.some(r => r.date !== null);
    let recentViews = 0;
    let prevViews = 0;

    if (hasValidDates) {
      // Use date-based filtering
      const recentCutoff = now - thirtyDays;
      const prevCutoff = now - sixtyDays;
      
      for (const r of platformRecords) {
        if (!r.date) continue;
        const timestamp = r.date.getTime();
        
        if (timestamp >= recentCutoff) {
          recentViews += r.views;
        } else if (timestamp >= prevCutoff && timestamp < recentCutoff) {
          prevViews += r.views;
        }
      }
    } else {
      // Fallback: split by array position
      const n = platformRecords.length;
      const recentThird = platformRecords.slice(Math.floor(n * 2 / 3));
      const prevThird = platformRecords.slice(0, Math.floor(n / 3));
      
      recentViews = recentThird.reduce((sum, r) => sum + r.views, 0);
      prevViews = prevThird.reduce((sum, r) => sum + r.views, 0);
    }

    // Calculate engagement rate
    const totalViews = platformRecords.reduce((sum, r) => sum + r.views, 0);
    const totalLikes = platformRecords.reduce((sum, r) => sum + r.likes, 0);
    const totalComments = platformRecords.reduce((sum, r) => sum + r.comments, 0);
    const er = (totalLikes + totalComments) / Math.max(totalViews, 1);

    // Calculate growth
    const growth = (recentViews - prevViews) / Math.max(prevViews, 1);

    // Calculate score (weighted combination)
    const score = 0.5 * er + 0.5 * (growth + 1);

    // Determine decision
    let decision = "maintain";
    if (score >= 1.0) {
      decision = "invest_more";
    } else if (score < 0.6) {
      decision = "deprioritize";
    }

    results.push({
      platform,
      engagementRate: er,
      growth,
      score,
      decision,
    });
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results;
}

// ---- Growth Risk Alerts ----

function computeGrowthAlerts(records) {
  const alerts = [];
  
  // Group by platform
  const byPlatform = {};
  for (const r of records) {
    if (!byPlatform[r.platform]) byPlatform[r.platform] = [];
    byPlatform[r.platform].push(r);
  }

  for (const [platform, platformRecords] of Object.entries(byPlatform)) {
    if (platformRecords.length < 3) continue;

    // Build time series of views
    const withDates = platformRecords.filter(r => r.date !== null);
    let viewsSeries = [];

    if (withDates.length >= 3) {
      // Group by month
      const monthlyViews = {};
      for (const r of withDates) {
        const monthKey = `${r.date.getFullYear()}-${String(r.date.getMonth() + 1).padStart(2, '0')}`;
        monthlyViews[monthKey] = (monthlyViews[monthKey] || 0) + r.views;
      }
      
      viewsSeries = Object.entries(monthlyViews)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([_, views]) => views);
    } else {
      // Fallback: use all records
      viewsSeries = platformRecords.map(r => r.views);
    }

    if (viewsSeries.length < 3) continue;

    // Calculate linear trend (slope)
    const n = viewsSeries.length;
    const xValues = Array.from({ length: n }, (_, i) => i);
    const yValues = viewsSeries;
    
    const xMean = xValues.reduce((a, b) => a + b, 0) / n;
    const yMean = yValues.reduce((a, b) => a + b, 0) / n;
    
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < n; i++) {
      numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
      denominator += Math.pow(xValues[i] - xMean, 2);
    }
    
    const slope = denominator !== 0 ? numerator / denominator : 0;

    // Calculate volatility (standard deviation of differences)
    const diffs = [];
    for (let i = 1; i < viewsSeries.length; i++) {
      diffs.push(viewsSeries[i] - viewsSeries[i - 1]);
    }
    
    const diffMean = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    const variance = diffs.reduce((sum, d) => sum + Math.pow(d - diffMean, 2), 0) / diffs.length;
    const volatility = Math.sqrt(variance);

    const mean = yMean;
    const maxViews = Math.max(...viewsSeries);
    const lastViews = viewsSeries[viewsSeries.length - 1];

    // Alert heuristics
    if (slope < -0.05 * mean) {
      alerts.push({
        platform,
        type: "declining_trend",
        severity: slope < -0.15 * mean ? "high" : "medium",
        details: { slope, mean },
      });
    } else if (volatility > 0.6 * mean) {
      alerts.push({
        platform,
        type: "high_volatility",
        severity: "medium",
        details: { volatility, mean },
      });
    } else if (lastViews <= 1.05 * maxViews && slope < 0.01 * mean) {
      alerts.push({
        platform,
        type: "stagnation",
        severity: "low",
        details: { slope, mean },
      });
    }
  }

  return alerts;
}

// ---- Content Theme Clusters ----

function computeContentThemes(records, k = 3) {
  const themes = [];
  
  // Group by platform
  const byPlatform = {};
  for (const r of records) {
    if (!byPlatform[r.platform]) byPlatform[r.platform] = [];
    byPlatform[r.platform].push(r);
  }

  for (const [platform, platformRecords] of Object.entries(byPlatform)) {
    if (platformRecords.length === 0) continue;

    // Sort by engagement rate
    const sorted = [...platformRecords].sort((a, b) => a.er - b.er);
    
    // Create tertile buckets (low, medium, high engagement)
    const tertileSize = Math.ceil(sorted.length / 3);
    const buckets = [
      sorted.slice(0, tertileSize),
      sorted.slice(tertileSize, tertileSize * 2),
      sorted.slice(tertileSize * 2),
    ];

    for (let clusterId = 0; clusterId < buckets.length; clusterId++) {
      const bucket = buckets[clusterId];
      if (bucket.length === 0) continue;

      const avgEr = bucket.reduce((sum, r) => sum + r.er, 0) / bucket.length;
      const avgViews = bucket.reduce((sum, r) => sum + r.views, 0) / bucket.length;
      const examples = bucket
        .filter(r => r.title)
        .slice(0, 3)
        .map(r => r.title);

      themes.push({
        platform,
        clusterId,
        count: bucket.length,
        avgEr,
        avgViews,
        examples,
      });
    }
  }

  // Sort by avgEr then avgViews
  themes.sort((a, b) => {
    if (Math.abs(b.avgEr - a.avgEr) > 0.001) return b.avgEr - a.avgEr;
    return b.avgViews - a.avgViews;
  });

  return themes.slice(0, 9);
}

// ---- Main Export ----

export function analyzeData(platformsData) {
  // Normalize all records
  const allRecords = [];
  for (const [platform, records] of Object.entries(platformsData || {})) {
    for (const record of records || []) {
      allRecords.push(normalizeRecord(record, platform));
    }
  }

  if (allRecords.length === 0) {
    return {
      generatedAt: new Date().toISOString(),
      postingSchedule: {},
      platformFocus: [],
      alerts: [],
      contentThemes: [],
      meta: {
        engine: "node.js",
        notes: [
          "Pure JavaScript analytics (cPanel compatible)",
          "No Python dependencies required",
          "Posting schedule prefers engagement rate, falls back to views",
        ],
      },
    };
  }

  const postingSchedule = computePostingSchedule(allRecords);
  const platformFocus = computePlatformFocus(allRecords);
  const alerts = computeGrowthAlerts(allRecords);
  const contentThemes = computeContentThemes(allRecords);

  return {
    generatedAt: new Date().toISOString(),
    postingSchedule,
    platformFocus,
    alerts,
    contentThemes,
    meta: {
      engine: "node.js",
      notes: [
        "Pure JavaScript analytics (cPanel compatible)",
        "No Python dependencies required",
        "Posting schedule prefers engagement rate, falls back to views",
      ],
    },
  };
}
