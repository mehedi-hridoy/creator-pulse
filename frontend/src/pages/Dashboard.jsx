import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  FileText,
  Share2,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react";
import Layout from "../layout/Layout";
import { useAuthStore } from "../stores/authStore";

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// Real SVG Platform Logos - With proper fills
const YouTubeLogo = ({ className, color = "#FF0000" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill={color} d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokLogo = ({ className, color = "#000000" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill={color} d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const InstagramLogo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24">
    <defs>
      <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80"/>
        <stop offset="25%" stopColor="#F77737"/>
        <stop offset="50%" stopColor="#E1306C"/>
        <stop offset="75%" stopColor="#C13584"/>
        <stop offset="100%" stopColor="#833AB4"/>
      </linearGradient>
    </defs>
    <path fill="url(#instagram-gradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const FacebookLogo = ({ className, color = "#1877F2" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill={color} d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Platform brand colors - official colors with real logos
const PLATFORM_CONFIG = {
  youtube: { 
    color: '#FF0000', 
    bgColor: '#FEE2E2',
    darkBgColor: '#450a0a',
    Logo: YouTubeLogo,
  },
  tiktok: { 
    color: '#000000',
    bgColor: '#F1F5F9',
    darkBgColor: '#1e293b',
    Logo: TikTokLogo,
  },
  facebook: { 
    color: '#1877F2',
    bgColor: '#DBEAFE',
    darkBgColor: '#1e3a5f',
    Logo: FacebookLogo,
  },
  instagram: { 
    color: '#E4405F',
    bgColor: '#FCE7F3',
    darkBgColor: '#4a1d34',
    Logo: InstagramLogo,
  },
};

const formatNumber = (num) => {
  if (!num) return '0';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

const formatPercent = (num) => {
  if (!num) return '0.00';
  return num.toFixed(2);
};

// Premium glassmorphic tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  
  return (
    <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 
                    border border-white/20 dark:border-slate-700/50 
                    rounded-2xl px-4 py-3 shadow-2xl shadow-black/10">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-slate-600 dark:text-slate-300">{entry.name}:</span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

// Stat Card with glassmorphism
const StatCard = ({ label, value, change, icon: Icon, color, delay = 0 }) => {
  const isPositive = change > 0;
  
  return (
    <div 
      className="group relative"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glassmorphic card */}
      <div className="relative overflow-hidden rounded-3xl 
                    bg-white/70 dark:bg-slate-800/50
                    backdrop-blur-xl
                    border border-white/50 dark:border-slate-700/50
                    shadow-xl shadow-slate-200/50 dark:shadow-black/20
                    p-6 transition-all duration-500
                    hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-black/30
                    hover:-translate-y-1 hover:border-white/80 dark:hover:border-slate-600/50">
        
        {/* Gradient orb background */}
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full 
                        bg-gradient-to-br ${color} opacity-20 blur-2xl 
                        group-hover:opacity-30 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            {change !== undefined && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                            ${isPositive 
                              ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' 
                              : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {value}
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Platform Card - Premium Design with Hover Glow Effects
const PlatformCard = ({ platform, views, engagement, posts }) => {
  const config = PLATFORM_CONFIG[platform.toLowerCase()] || PLATFORM_CONFIG.youtube;
  const Logo = config.Logo;
  
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer
                 bg-white dark:bg-slate-900
                 border border-slate-200 dark:border-slate-700/80
                 hover:-translate-y-2 hover:scale-[1.02]
                 hover:border-transparent"
      style={{
        '--glow-color': config.color,
      }}
    >
      {/* Hover glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
        style={{ background: `linear-gradient(135deg, ${config.color}40, ${config.color}20, transparent)` }}
      />
      
      {/* Animated glow ring on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ 
          boxShadow: `0 0 30px ${config.color}30, 0 0 60px ${config.color}15, inset 0 1px 1px ${config.color}10`,
        }}
      />
      
      {/* Top accent line with glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ 
          backgroundColor: config.color,
          boxShadow: `0 2px 10px ${config.color}50`
        }} 
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Header with colored logo container */}
        <div className="flex items-center gap-4 mb-6">
          {/* Light mode bg */}
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center dark:hidden transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: config.bgColor,
              boxShadow: `0 4px 12px ${config.color}20`
            }}
          >
            <Logo className="w-7 h-7" color={config.color} />
          </div>
          {/* Dark mode bg */}
          <div 
            className="w-14 h-14 rounded-xl items-center justify-center hidden dark:flex transition-transform duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: config.darkBgColor,
              boxShadow: `0 4px 12px ${config.color}30`
            }}
          >
            <Logo className="w-7 h-7" color={config.color} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white capitalize text-lg">
              {platform}
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Platform Performance
            </p>
          </div>
        </div>
        
        {/* Main stat - Views */}
        <div className="mb-5">
          <p className="text-5xl font-bold text-slate-900 dark:text-white tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
            {formatNumber(views)}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            total views
          </p>
        </div>
        
        {/* Secondary stats */}
        <div className="flex items-center gap-10 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="transition-transform duration-300 group-hover:translate-x-1">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Engagement
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {formatPercent(engagement)}%
            </p>
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-1" style={{ transitionDelay: '50ms' }}>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
              Posts
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">
              {posts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const { user } = useAuthStore();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/analytics/overview`);
      return res.data.overview;
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-700 
                          border-t-violet-500 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  // Empty state
  if (error || !data) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md p-8 rounded-3xl 
                        bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl
                        border border-white/50 dark:border-slate-700/50">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl 
                          bg-gradient-to-br from-violet-500 to-purple-600 
                          flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No Analytics Yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Upload your platform data to unlock powerful insights.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Prepare chart data
  const monthlyData = Object.entries(data.monthlyTrend || {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, views]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' }),
      views,
      likes: Math.floor(views * 0.05),
      comments: Math.floor(views * 0.008),
    }));

  // Platform comparison data for bar chart
  const platformData = (data.perPlatform || []).map(p => ({
    name: p.platform.charAt(0).toUpperCase() + p.platform.slice(1),
    views: p.views,
    likes: p.likes,
    comments: p.comments,
    fill: PLATFORM_CONFIG[p.platform.toLowerCase()]?.color || '#8B5CF6'
  }));

  // Time greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const userName = user?.username || data.username || 'Creator';

  return (
    <Layout>
      <div className="space-y-8 pb-8">
        
        {/* ═══════════════════════════════════════════════════════════════
            HEADER - Personalized Welcome
        ═══════════════════════════════════════════════════════════════ */}
        <header className="relative">
          {/* Background gradient orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
          <div className="absolute -top-10 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {greeting} 👋
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Welcome, <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 
                                        bg-clip-text text-transparent">{userName}</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                Your content reached <span className="font-semibold text-violet-600 dark:text-violet-400">
                {formatNumber(data.totalViews)}</span> people. 
                {data.growth?.viewsGrowth > 0 ? " Keep up the amazing work! 🚀" : " Let's grow together!"}
              </p>
            </div>
            
            {/* Quick date range indicator */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full 
                          bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl
                          border border-white/50 dark:border-slate-700/50">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Last 30 days
              </span>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            STATS GRID - Key Metrics
        ═══════════════════════════════════════════════════════════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Views"
            value={formatNumber(data.totalViews)}
            change={data.growth?.viewsGrowth}
            icon={Eye}
            color="from-violet-500 to-purple-600"
            delay={0}
          />
          <StatCard
            label="Total Likes"
            value={formatNumber(data.totalLikes)}
            icon={Heart}
            color="from-pink-500 to-rose-500"
            delay={50}
          />
          <StatCard
            label="Comments"
            value={formatNumber(data.totalComments)}
            icon={MessageCircle}
            color="from-amber-500 to-orange-500"
            delay={100}
          />
          <StatCard
            label="Engagement Rate"
            value={`${formatPercent(data.engagementRate)}%`}
            change={data.growth?.engagementGrowth}
            icon={TrendingUp}
            color="from-emerald-500 to-teal-500"
            delay={150}
          />
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            MAIN CHART - Growth Over Time
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl 
                          bg-white/70 dark:bg-slate-800/50
                          backdrop-blur-xl
                          border border-white/50 dark:border-slate-700/50
                          shadow-xl shadow-slate-200/50 dark:shadow-black/20
                          p-6 lg:p-8">
          
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] 
                        bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent 
                        rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Growth Analytics
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Views, likes & engagement over time
                  </p>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Comments</span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <defs>
                  <linearGradient id="viewsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-700"
                  vertical={false}
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickFormatter={formatNumber}
                  className="text-slate-500 dark:text-slate-400"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="url(#viewsArea)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="#EC4899" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#EC4899', stroke: '#fff', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 5, fill: '#F59E0B', stroke: '#fff', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PLATFORM OVERVIEW - Full Width Section
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl 
                        bg-white/70 dark:bg-slate-800/50
                        backdrop-blur-xl
                        border border-white/50 dark:border-slate-700/50
                        shadow-xl shadow-slate-200/50 dark:shadow-black/20
                        p-6 lg:p-8">
            
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
              <PieChartIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Platform Overview
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Performance by platform
              </p>
            </div>
          </div>
          
          {/* Responsive grid: 1 col mobile, 2 col large screens with max-width cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 max-w-5xl">
            {(data.perPlatform || []).map((platform) => (
              <PlatformCard
                key={platform.platform}
                platform={platform.platform}
                views={platform.views}
                engagement={platform.engagementRate}
                posts={platform.posts}
              />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            PLATFORM COMPARISON - Full Width Section
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl 
                        bg-white/70 dark:bg-slate-800/50
                        backdrop-blur-xl
                        border border-white/50 dark:border-slate-700/50
                        shadow-xl shadow-slate-200/50 dark:shadow-black/20
                        p-6 lg:p-8">
            
          <div className="absolute top-0 right-0 w-64 h-64 
                        bg-gradient-to-br from-pink-500/10 to-transparent 
                        rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/25">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Platform Comparison
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Views across platforms
              </p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={320}>
              <BarChart data={platformData} layout="vertical" barSize={24}>
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 11 }}
                  tickFormatter={formatNumber}
                  className="text-slate-500 dark:text-slate-400"
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 500 }}
                  className="text-slate-600 dark:text-slate-300"
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="views" 
                  radius={[0, 8, 8, 0]}
                  fill="#8B5CF6"
                >
                  {platformData.map((entry, index) => (
                    <defs key={index}>
                      <linearGradient id={`bar-${index}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={entry.fill} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={entry.fill} stopOpacity={1} />
                      </linearGradient>
                    </defs>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TOP CONTENT TABLE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl 
                          bg-white/70 dark:bg-slate-800/50
                          backdrop-blur-xl
                          border border-white/50 dark:border-slate-700/50
                          shadow-xl shadow-slate-200/50 dark:shadow-black/20
                          p-6 lg:p-8">
          
          <div className="absolute top-0 right-0 w-96 h-96 
                        bg-gradient-to-br from-emerald-500/10 to-transparent 
                        rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
              <Play className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Top Performing Content
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your best posts by engagement
              </p>
            </div>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto relative z-10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200/50 dark:border-slate-700/50">
                  <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="text-right py-4 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(data.topPosts || []).slice(0, 5).map((post, idx) => {
                  const config = PLATFORM_CONFIG[post.platform.toLowerCase()] || PLATFORM_CONFIG.youtube;
                  const Logo = config.Logo;
                  return (
                    <tr 
                      key={idx}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: config.bgColor }}
                          >
                            <Logo className="w-5 h-5" color={config.color} />
                          </div>
                          <span className="font-medium text-slate-900 dark:text-white capitalize">
                            {post.platform}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {formatNumber(post.views)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-400">
                        {formatNumber(post.likes)}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-400">
                        {formatNumber(post.comments)}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-400">
                        {formatNumber(post.shares)}
                      </td>
                      <td className="py-4 px-4 text-right text-slate-500 dark:text-slate-500 text-sm">
                        {post.postedAt 
                          ? new Date(post.postedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })
                          : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3 relative z-10">
            {(data.topPosts || []).slice(0, 5).map((post, idx) => {
              const config = PLATFORM_CONFIG[post.platform.toLowerCase()] || PLATFORM_CONFIG.youtube;
              const Logo = config.Logo;
              return (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/30 
                           border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: config.bgColor }}
                      >
                        <Logo className="w-5 h-5" color={config.color} />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white capitalize">
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {post.postedAt 
                        ? new Date(post.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : '—'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">{formatNumber(post.views)}</p>
                      <p className="text-xs text-slate-500">views</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{formatNumber(post.likes)}</p>
                      <p className="text-xs text-slate-500">likes</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{formatNumber(post.comments)}</p>
                      <p className="text-xs text-slate-500">comments</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{formatNumber(post.shares)}</p>
                      <p className="text-xs text-slate-500">shares</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
