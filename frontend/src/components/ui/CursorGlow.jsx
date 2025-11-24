import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
          opacity: isVisible ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      >
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-r from-brand-primary via-brand-purple to-brand-accent blur-3xl" />
      </motion.div>

      {/* Small cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-50 hidden lg:block"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 400,
        }}
      >
        <div className="h-2 w-2 rounded-full bg-brand-accent shadow-lg shadow-brand-accent/50" />
      </motion.div>
    </>
  );
}
