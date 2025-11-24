import { motion } from "framer-motion";
import { useState } from "react";
import ScrollFloat from "../ui/ScrollFloat";

export default function FeatureGrid() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: "realtime",
      title: "Real-time audience growth",
      desc: "Track your follower growth and engagement metrics across all platforms with live updates. Make data-driven decisions instantly.",
      visual: (
        <div className="h-full w-full p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-white/60">Total Followers</span>
            <span className="text-white/40">Last 30 days →</span>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-white">847.2K</span>
            <span className="flex items-center gap-1 text-sm text-emerald-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +18%
            </span>
          </div>
          {/* Mini Chart */}
          <div className="relative mt-6 h-32">
            <svg className="h-full w-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 L50,65 L100,70 L150,45 L200,50 L250,30 L300,35"
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="2"
              />
              <path
                d="M0,80 L50,65 L100,70 L150,45 L200,50 L250,30 L300,35 L300,100 L0,100 Z"
                fill="url(#revenueGradient)"
              />
              {/* Data point */}
              <circle cx="250" cy="30" r="4" fill="rgb(16 185 129)">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            {/* Tooltip */}
            <div className="absolute left-[75%] top-[15%] rounded-lg border border-white/10 bg-black/90 px-3 py-2 text-xs backdrop-blur-xl">
              <div className="font-semibold text-white">+12.4K</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      title: "Cross-platform analytics",
      desc: "Monitor your performance across YouTube, Instagram, TikTok, and Facebook in one unified dashboard.",
      visual: (
        <div className="h-full w-full p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-white/60">Total Engagement</span>
            <div className="flex items-center gap-2">
              <span className="text-white/40">This Month</span>
              <svg className="h-4 w-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="mb-6 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-white">2.8M</span>
            <span className="flex items-center gap-1 text-sm text-emerald-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +23%
            </span>
          </div>
          {/* Category breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                  <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/90">YouTube</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">1.2M</span>
                <span className="text-xs text-emerald-400">+15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                  <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <span className="text-sm text-white/90">TikTok</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">945K</span>
                <span className="text-xs text-emerald-400">+31%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "AI-powered predictions",
      desc: "Get smart forecasts about your content performance, optimal posting times, and revenue opportunities powered by machine learning.",
      visual: (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="relative">
            {/* Hexagon layers */}
            <div className="relative h-48 w-48">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-white/5"
                  initial={{ scale: 0.7 + i * 0.05, opacity: 0.1 }}
                  animate={{ 
                    scale: [0.7 + i * 0.05, 0.75 + i * 0.05, 0.7 + i * 0.05],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
              {/* AI Brain icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl">
                  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
              </div>
              {/* Floating percentage numbers */}
              <div className="absolute -left-8 top-12 text-xs font-mono text-white/20">92%</div>
              <div className="absolute -right-8 top-20 text-xs font-mono text-white/20">+18</div>
              <div className="absolute bottom-8 left-12 text-xs font-mono text-white/20">2.3x</div>
              <div className="absolute bottom-12 right-8 text-xs font-mono text-white/20">87%</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "integration",
      title: "One-click platform sync",
      desc: "Import your analytics from YouTube, Instagram, TikTok, and Facebook with a single click. Automatic syncing keeps your data always up-to-date.",
      visual: (
        <div className="flex h-full w-full items-center justify-center p-6">
          <div className="relative h-48 w-full">
            {/* Left side icons */}
            <motion.div 
              className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col gap-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
            </motion.div>

            {/* Center integration hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 backdrop-blur-xl">
                <svg className="h-8 w-8 text-brand-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60">Integration</span>
            </div>

            {/* Right side icons */}
            <motion.div 
              className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col gap-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 backdrop-blur-xl">
                <svg className="h-5 w-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                </svg>
              </div>
            </motion.div>

            {/* Connection lines */}
            <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
              <motion.line
                x1="20%"
                y1="30%"
                x2="45%"
                y2="50%"
                stroke="rgba(99, 102, 241, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="20%"
                y1="50%"
                x2="45%"
                y2="50%"
                stroke="rgba(6, 182, 212, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="20%"
                y1="70%"
                x2="45%"
                y2="50%"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.6, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden bg-black py-32 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-bg/50 to-black" />
      
      <div className="relative z-10 mx-auto max-w-[90rem] px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }} 
          className="mb-20 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 backdrop-blur-xl">
            <span className="text-xl">#</span>
            <span>Features</span>
            <span className="text-xl">#</span>
          </div>
          <h2 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Real-Time Insights. Zero Platform Chaos.
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature, idx) => (
            <ScrollFloat key={feature.id} offset={30}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onHoverStart={() => setActiveFeature(idx)}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15]"
              >
                {/* Gradient glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-brand-accent/20 via-brand-primary/20 to-brand-purple/20 blur-2xl" />
                </div>

                <div className="relative flex h-full flex-col">
                  {/* Header */}
                  <div className="border-b border-white/[0.08] p-8 pb-6">
                    <h3 className="mb-2 font-display text-2xl font-semibold text-white lg:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/60">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Visual Demo */}
                  <div className="flex-1 p-2">
                    <div className="h-full overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent">
                      {feature.visual}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}
