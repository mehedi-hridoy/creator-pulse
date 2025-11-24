import { motion } from 'framer-motion';
import ScrollFloat from '../ui/ScrollFloat';

export default function SocialProof() {
  const testimonials = [
    {
      quote: "CreatorPulse showed me exactly which 3% of my audience would buy merch. Made $47K in the first month.",
      author: "Sarah Chen",
      role: "YouTube Creator",
      subscribers: "2.3M subscribers",
      image: "/src/assets/client1.png",
      verified: true,
    },
    {
      quote: "I was guessing before. Now I know which content my paying fans actually want. Revenue up 340%.",
      author: "Marcus Johnson",
      role: "TikTok Creator",
      subscribers: "890K followers",
      image: "/src/assets/client2.png",
      verified: true,
    },
    {
      quote: "Saved 15 hours a week. The AI tells me what to post next based on who's likely to convert.",
      author: "Akriti Sharma",
      role: "Instagram Creator",
      subscribers: "1.5M followers",
      image: "/src/assets/client3.png",
      verified: true,
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid grid-cols-2 gap-4 sm:mb-24 sm:gap-6 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <ScrollFloat key={index} offset={30}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 hover:bg-white/[0.04] sm:rounded-2xl sm:p-6 lg:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-emerald-400/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-1 font-display text-2xl font-bold tracking-tight text-white sm:mb-2 sm:text-3xl lg:text-4xl xl:text-5xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-white/60 transition-colors group-hover:text-emerald-400/80 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
                {/* Animated corner accent */}
                <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-emerald-400/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            </ScrollFloat>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Creators who{" "}
            <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-purple bg-clip-text text-transparent">
              actually make money
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/70 sm:text-lg">
            Real results from creators who stopped guessing and started using data
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollFloat key={index} offset={25}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] sm:rounded-3xl sm:p-6 lg:p-8"
              >
                {/* Background gradient glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-accent/20 via-brand-primary/20 to-brand-purple/20 blur-xl sm:rounded-3xl" />
                </div>

                <div className="relative">
                  {/* Client Image & Info */}
                  <div className="mb-4 flex items-start gap-3 sm:mb-6 sm:gap-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-white/10 transition-all duration-300 group-hover:ring-brand-accent/30 sm:h-16 sm:w-16 sm:rounded-2xl">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback gradient if image doesn't load
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-base font-semibold text-white sm:text-lg">
                          {testimonial.author}
                        </h4>
                        {testimonial.verified && (
                          <svg className="h-4 w-4 text-brand-accent sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                      <p className="text-xs text-white/50">{testimonial.subscribers}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="relative mb-4 sm:mb-6">
                    <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Star Rating */}
                  <div className="mt-4 flex gap-1 sm:mt-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-4 w-4 text-yellow-400 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </ScrollFloat>
          ))}
        </div>
      </div>
    </section>
  );
}
