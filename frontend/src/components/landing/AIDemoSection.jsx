import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ScrollFloat from '../ui/ScrollFloat';

export default function AIDemoSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const insights = [
    {
      category: "Content Performance Analytics",
      badge: "Analytics",
      description: "Track which content types drive the most engagement and revenue across all your platforms.",
      color: "from-blue-500 to-purple-500",
      visual: (
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
              <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">Short-form videos</span>
                <motion.div
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <p className="text-xs text-white/50">1.9× higher completion rate • Best for viral growth</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
              <svg className="h-4 w-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-white">Tutorial content</span>
              <p className="text-xs text-white/50">35% audience engagement • Drives loyal followers</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 opacity-50 backdrop-blur-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
              <svg className="h-4 w-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-white">Long-form content</span>
              <p className="text-xs text-white/50">Analyzing performance trends...</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      category: "Optimal Posting Schedule",
      badge: "AI Schedule",
      description: "AI predicts the best times to post based on your audience's activity patterns and engagement history.",
      color: "from-emerald-500 to-cyan-500",
      visual: (
        <div className="p-4">
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-white/50">Best Posting Times</span>
              <div className="flex items-center gap-1">
                <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/5">
                  <svg className="h-3 w-3 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/5">
                  <svg className="h-3 w-3 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Time slots */}
            <div className="space-y-2">
              {[
                { time: '7-10 PM', day: 'Mon-Thu', engagement: '94%', color: 'emerald' },
                { time: '12-2 PM', day: 'Tue, Sat', engagement: '87%', color: 'blue' },
                { time: '6-8 AM', day: 'Wed, Sun', engagement: '82%', color: 'purple' },
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${slot.color}-500/10`}>
                      <svg className={`h-5 w-5 text-${slot.color}-400`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{slot.time}</div>
                      <div className="text-xs text-white/50">{slot.day}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold text-${slot.color}-400`}>
                    {slot.engagement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      category: "Revenue Opportunities",
      badge: "Revenue",
      description: "AI identifies which content drives conversions and when to launch sponsored posts for maximum ROI.",
      color: "from-purple-500 to-pink-500",
      visual: (
        <div className="space-y-2 p-4">
          {[
            { id: 'YT-847', content: 'Tutorial: Setup...', metric: '2.3× conversion', status: 'Top Earner', amount: '$2,450', color: 'emerald' },
            { id: 'IG-523', content: 'Product Review', metric: 'High CTR', status: 'Trending', amount: '$890', color: 'blue' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-xl"
            >
              <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-${item.color}-500/10`}>
                <svg className={`h-4 w-4 text-${item.color}-400`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {item.status === 'Top Earner' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  )}
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50">{item.id}</span>
                  <span className="truncate text-xs font-medium text-white">{item.content}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                  <span>{item.metric}</span>
                  <span>•</span>
                  <span className={`font-medium text-${item.color}-400`}>{item.status}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-white">{item.amount}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      category: "Unified Analytics Dashboard",
      badge: "Dashboard",
      description: "Monitor all your platforms from one place. Track followers, engagement, and revenue across YouTube, Instagram, TikTok, and Facebook.",
      color: "from-orange-500 to-red-500",
      visual: (
        <div className="space-y-2 p-4">
          <div className="grid grid-cols-7 gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 text-[10px] font-medium uppercase tracking-wider text-white/40">
            <span>Platform</span>
            <span className="col-span-2">Content</span>
            <span className="col-span-2">Performance</span>
            <span>Trend</span>
            <span className="text-right">Revenue</span>
          </div>
          {[
            { id: 'YouTube', product: 'Tech Tutorial #47', reason: '1.2M views', status: 'Viral', statusColor: 'emerald', amount: '$3,240' },
            { id: 'Instagram', product: 'Behind Scenes', reason: '847K reach', status: 'Growing', statusColor: 'blue', amount: '$1,580' },
            { id: 'TikTok', product: 'Quick Tips', reason: '2.1M plays', status: 'Trending', statusColor: 'emerald', amount: '$2,190' },
          ].map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="grid grid-cols-7 gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2 text-xs backdrop-blur-xl transition-colors hover:bg-white/[0.04]"
            >
              <span className="font-semibold text-white/80">{row.id}</span>
              <span className="col-span-2 truncate text-white/80">{row.product}</span>
              <span className="col-span-2 text-white/60">{row.reason}</span>
              <div className="flex items-center gap-1">
                <div className={`h-1.5 w-1.5 rounded-full bg-${row.statusColor}-400`} />
                <span className={`text-${row.statusColor}-400`}>{row.status}</span>
              </div>
              <span className="text-right font-semibold text-white">{row.amount}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-gradient-to-b from-black via-brand-bg to-black py-20 text-white sm:py-32"
    >
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-brand-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-20"
        >
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            See what the AI{" "}
            <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-purple bg-clip-text text-transparent">
              actually tells you
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base text-white/70 sm:text-lg md:text-xl">
            Upload your analytics once and get live AI insights tailored to your audience, posting habits, and revenue goals.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {insights.map((insight, index) => (
            <ScrollFloat key={index} offset={35}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15]"
              >
                {/* Gradient glow on hover */}
                <div className={`pointer-events-none absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${insight.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
                
                <div className="relative flex h-full flex-col">
                  {/* Header */}
                  <div className="border-b border-white/[0.08] p-4 sm:p-6">
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-xl">
                      {insight.badge}
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold text-white sm:text-xl lg:text-2xl">
                      {insight.category}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {insight.description}
                    </p>
                  </div>

                  {/* Visual Demo */}
                  <div className="flex-1 p-2">
                    <div className="h-full overflow-hidden rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent">
                      {insight.visual}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </ScrollFloat>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center sm:mt-20"
        >
          <Link to="/signup">
            <motion.button
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-white px-6 py-3.5 font-semibold text-base tracking-[-0.01em] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05),0_16px_32px_-8px_rgba(99,102,241,0.3)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_0_rgba(0,0,0,0.05),0_24px_48px_-8px_rgba(99,102,241,0.4)] sm:w-auto sm:px-10 sm:py-5 sm:text-[1.0625rem]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start with your own data</span>
              <motion.svg
                className="relative z-10 h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-accent/10 to-brand-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          </Link>
          <p className="mt-4 text-sm text-white/50">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
