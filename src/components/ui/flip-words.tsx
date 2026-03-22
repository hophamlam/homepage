"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextWord = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  }, [isAnimating, words.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextWord();
    }, duration);
    return () => clearInterval(interval);
  }, [duration, nextWord]);

  useEffect(() => {
    setIsAnimating(false);
  }, [currentIndex]);

  return (
    <AnimatePresence
      mode="popLayout"
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.span
        key={words[currentIndex]}
        initial={{ opacity: 0, y: 20, rotateX: 90, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
        exit={{
          opacity: 0,
          y: -20,
          rotateX: -90,
          filter: "blur(8px)",
          position: "absolute",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5,
        }}
        className={cn(
          "z-10 inline-block relative whitespace-nowrap",
          className
        )}
      >
        {words[currentIndex]}
      </motion.span>
    </AnimatePresence>
  );
}
