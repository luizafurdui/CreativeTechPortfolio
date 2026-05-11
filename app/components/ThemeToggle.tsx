"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const DRAW = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const },
};

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex items-center gap-1 rounded-full border p-1 transition-colors ${
        isLight
          ? "border-black/10 bg-white"
          : "border-white/10 bg-black"
      }`}
    >
      <span
        className={`relative flex h-7 w-14 items-center justify-center transition-colors ${
          isLight ? "text-black" : "text-white/50"
        }`}
      >
        {isLight && (
          <motion.span
            layoutId="theme-pill"
            transition={{ type: "spring", duration: 0.9, bounce: 0.15 }}
            className="absolute inset-0 rounded-full bg-black/10"
          />
        )}
        <motion.svg
          key={`sun-${isLight}`}
          className="relative z-10"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={isLight ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={DRAW.transition}
            d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
          />
          <motion.path
            initial={isLight ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ ...DRAW.transition, delay: 0.25 }}
            strokeWidth="2"
            d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86M4.86 19.14L4.99 19.01M12 2.08V2M12 22V21.92M2.08 12H2M22 12H21.92M4.99 4.99L4.86 4.86"
          />
        </motion.svg>
      </span>

      <span
        className={`relative flex h-7 w-14 items-center justify-center transition-colors ${
          isLight ? "text-black/45" : "text-white"
        }`}
      >
        {!isLight && (
          <motion.span
            layoutId="theme-pill"
            transition={{ type: "spring", duration: 0.9, bounce: 0.15 }}
            className="absolute inset-0 rounded-full bg-white/12"
          />
        )}
        <motion.svg
          key={`moon-${isLight}`}
          className="relative z-10"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={!isLight ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={DRAW.transition}
            d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z"
          />
        </motion.svg>
      </span>
    </button>
  );
}
