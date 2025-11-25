import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Sparkles, Video, MessageCircle, Image } from "lucide-react";

const iconMap = {
  video: Video,
  message: MessageCircle,
  image: Image,
  default: Sparkles,
};

function getIconForIdea(idea) {
  const text = idea.toLowerCase();
  if (text.includes("video") || text.includes("reel") || text.includes("tiktok")) {
    return iconMap.video;
  }
  if (text.includes("post") || text.includes("story")) {
    return iconMap.image;
  }
  if (text.includes("comment") || text.includes("engage") || text.includes("community")) {
    return iconMap.message;
  }
  return iconMap.default;
}

export default function ContentIdeasGrid({ contentIdeas }) {
  if (!contentIdeas || contentIdeas.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold text-foreground">Content Ideas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentIdeas.map((idea, idx) => {
          const Icon = getIconForIdea(idea);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="p-4 hover:shadow-md transition-all cursor-pointer border-border hover:border-primary/50">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground transition-colors">
                    {idea}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
