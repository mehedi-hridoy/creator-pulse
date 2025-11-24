import { motion } from "framer-motion";
import Galaxy from "../ui/Galaxy";

export default function FeatureGrid() {
  const features = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI-powered summaries",
      desc: "Skip the spreadsheets. Get instant, human-readable summaries of your audience and content performance.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Cross-platform analytics",
      desc: "Import data from YouTube, Instagram, Facebook and TikTok and see everything in one unified view.",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Actionable recommendations",
      desc: "Get concrete suggestions on when to post, what formats to use and which topics to double down on.",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden bg-black py-32 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Galaxy />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <h2 className="font-heading text-4xl font-bold md:text-6xl">
            Built for creators who want <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-purple bg-clip-text text-transparent">clarity, not chaos</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">CreatorPulse turns noisy analytics into a single source of truth for your content strategy.</p>
        </motion.div>
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: idx * 0.2 }} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent p-8 backdrop-blur-sm transition-all duration-300">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <motion.div whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }} className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-purple text-white shadow-lg shadow-brand-primary/30">{feature.icon}</motion.div>
                <h3 className="mt-6 font-heading text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-4 leading-relaxed text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
