import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { CheckCircle2, Target, TrendingUp, AlertTriangle } from "lucide-react";

export default function SummarySection({ narrative }) {
  const { summary = "", actions = [], contentIdeas = [] } = narrative;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid md:grid-cols-2 gap-6"
    >
      {/* Summary Card */}
      <Card className="p-6 md:p-7 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Summary</h3>
        </div>
        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
          {summary || "No summary available yet. Upload your analytics data to get started."}
        </p>
      </Card>

      {/* Top Actions Card */}
      <Card className="p-6 md:p-7 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Top Actions</h3>
        </div>
        {actions.length > 0 ? (
          <ul className="space-y-3">
            {actions.map((action, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {action}
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No actions available yet.</p>
        )}
      </Card>

      {/* Opportunities Card */}
      <Card className="p-6 md:p-7 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Opportunities</h3>
        </div>
        {contentIdeas.length > 0 ? (
          <ul className="space-y-3">
            {contentIdeas.slice(0, 3).map((idea, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {idea}
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No opportunities identified yet.</p>
        )}
      </Card>

      {/* Risks / Watchlist Card */}
      <Card className="p-6 md:p-7 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Risks / Watchlist</h3>
        </div>
        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
          Monitor declining trends and high volatility platforms. Check your platform-specific alerts for detailed risk analysis.
        </p>
      </Card>
    </motion.div>
  );
}
