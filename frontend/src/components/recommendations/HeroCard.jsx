import { motion } from "framer-motion";

export default function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-border text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            CreatorPulse
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Hi, I'm your AI analytics copilot.
          </h2>
          <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            Ask about posting windows, platform focus, risks, and content ideas. Upload timestamped posts to unlock schedule insights.
          </p>
        </div>

        <div className="flex-shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] opacity-20 blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
              <svg
                className="w-10 h-10 md:w-12 md:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
