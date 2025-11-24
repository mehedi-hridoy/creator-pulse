import { motion } from "framer-motion";

export default function AuthContainer({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-brand-bg text-white px-4 py-10">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-brand-bg" />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-black/50 shadow-[0_8px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
