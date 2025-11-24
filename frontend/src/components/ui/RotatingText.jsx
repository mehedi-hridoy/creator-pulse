import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function RotatingText({ texts, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={texts[index]}
        initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -20, opacity: 0, filter: 'blur(8px)' }}
        transition={{
          duration: 0.5,
          ease: [0.33, 1, 0.68, 1],
        }}
        className={className}
      >
        {texts[index]}
      </motion.span>
    </AnimatePresence>
  );
}
