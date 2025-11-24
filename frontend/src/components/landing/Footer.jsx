export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-brand-bg py-12 text-gray-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-brand-primary via-brand-purple to-brand-pink p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-brand-bg">
                <span className="text-sm font-bold bg-gradient-to-br from-brand-primary to-brand-pink bg-clip-text text-transparent">CP</span>
              </div>
            </div>
            <span className="font-heading text-base font-semibold text-white">CreatorPulse</span>
          </div>
          
          {/* Links */}
          <div className="flex gap-8 text-sm">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#demo" className="transition hover:text-white">
              Demo
            </a>
          </div>

          {/* Copyright */}
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} CreatorPulse. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
