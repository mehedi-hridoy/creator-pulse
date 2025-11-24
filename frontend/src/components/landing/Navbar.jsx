import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-bg/80 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 text-xl font-bold text-white transition-transform hover:scale-105"
        >
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-brand-primary via-brand-purple to-brand-pink p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-brand-bg">
              <span className="text-lg font-bold bg-gradient-to-br from-brand-primary to-brand-pink bg-clip-text text-transparent">CP</span>
            </div>
          </div>
          <span className="font-heading bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">CreatorPulse</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden space-x-8 text-sm font-medium text-gray-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#demo" className="transition hover:text-white">
            AI Demo
          </a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary to-brand-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:shadow-brand-primary/40"
          >
            <span className="relative z-10">Get started</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-purple to-brand-pink opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
