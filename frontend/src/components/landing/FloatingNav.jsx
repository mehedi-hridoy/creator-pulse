import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "../ui/Logo";

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
        className={`flex items-center gap-2 rounded-full border px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "border-white/[0.08] bg-black/80 shadow-2xl shadow-brand-primary/10 backdrop-blur-2xl"
            : "border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="border-r border-white/[0.08] pr-6">
          <Logo size="sm" />
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#showcase">Showcase</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 border-l border-white/[0.08] pl-6">
          <Link to="/login">
            <motion.button
              className="text-[0.9375rem] font-medium text-white/60 transition-colors hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              className="group relative overflow-hidden rounded-[12px] bg-white px-5 py-2 text-[0.9375rem] font-semibold text-dark shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_12px_0_rgba(99,102,241,0.4)]"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      className="rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}
