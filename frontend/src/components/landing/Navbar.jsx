import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#demo", label: "AI Demo" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -32 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full px-4 pt-4"
    >
      {/* Desktop Navbar (non-sticky, minimal) */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm lg:flex">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2 text-lg font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary/50 to-brand-purple/50 text-[13px] font-bold text-white/90">
            CP
          </div>
          <span className="font-heading tracking-tight text-white/90">CreatorPulse</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="flex items-center gap-1 text-[13px] font-medium">
          {navLinks.map((link) => (
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              key={link.href}
              href={link.href}
              className="group relative rounded-md px-3 py-1.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <span>{link.label}</span>
              <span className="pointer-events-none absolute inset-x-2 -bottom-px h-px w-auto scale-x-0 bg-gradient-to-r from-brand-primary via-brand-purple to-brand-pink transition-transform duration-300 group-hover:scale-x-100" />
            </motion.a>
          ))}
        </div>

        {/* Desktop Auth buttons */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg border border-white/10 px-3 py-1.5 text-[13px] font-medium text-gray-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-purple px-4 py-1.5 text-[13px] font-semibold text-white shadow-[0_2px_8px_-2px_rgba(99,102,241,0.5)] transition hover:shadow-[0_4px_12px_-2px_rgba(99,102,241,0.6)]"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 lg:hidden">
        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white transition hover:bg-white/5"
        >
          <div className="space-y-1.5">
            <motion.span
              layout
              animate={mobileMenuOpen ? { rotate: 45, translateY: 4 } : { rotate: 0, translateY: 0 }}
              className="block h-0.5 w-5 rounded bg-white"
            />
            <motion.span
              layout
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-5 rounded bg-white"
            />
            <motion.span
              layout
              animate={mobileMenuOpen ? { rotate: -45, translateY: -4 } : { rotate: 0, translateY: 0 }}
              className="block h-0.5 w-5 rounded bg-white"
            />
          </div>
        </button>

        {/* Logo - ABSOLUTE CENTER */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-white transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-primary to-brand-purple text-[10px] font-bold text-white">CP</div>
          <span className="font-heading text-[11px] text-white/90">CreatorPulse</span>
        </Link>

        {/* Invisible placeholder keeps layout balanced */}
        <div className="w-9" aria-hidden="true" />
      </div>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
              <div className="mb-6 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="block rounded-md px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="space-y-3 border-t border-white/5 pt-6">
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  className="block w-full rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={handleLinkClick}
                  className="block w-full rounded-md bg-gradient-to-r from-brand-primary to-brand-purple px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand-primary/30"
                >
                  Get started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
