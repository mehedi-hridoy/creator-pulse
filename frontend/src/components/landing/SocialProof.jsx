import { motion } from 'framer-motion';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "CreatorPulse showed me exactly which 3% of my audience would buy merch. Made $47K in the first month.",
      author: "Sarah Chen",
      role: "YouTube Creator",
      subscribers: "2.3M subscribers",
      avatar: "from-brand-accent to-brand-primary",
    },
    {
      quote: "I was guessing before. Now I know which content my paying fans actually want. Revenue up 340%.",
      author: "Marcus Johnson",
      role: "TikTok Creator",
      subscribers: "890K followers",
      avatar: "from-brand-purple to-brand-pink",
    },
    {
      quote: "Saved 15 hours a week. The AI tells me what to post next based on who's likely to convert.",
      author: "Priya Patel",
      role: "Instagram Creator",
      subscribers: "1.5M followers",
      avatar: "from-purple-500 to-pink-500",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Active Creators" },
    { value: "$12M+", label: "Revenue Generated" },
    { value: "340%", label: "Avg. Revenue Increase" },
    { value: "60s", label: "Average Setup Time" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
            >
              <div className="mb-2 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Creators who{" "}
            <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-purple bg-clip-text text-transparent">
              actually make money
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Real results from creators who stopped guessing and started using data
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
            >
              {/* Quote Icon */}
              <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-primary/20">
                <svg
                  className="h-5 w-5 text-brand-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="mb-6 text-[1.0625rem] leading-relaxed text-white/90">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${testimonial.avatar} p-[2px]`}>
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-dark">
                    <span className="font-semibold text-white">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonial.role} • {testimonial.subscribers}
                  </div>
                </div>
              </div>

              {/* Gradient Border Glow on Hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-brand-accent/20 via-brand-primary/20 to-brand-purple/20 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
