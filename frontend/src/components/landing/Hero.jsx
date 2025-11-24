import { motion } from "framer-motion";
import DarkVeil from "../ui/DarkVeil";
import AnimatedText, { GradientText } from "../ui/AnimatedText";
import CursorGlow from "../ui/CursorGlow";
import RotatingText from "../ui/RotatingText";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <CursorGlow />
      
      {/* Dark Veil Background */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <DarkVeil />
      </div>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-32">
        <div className="mx-auto max-w-[90rem] text-center">
          {/* Social Proof Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-2.5 backdrop-blur-xl"
          >
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full border-2 border-dark bg-gradient-to-br from-brand-primary to-brand-purple" />
              <div className="h-6 w-6 rounded-full border-2 border-dark bg-gradient-to-br from-brand-accent to-brand-pink" />
              <div className="h-6 w-6 rounded-full border-2 border-dark bg-gradient-to-br from-purple-500 to-pink-500" />
            </div>
            <span className="text-[0.9375rem] font-medium tracking-[-0.01em] text-emerald-400">
              Trusted by 15,000+ creators
            </span>
          </motion.div>

          {/* Main Heading with Rotating Text */}
          <div className="space-y-2 lg:space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-[clamp(2.2rem,7vw,6rem)] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[clamp(3rem,8vw,6.5rem)] lg:text-[clamp(4rem,9vw,7rem)]"
            >
              <span className="block sm:inline">Turn your audience into{" "}</span>
              <span className="inline-block min-w-[280px] sm:min-w-[360px] lg:min-w-[480px]">
                <RotatingText
                  texts={['paying customers', 'brand sponsors', 'loyal members', 'revenue streams']}
                  className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent"
                />
              </span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="font-display text-[clamp(1.75rem,5.5vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white/80 sm:text-[clamp(2.5rem,6.5vw,4.5rem)] lg:text-[clamp(3rem,7.5vw,5rem)]"
            >
              with AI that predicts revenue
            </motion.h2>
          </div>

          {/* Subheading - Hyper Specific */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mx-auto mt-8 max-w-3xl text-[1.125rem] font-light leading-relaxed text-white/70 md:text-[1.25rem] md:leading-[1.75]"
          >
            Upload your analytics from YouTube, Instagram, TikTok & Facebook.{" "}
            <span className="font-medium text-white/90">
              Get AI predictions in 60 seconds
            </span>
            {" "}on which content drives sales, sponsorships & memberships.
          </motion.p>

          {/* CTA Buttons with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link to="/signup">
              <motion.button
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[14px] bg-white px-9 py-4 font-semibold text-[1.0625rem] tracking-[-0.01em] text-black shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.05),0_16px_32px_-8px_rgba(99,102,241,0.3)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_2px_4px_0_rgba(0,0,0,0.05),0_24px_48px_-8px_rgba(99,102,241,0.4)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Start Free Trial</span>
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
            <motion.a
              href="#demo"
              className="group inline-flex items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.03] px-9 py-4 font-semibold text-[1.0625rem] tracking-[-0.01em] text-white/90 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              <span>Watch 2-min Demo</span>
            </motion.a>
          </motion.div>

          {/* Trust Indicators - Refined */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[0.9375rem] text-white/50"
          >
            <div className="flex items-center gap-2.5">
              <svg
                className="h-[18px] w-[18px] text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg
                className="h-[18px] w-[18px] text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg
                className="h-[18px] w-[18px] text-emerald-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">60-second setup</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-16 flex flex-col items-center gap-3 text-white/40"
          >
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.15em]">Scroll to explore</span>
            <motion.svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
