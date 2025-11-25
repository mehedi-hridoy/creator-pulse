import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  LineChart,
  Line,
} from "recharts";
import {
  Eye,
  Heart,
  ChatCircleDots,
  Pulse,
  Sparkle
} from "@phosphor-icons/react";
import Layout from "../layout/Layout";
// Replacing boxed UserProfile with minimal inline pill
import { useAuthStore } from "../stores/authStore";
import { Card, MetricCard, PlatformCard } from "../components/ui/Card";
import { PlatformLogo } from "../components/ui/PlatformLogos";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// \ud83c\udfa8 OFFICIAL PLATFORM COLORS (exact brand specifications)
const PLATFORM_COLORS = {
  youtube: '#FF0000',
  instagram: '#E1306C',
  tiktok: '#69C9D0',      // Cyan for consistency
  facebook: '#1877F2',
};

// \ud83c\udf08 Premium gradient for area chart
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div className="glass-card rounded-[14px] p-3.5 min-w-[150px] shadow-glass-lg">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-3 mb-1 last:mb-0">
          <div className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[13px] text-foreground font-medium">{entry.name}:</span>
          </div>
          <span className="text-[13px] font-bold text-foreground">
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
  const { user } = useAuthStore();
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
            <div className="w-20 h-20 border-4 border-muted border-t-[#675AFF] dark:border-t-[#675AFF] rounded-full animate-spin" />
            <Sparkle size={28} weight="duotone" className="absolute inset-0 m-auto text-[#675AFF] animate-pulse" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-10 text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-5 rounded-[18px] bg-gradient-to-br from-[#675AFF] to-[#8B5CF6] flex items-center justify-center shadow-glow-primary">
              <Sparkle size={46} weight="duotone" className="text-white" />
            </div>
            <h3 className="text-[24px] font-bold text-foreground mb-2">No Data Yet</h3>
            <p className="text-[14px] text-muted-foreground">
              Upload your platform analytics to see your performance insights
            </p>
          </Card>
        </div>
      </Layout>
    );
  }

  // Format monthly trend for area chart
  const monthlyData = Object.entries(data.monthlyTrend || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, views]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      Views: views,
    }));

  // Format platform data for pie chart
  const platformDonutData = (data.perPlatform || []).map((p) => ({
    name: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
    value: p.views,
    color: PLATFORM_COLORS[p.platform.toLowerCase()] || '#8B5CF6',
  }));

  // Format platform data for bar chart
  const platformBars = (data.perPlatform || []).map((p) => ({
    platform: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
    Views: p.views,
    Likes: p.likes,
    Comments: p.comments,
  }));

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* \ud83d\udcc8 HEADER SECTION - Clean & Bold */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="animate-slide-up">
            <h1 className="text-[36px] lg:text-[42px] font-bold text-foreground mb-2 tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-[15px] text-muted-foreground">
              Track your content performance across all platforms
            </p>
          </div>
          {user && (
            <div className="animate-fade-in">
              <div className="profile-pill">
                <div className="avatar-gradient">
                  <span>{(user.username || 'User').split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-none text-foreground">
                    {user.username}
                  </span>
                  {/* subtle status/glow dot removed for ultra minimal; can add back if desired */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* \ud83d\udcca KEY METRICS ROW - Premium stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <MetricCard
            title="Total Views"
            value={formatNumber(data.totalViews)}
            icon={<Eye size={22} weight="duotone" />}
            trendValue={data.growth?.viewsGrowth}
            gradient={true}
          />
          <MetricCard
            title="Total Likes"
            value={formatNumber(data.totalLikes)}
            icon={<Heart size={22} weight="duotone" />}
            trendValue={data.growth?.likesGrowth}
          />
          <MetricCard
            title="Total Comments"
            value={formatNumber(data.totalComments)}
            icon={<ChatCircleDots size={22} weight="duotone" />}
            trendValue={data.growth?.commentsGrowth}
          />
          <MetricCard
            title="Engagement Rate"
            value={`${data.engagementRate?.toFixed(2) || 0}%`}
            icon={<Pulse size={22} weight="duotone" />}
            trendValue={data.growth?.engagementGrowth}
          />
        </div>

        {/* 📉 PERFORMANCE MULTI-CHART - Toggle between 3 views */}
        <PerformanceCharts
          monthlyData={monthlyData}
          platformBars={platformBars}
          perPlatformRaw={data.perPlatform || []}
          totalViews={data.totalViews || 0}
        />

        {/* \ud83c\udf88 CHARTS ROW - Platform distribution & engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Platform Distribution Pie Chart */}
          <Card className="p-7" hover={false}>
            <div className="mb-7">
              <h3 className="text-[22px] font-bold text-foreground mb-1">Platform Distribution</h3>
              <p className="text-[13px] text-muted-foreground">Views breakdown by platform</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <defs>
                  {/* Instagram multi gradient */}
                  <linearGradient id="instagramGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F77737" />
                    <stop offset="40%" stopColor="#E1306C" />
                    <stop offset="100%" stopColor="#C13584" />
                  </linearGradient>
                  {/* TikTok dual accent */}
                  <linearGradient id="tiktokGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00F2EA" />
                    <stop offset="100%" stopColor="#FF0050" />
                  </linearGradient>
                  {/* YouTube depth */}
                  <linearGradient id="youtubeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4D4D" />
                    <stop offset="100%" stopColor="#FF0000" />
                  </linearGradient>
                  {/* Facebook refined */}
                  <linearGradient id="facebookGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1877F2" />
                  </linearGradient>
                </defs>
                <Pie
                  data={platformDonutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={78}
                  outerRadius={118}
                  cornerRadius={6}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="#1A1D24"
                  strokeWidth={1}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {platformDonutData.map((entry, index) => {
                    const key = entry.name.toLowerCase();
                    const gradMap = {
                      instagram: 'instagramGrad',
                      tiktok: 'tiktokGrad',
                      youtube: 'youtubeGrad',
                      facebook: 'facebookGrad'
                    };
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${gradMap[key] || 'facebookGrad'})`}
                      />
                    );
                  })}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  wrapperStyle={{ fontSize: '13px', fontWeight: '600' }}
                  formatter={(value) => <span className="text-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Engagement Metrics Bar Chart */}
          <Card className="p-7" hover={false}>
            <div className="mb-7">
              <h3 className="text-[22px] font-bold text-foreground mb-1">Engagement Metrics</h3>
              <p className="text-[13px] text-muted-foreground">Performance by platform</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformBars}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="currentColor"
                  className="text-border opacity-50"
                  vertical={false}
                />
                <XAxis 
                  dataKey="platform" 
                  stroke="currentColor"
                  className="text-muted-foreground"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="currentColor"
                  className="text-muted-foreground"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                  tickFormatter={formatNumber}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
                <Legend 
                  wrapperStyle={{ fontSize: '13px', fontWeight: '600' }}
                  formatter={(value) => <span className="text-foreground">{value}</span>}
                />
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#675AFF" />
                  </linearGradient>
                  <linearGradient id="likesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="commentsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1ED48F" />
                    <stop offset="100%" stopColor="#16C47F" />
                  </linearGradient>
                </defs>
                <Bar dataKey="Views" fill="url(#viewsGrad)" radius={[9, 9, 0, 0]} />
                <Bar dataKey="Likes" fill="url(#likesGrad)" radius={[9, 9, 0, 0]} />
                <Bar dataKey="Comments" fill="url(#commentsGrad)" radius={[9, 9, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* \ud83c\udfc6 TOP PERFORMING CONTENT TABLE - Premium with platform indicators */}
        <Card className="p-7 animate-slide-up" style={{ animationDelay: '0.4s' }} hover={false}>
          <div className="mb-7">
            <h3 className="text-[22px] font-bold text-foreground mb-1">Top Performing Content</h3>
            <p className="text-[13px] text-muted-foreground">Your best posts ranked by views</p>
          </div>
          
          {/* Desktop Table - Premium hover effects */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Platform</th>
                  <th className="text-right py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Views</th>
                  <th className="text-right py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Likes</th>
                  <th className="text-right py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Comments</th>
                  <th className="text-right py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Shares</th>
                  <th className="text-left py-4 px-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody>
                {(data.topPosts || []).map((post, idx) => {
                  const platformKey = post.platform.toLowerCase();
                  const platformColor = PLATFORM_COLORS[platformKey] || '#6366F1';
                  
                  return (
                    <tr 
                      key={idx} 
                      className="border-b border-border/40 table-row-hover group relative"
                      style={{
                        borderLeft: `3px solid transparent`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderLeftColor = platformColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                      }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <PlatformLogo platform={post.platform} className="w-6 h-6" />
                          <span className="text-[14px] font-semibold text-foreground capitalize">
                            {post.platform}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-[14px] font-bold text-foreground">
                        {formatNumber(post.views)}
                      </td>
                      <td className="py-4 px-4 text-right text-[14px] text-muted-foreground font-medium">
                        {formatNumber(post.likes)}
                      </td>
                      <td className="py-4 px-4 text-right text-[14px] text-muted-foreground font-medium">
                        {formatNumber(post.comments)}
                      </td>
                      <td className="py-4 px-4 text-right text-[14px] text-muted-foreground font-medium">
                        {formatNumber(post.shares)}
                      </td>
                      <td className="py-4 px-4 text-[13px] text-muted-foreground">
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

          {/* Mobile Cards - Platform accent bars */}
          <div className="md:hidden space-y-3">
            {(data.topPosts || []).map((post, idx) => {
              const platformKey = post.platform.toLowerCase();
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-[16px] glass-card accent-bar-${platformKey}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <PlatformLogo platform={post.platform} className="w-6 h-6" />
                      <span className="text-[14px] font-semibold text-foreground capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {post.postedAt ? new Date(post.postedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      }) : "N/A"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Views</p>
                      <p className="text-[15px] font-bold text-foreground">{formatNumber(post.views)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Likes</p>
                      <p className="text-[15px] text-muted-foreground font-semibold">{formatNumber(post.likes)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Comments</p>
                      <p className="text-[15px] text-muted-foreground font-semibold">{formatNumber(post.comments)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mb-1">Shares</p>
                      <p className="text-[15px] text-muted-foreground font-semibold">{formatNumber(post.shares)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* \ud83d\udcf1 PLATFORM CARDS - With accent bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          {(data.perPlatform || []).map((plat) => (
            <PlatformCard
              key={plat.platform}
              platform={plat.platform}
              views={formatNumber(plat.views)}
              engagement={plat.engagementRate?.toFixed(2) || '0.00'}
              posts={plat.posts}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

// Inline component for performance charts with toggle (UI only)
function PerformanceCharts({ monthlyData, platformBars, perPlatformRaw, totalViews }) {
  const [mode, setMode] = useState('trend'); // 'trend' | 'views' | 'comments'
  const [hovered, setHovered] = useState(null);

  const modes = [
    { key: 'trend', label: 'Trend' },
    { key: 'views', label: 'Views' },
    { key: 'comments', label: 'Comments' },
  ];

  return (
    <Card className="p-7 animate-slide-up" style={{ animationDelay: '0.2s' }} hover={false}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[22px] font-bold text-foreground mb-1">Performance</h3>
          <p className="text-[13px] text-muted-foreground">{mode === 'trend' ? 'Monthly views across all platforms' : mode === 'views' ? 'Views by platform' : 'Comments by platform'}</p>
        </div>
        <div className="mini-toggle">
          {modes.map(m => (
            <button
              key={m.key}
              type="button"
              className={m.key === mode ? 'active' : ''}
              onClick={() => setMode(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[340px]">
        {mode === 'trend' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={buildMultiLineMonthly(monthlyData, perPlatformRaw, totalViews)}>
              <defs>
                {/* Professional differentiated palette (cool progression) */}
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#675AFF" stopOpacity={0.46} />
                  <stop offset="65%" stopColor="#675AFF" stopOpacity={0.10} />
                  <stop offset="100%" stopColor="#675AFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillSeriesA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3D8BFF" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="#3D8BFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillSeriesB" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E6BFF" stopOpacity={0.30} />
                  <stop offset="100%" stopColor="#5E6BFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillSeriesC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8366FF" stopOpacity={0.30} />
                  <stop offset="100%" stopColor="#8366FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillSeriesD" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B05CF6" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#B05CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border opacity-50" vertical={false} />
              <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickFormatter={formatNumber} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#675AFF', strokeWidth: 1, strokeDasharray: '5 5' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              {/* Order: smaller platform fills first, total on top with blend */}
              <Area type="monotone" dataKey="youtube" name="YouTube" stroke={hovered==='youtube'? '#3D8BFF':'#3D8BFF'} strokeWidth={hovered==='youtube'?2:1.4} fill="url(#fillSeriesA)" activeDot={{ r:4 }} opacity={hovered && hovered!=='youtube'?0.34:1} onMouseOver={() => setHovered('youtube')} onMouseOut={() => setHovered(null)} />
              <Area type="monotone" dataKey="instagram" name="Instagram" stroke={hovered==='instagram'? '#5E6BFF':'#5E6BFF'} strokeWidth={hovered==='instagram'?2:1.4} fill="url(#fillSeriesB)" activeDot={{ r:4 }} opacity={hovered && hovered!=='instagram'?0.34:1} onMouseOver={() => setHovered('instagram')} onMouseOut={() => setHovered(null)} />
              <Area type="monotone" dataKey="tiktok" name="TikTok" stroke={hovered==='tiktok'? '#8366FF':'#8366FF'} strokeWidth={hovered==='tiktok'?2:1.4} fill="url(#fillSeriesC)" activeDot={{ r:4 }} opacity={hovered && hovered!=='tiktok'?0.34:1} onMouseOver={() => setHovered('tiktok')} onMouseOut={() => setHovered(null)} />
              <Area type="monotone" dataKey="facebook" name="Facebook" stroke={hovered==='facebook'? '#B05CF6':'#B05CF6'} strokeWidth={hovered==='facebook'?2:1.4} fill="url(#fillSeriesD)" activeDot={{ r:4 }} opacity={hovered && hovered!=='facebook'?0.34:1} onMouseOver={() => setHovered('facebook')} onMouseOut={() => setHovered(null)} />
              <Area type="monotone" dataKey="total" name="Total" stroke="#675AFF" strokeWidth={hovered==='total'?3:2.4} fill="url(#fillTotal)" activeDot={{ r:5, stroke:'#8B5CF6', strokeWidth:2, fill:'#675AFF' }} opacity={hovered && hovered!=='total'?0.50:1} onMouseOver={() => setHovered('total')} onMouseOut={() => setHovered(null)} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {mode === 'views' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformBars}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border opacity-50" vertical={false} />
              <XAxis dataKey="platform" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickFormatter={formatNumber} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
              <defs>
                <linearGradient id="viewsOnly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#675AFF" />
                </linearGradient>
              </defs>
              <Bar dataKey="Views" fill="url(#viewsOnly)" radius={[9,9,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
        {mode === 'comments' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformBars}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border opacity-50" vertical={false} />
              <XAxis dataKey="platform" stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="currentColor" className="text-muted-foreground" style={{ fontSize: '12px', fontWeight: '500' }} tickFormatter={formatNumber} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
              <defs>
                <linearGradient id="commentsGradSingle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1ED48F" />
                  <stop offset="100%" stopColor="#16C47F" />
                </linearGradient>
              </defs>
              <Bar dataKey="Comments" fill="url(#commentsGradSingle)" radius={[9,9,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}

// Build multi-line monthly data using proportional distribution (UI approximation only)
function buildMultiLineMonthly(monthlyData, perPlatformRaw, totalViews) {
  if (!monthlyData || monthlyData.length === 0) return [];
  const shares = {};
  const sumPlatformViews = perPlatformRaw.reduce((sum, p) => sum + (p.views || 0), 0) || totalViews || 0;
  perPlatformRaw.forEach(p => {
    const key = p.platform.toLowerCase();
    shares[key] = sumPlatformViews > 0 ? (p.views || 0) / sumPlatformViews : 0;
  });
  // ensure keys exist even if platform missing
  ['youtube','instagram','tiktok','facebook'].forEach(k => { if (shares[k] === undefined) shares[k] = 0; });
  return monthlyData.map(m => {
    const total = m.Views || 0;
    return {
      month: m.month,
      total,
      youtube: Math.round(total * shares.youtube),
      instagram: Math.round(total * shares.instagram),
      tiktok: Math.round(total * shares.tiktok),
      facebook: Math.round(total * shares.facebook),
    };
  });
}
