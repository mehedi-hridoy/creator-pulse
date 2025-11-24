import { motion } from "framer-motion";
import Galaxy from "../ui/Galaxy";

export default function Showcase() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-black py-32 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Galaxy />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <h2 className="font-heading text-4xl font-bold md:text-6xl">
            One timeline. <span className="bg-gradient-to-r from-brand-primary via-brand-purple to-brand-accent bg-clip-text text-transparent">All your platforms.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">Upload your raw analytics JSON once. CreatorPulse normalizes it, stores it and lets you explore trends across every platform in a single dashboard.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-16">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 shadow-2xl backdrop-blur-xl transition-all hover:border-brand-primary/30">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-purple to-brand-accent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="ml-4 font-mono text-xs text-gray-500">creator-pulse-upload</span>
              </div>
              <div className="rounded-xl border border-white/5 bg-black/60 px-8 py-6 font-mono">
                <div className="space-y-2 text-sm md:text-base">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex items-center gap-3">
                    <span className="text-brand-accent">›</span>
                    <span className="text-gray-300">youtube_analytics.json</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex items-center gap-3">
                    <span className="text-brand-accent">›</span>
                    <span className="text-gray-300">instagram_insights.json</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex items-center gap-3">
                    <span className="text-brand-accent">›</span>
                    <span className="text-gray-300">facebook_export.json</span>
                  </motion.div>
                  <div className="my-4 border-t border-white/5" />
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="flex items-center gap-3">
                    <span className="text-green-400">✔</span>
                    <span className="text-gray-300">Normalized <span className="font-semibold text-white">4,032 posts</span></span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 }} className="flex items-center gap-3">
                    <span className="text-green-400">✔</span>
                    <span className="text-gray-300">Linked cross-platform by topic & date</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.0 }} className="flex items-center gap-3">
                    <span className="text-green-400">✔</span>
                    <span className="text-gray-300">Generated insights in <span className="font-semibold text-brand-primary">2.3 seconds</span></span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
