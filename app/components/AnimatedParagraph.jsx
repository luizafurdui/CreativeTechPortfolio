"use client";

import { motion } from "framer-motion";

const EASE_OUT_QUINT = [0.23, 1, 0.32, 1];

export default function AnimatedParagraph({
  text,
  delay = 2,
  stagger = 0.04,
  duration = 0.4,
  className,
  style,
}) {
  const words = text.split(" ");

  return (
    <p className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: EASE_OUT_QUINT,
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word + " "}
        </motion.span>
      ))}
    </p>
  );
}
