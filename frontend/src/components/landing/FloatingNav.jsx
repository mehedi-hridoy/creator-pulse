import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 shadow-2xl shadow-brand-primary/20 backdrop-blur-2xl"
            : "bg-white/5 backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 border-r border-white/10 pr-4">
          <div className="relative h-7 w-7 rounded-lg bg-gradient-to-br from-brand-primary via-brand-purple to-brand-pink p-[1.5px]">
            <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-black">
              <span className="text-xs font-bold bg-gradient-to-br from-brand-primary to-brand-pink bg-clip-text text-transparent">
                CP
              </span>
            </div>
          </div>
          <span className="font-heading text-sm font-semibold text-white">
            CreatorPulse
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it works</NavLink>
          <NavLink href="#demo">AI Demo</NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Link
            to="/login"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-brand-primary to-brand-purple px-4 py-1.5 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-brand-primary/30"
          >
            <span className="relative z-10">Get started</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-purple to-brand-pink opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
    >
      {children}
    </a>
  );
}
