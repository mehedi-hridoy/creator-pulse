import { motion } from 'framer-motion';

export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  return (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Icon */}
      <div className="relative">
        <div className={`${sizes[size]} aspect-square rounded-xl bg-gradient-to-br from-brand-primary via-brand-accent to-brand-purple p-[2px]`}>
          <div className="h-full w-full rounded-[10px] bg-dark flex items-center justify-center">
            <svg
              className="h-[60%] w-[60%] text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-10" />
            </svg>
          </div>
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-brand-primary/20 via-brand-accent/20 to-brand-purple/20 blur-xl" />
      </div>
      
      {/* Wordmark */}
      <div className="flex flex-col">
        <span className="font-display text-[1.375rem] font-bold tracking-[-0.02em] leading-none">
          <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Creator
          </span>
          <span className="bg-gradient-to-r from-brand-accent via-brand-primary to-brand-purple bg-clip-text text-transparent">
            Pulse
          </span>
        </span>
        <span className="text-[0.6875rem] font-medium tracking-[0.08em] text-white/40 uppercase">
          Analytics
        </span>
      </div>
    </motion.div>
  );
}
