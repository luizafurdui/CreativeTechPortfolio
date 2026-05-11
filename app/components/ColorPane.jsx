"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const colors = [
  {
    name: "white",
    value: "#E5E5E5",
    border: "#FFFFFF",
    riveValue: "white",
  },
  {
    name: "pink",
    value: "#FF6B6B",
    border: "#FF9A9A",
    riveValue: "pink",
  },
  {
    name: "green",
    value: "#6B6846",
    border: "#8A8660",
    riveValue: "green",
  },
  {
    name: "maroon",
    value: "#2A1203",
    border: "#4A2412",
    riveValue: "maroon",
  },
  {
    name: "yellow",
    value: "#FDBA2D",
    border: "#FFD36A",
    riveValue: "yellow",
  },
];

export default function ColorPane({ dark = false, onColorChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const paneRef = useRef(null);

  const radius = 34;

  useEffect(() => {
    function handleClickOutside(event) {
      if (paneRef.current && !paneRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const panelClasses = dark
    ? "border-black/10 bg-white"
    : "border-white/10 bg-black";

  const triggerClasses = dark
    ? "border-black/10 bg-white"
    : "border-white/15 bg-black";

  const labelClasses = dark ? "text-white/80" : "text-black/70";

  return (
    <div
      ref={paneRef}
      className="relative flex h-56 w-full items-center justify-start"
    >
      <div className="absolute left-0 z-20 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`h-10 w-10 rounded-full border shadow-2xl transition-transform duration-300 hover:scale-105 ${triggerClasses}`}
          aria-label="Open color selector"
        />

        <span className={`text-xs font-medium tracking-wide ${labelClasses}`}>
          Change color
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={`relative ml-20 h-32 w-32 rounded-full border shadow-2xl ${panelClasses}`}
          >
            {colors.map((color, index) => {
              const angle =
                (index / colors.length) * Math.PI * 2 - Math.PI / 2;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, x, y }}
                  exit={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                  transition={{
                    delay: index * 0.04,
                    duration: 0.35,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="absolute left-1/2 top-1/2"
                >
                  <button
                    type="button"
                   onClick={() => {
  onColorChange?.(color.riveValue);
}}
                    className="h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-lg transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundColor: color.value,
                      borderColor: color.border,
                    }}
                    aria-label={`Select ${color.name}`}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}