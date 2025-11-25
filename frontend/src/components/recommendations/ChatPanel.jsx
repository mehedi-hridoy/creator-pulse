import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../ui/Card";
import { MessageCircle, Sparkles, User, Loader2, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-muted-foreground/40"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

function ChatMessage({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse items-end" : "items-start"}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-gradient-to-br from-[#7C3AED] to-[#EC4899]"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Message bubble */}
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border text-foreground rounded-bl-sm"
        }`}
      >
        <div
          className={`text-sm md:text-[15px] leading-relaxed ${
            isUser ? "text-primary-foreground" : "text-foreground prose prose-sm dark:prose-invert max-w-none"
          }`}
          dangerouslySetInnerHTML={{
            __html: message
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/^### (.*?)$/gm, '<h3 class="text-base font-semibold mt-2 mb-1">$1</h3>')
              .replace(/^## (.*?)$/gm, '<h2 class="text-lg font-semibold mt-3 mb-2">$1</h2>')
              .replace(/^# (.*?)$/gm, '<h1 class="text-xl font-bold mt-3 mb-2">$1</h1>')
              .replace(/\n- /g, "\n• ")
              .replace(/\n\n/g, "<br/><br/>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ChatPanel({ onAsk }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isAsking, setIsAsking] = useState(false);
  const scrollRef = useRef(null);

  const suggestedPrompts = [
    "Best posting window this week",
    "Where should I focus next?",
    "Turn this into a growth plan",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAsking]);

  const handleAsk = async () => {
    if (!question.trim() || isAsking) return;

    const userMessage = question.trim();
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setQuestion("");
    setIsAsking(true);

    try {
      const answer = await onAsk(userMessage);
      setMessages((prev) => [...prev, { text: answer, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I encountered an error. Please try again.", isUser: false },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handlePromptClick = (prompt) => {
    setQuestion(prompt);
  };

  const handleClear = () => {
    setMessages([]);
    setQuestion("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="p-6 md:p-7">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-1">Ask CreatorPulse</h3>
          <p className="text-sm text-muted-foreground">
            Follow up on your recommendations or ask custom questions about your analytics.
          </p>
        </div>

        {/* Chat transcript */}
        {messages.length > 0 && (
          <div
            ref={scrollRef}
            className="mb-6 p-4 rounded-xl bg-muted/40 max-h-[420px] overflow-y-auto space-y-4 scroll-smooth"
          >
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
              ))}
              {isAsking && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 items-start"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Input area */}
        <div className="space-y-3">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={isAsking}
            className="w-full rounded-xl bg-background border border-border p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="e.g., What should I post next Tuesday on Instagram?"
          />

          {/* Suggested prompts */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-muted-foreground text-sm font-medium hover:text-foreground hover:bg-muted/50 transition-all focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}

              <button
                onClick={handleAsk}
                disabled={!question.trim() || isAsking}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] group-hover:opacity-90 transition-opacity" />
                <div className="relative flex items-center gap-2">
                  {isAsking ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MessageCircle className="w-4 h-4" />
                  )}
                  {isAsking ? "Thinking..." : "Ask"}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Default greeting */}
        {messages.length === 0 && !isAsking && (
          <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Hi, we're CreatorPulse.</strong> Ask us anything
              about your analytics — posting windows, where to focus, risks, and content ideas.
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
