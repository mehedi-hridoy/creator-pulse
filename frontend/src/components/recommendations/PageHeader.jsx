import { motion } from "framer-motion";
import { Clock, RefreshCw, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function PageHeader({ generatedAt, onRefresh, onRegenerate, isFetching }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-40 -mx-6 md:-mx-10 px-6 md:px-10 py-4 mb-8 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            AI Recommendations
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            CreatorPulse — your analytics copilot
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {generatedAt && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Last generated {new Date(generatedAt).toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-muted/50 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>

            <button
              onClick={onRegenerate}
              disabled={isFetching}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] group-hover:opacity-90 transition-opacity" />
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Regenerate
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
