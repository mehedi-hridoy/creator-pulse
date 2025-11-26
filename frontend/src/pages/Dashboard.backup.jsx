import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  TrendingUp, 
  FileText,
  Users,
  Activity
} from "lucide-react";
import Layout from "../layout/Layout";
import UserProfile from "../components/dashboard/UserProfile";
import { Card, MetricCard, PlatformCard } from "../components/ui/Card";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_BASE || "https://api.creatorpulse.mehedihridoy.online";

// Platform color mapping (exact spec colors)
const PLATFORM_COLORS = {
  youtube: '#ff4d4f',
  tiktok: '#3cbaff',
  facebook: '#7b61ff',
  instagram: '#E1306C',
};

// Premium tooltip styling
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="bg-[rgba(15,18,32,0.95)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] rounded-lg p-3 shadow-premium">
      <p className="text-label text-text-muted mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-body text-text-secondary">{entry.name}:</span>
          <span className="text-body text-text-primary font-medium">
            {typeof entry.value === 'number' ? formatNumber(entry.value) : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const formatNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num?.toLocaleString() || '0';
};

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/analytics/overview`);
      return res.data.overview;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[rgba(255,255,255,0.1)] border-t-premium-purple rounded-full animate-spin" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-premium-blue rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-8 text-center max-w-md" hover={false}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-premium-purple/20 to-premium-blue/20 flex items-center justify-center">
              <FileText className="h-8 w-8 text-premium-purple" />
            </div>
            <h3 className="text-section-title text-text-primary mb-2">No Analytics Data Yet</h3>
            <p className="text-body text-text-secondary">Upload your platform JSON files to see insights here.</p>
          </Card>
        </div>
      </Layout>
    );
  }

  // Format monthly trend for line chart
  const monthlyData = Object.entries(data.monthlyTrend || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, views]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      Views: views,
    }));

  // Format platform data for donut chart
  const platformDonutData = (data.perPlatform || []).map((p) => ({
    name: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
    value: p.views,
    color: PLATFORM_COLORS[p.platform.toLowerCase()] || '#7b61ff',
  }));

  // Format platform bars for engagement
  const platformBars = (data.perPlatform || []).map((p) => ({
    platform: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
    Views: p.views,
    Likes: p.likes,
    Comments: p.comments,
  }));

  // Generate simple sparkline data for metrics (last 7 days simulation)
  const generateSparkline = (baseValue) => {
    return Array.from({ length: 7 }, () => baseValue * (0.7 + Math.random() * 0.6));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* HEADER WITH USER PROFILE */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-page-title md:text-[32px] text-text-primary mb-2">
              Dashboard Overview
            </h1>
            <p className="text-body text-text-secondary">
              Track your content performance across all platforms
            </p>
          </div>
          <div className="lg:w-80 shrink-0">
            <UserProfile />
          </div>
        </div>

        {/* TOP STATS ROW - 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <MetricCard
            title="Total Views"
            value={formatNumber(data.totalViews)}
            icon={<Eye className="w-5 h-5" />}
            trendValue={data.growth?.viewsGrowth}
            sparklineData={generateSparkline(data.totalViews)}
          />
          <MetricCard
            title="Total Likes"
            value={formatNumber(data.totalLikes)}
            icon={<ThumbsUp className="w-5 h-5" />}
            sparklineData={generateSparkline(data.totalLikes)}
          />
          <MetricCard
            title="Total Comments"
            value={formatNumber(data.totalComments)}
            icon={<MessageCircle className="w-5 h-5" />}
            sparklineData={generateSparkline(data.totalComments)}
          />
          <MetricCard
            title="Engagement Rate"
            value={`${data.engagementRate?.toFixed(2) || 0}%`}
            icon={<Activity className="w-5 h-5" />}
            trendValue={data.growth?.engagementGrowth}
            sparklineData={generateSparkline(data.engagementRate || 0)}
          />
        </div>

        {/* MONTHLY VIEWS TREND - Large Horizontal Card */}
        <Card className="p-6 md:p-card" hover={false}>
          <div className="mb-6">
            <h3 className="text-section-title text-text-primary mb-1">Monthly Views Trend</h3>
            <p className="text-body text-text-secondary">Content performance over time</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3cbaff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#7b61ff" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.05)" 
                vertical={false}
              />
              <XAxis 
                dataKey="month" 
                stroke="rgba(255,255,255,0.4)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'rgba(255,255,255,0.6)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.4)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'rgba(255,255,255,0.6)' }}
                tickFormatter={formatNumber}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="Views"
                stroke="#3cbaff"
                strokeWidth={2}
                fill="url(#viewsGradient)"
                animationDuration={300}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* CHARTS ROW - Platform Distribution & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PLATFORM DISTRIBUTION - Donut Chart */}
          <Card className="p-6 md:p-card" hover={false}>
            <div className="mb-6">
              <h3 className="text-section-title text-text-primary mb-1">Platform Distribution</h3>
              <p className="text-body text-text-secondary">Views by platform</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={platformDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={300}
                >
                  {platformDonutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="middle" 
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* PLATFORM PERFORMANCE - Bar Chart */}
          <Card className="p-6 md:p-card" hover={false}>
            <div className="mb-6">
              <h3 className="text-section-title text-text-primary mb-1">Platform Performance</h3>
              <p className="text-body text-text-secondary">Engagement metrics by platform</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={platformBars}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(255,255,255,0.05)" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="platform" 
                  stroke="rgba(255,255,255,0.4)" 
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'rgba(255,255,255,0.6)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.4)" 
                  style={{ fontSize: '12px' }}
                  tick={{ fill: 'rgba(255,255,255,0.6)' }}
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}
                />
                <Bar dataKey="Views" fill="#3cbaff" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Likes" fill="#7b61ff" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Comments" fill="#E1306C" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* TOP PERFORMING CONTENT - Premium Table */}
        <Card className="p-6 md:p-card overflow-hidden" hover={false}>
          <div className="mb-6">
            <h3 className="text-section-title text-text-primary mb-1">Top Performing Content</h3>
            <p className="text-body text-text-secondary">Your best posts by views</p>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="text-left py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Platform</th>
                  <th className="text-right py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Views</th>
                  <th className="text-right py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Likes</th>
                  <th className="text-right py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Comments</th>
                  <th className="text-right py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Shares</th>
                  <th className="text-left py-3 px-4 text-label text-text-muted font-medium uppercase tracking-wide">Posted</th>
                </tr>
              </thead>
              <tbody>
                {(data.topPosts || []).map((post, idx) => {
                  const platformColor = PLATFORM_COLORS[post.platform.toLowerCase()] || '#7b61ff';
                  return (
                    <tr 
                      key={idx} 
                      className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-150"
                    >
                      <td className="py-3 px-4">
                        <span 
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-label font-medium"
                          style={{ 
                            backgroundColor: `${platformColor}22`,
                            color: platformColor 
                          }}
                        >
                          {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-body text-text-primary font-semibold">
                        {formatNumber(post.views)}
                      </td>
                      <td className="py-3 px-4 text-right text-body text-text-secondary">
                        {formatNumber(post.likes)}
                      </td>
                      <td className="py-3 px-4 text-right text-body text-text-secondary">
                        {formatNumber(post.comments)}
                      </td>
                      <td className="py-3 px-4 text-right text-body text-text-secondary">
                        {formatNumber(post.shares)}
                      </td>
                      <td className="py-3 px-4 text-body text-text-secondary">
                        {post.postedAt ? new Date(post.postedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        }) : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden space-y-3">
            {(data.topPosts || []).map((post, idx) => {
              const platformColor = PLATFORM_COLORS[post.platform.toLowerCase()] || '#7b61ff';
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-label font-medium"
                      style={{ 
                        backgroundColor: `${platformColor}22`,
                        color: platformColor 
                      }}
                    >
                      {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                    </span>
                    <span className="text-label text-text-muted">
                      {post.postedAt ? new Date(post.postedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-label text-text-muted">Views</p>
                      <p className="text-body text-text-primary font-semibold">{formatNumber(post.views)}</p>
                    </div>
                    <div>
                      <p className="text-label text-text-muted">Likes</p>
                      <p className="text-body text-text-secondary">{formatNumber(post.likes)}</p>
                    </div>
                    <div>
                      <p className="text-label text-text-muted">Comments</p>
                      <p className="text-body text-text-secondary">{formatNumber(post.comments)}</p>
                    </div>
                    <div>
                      <p className="text-label text-text-muted">Shares</p>
                      <p className="text-body text-text-secondary">{formatNumber(post.shares)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* PLATFORM DETAIL CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {(data.perPlatform || []).map((plat) => (
            <PlatformCard
              key={plat.platform}
              platform={plat.platform.charAt(0).toUpperCase() + plat.platform.slice(1)}
              views={formatNumber(plat.views)}
              engagement={plat.engagementRate?.toFixed(2) || '0.00'}
              posts={plat.posts}
              color={PLATFORM_COLORS[plat.platform.toLowerCase()] || '#7b61ff'}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
