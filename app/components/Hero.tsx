"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    const set = () => setVh(window.innerHeight || 800);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  // must match ScrollVideoBg fade pacing
  const fadeDistance = vh * 4;

  // hero copy fades out within first screen
  const opacity = useTransform(scrollY, [0, vh * 0.9], [1, 0]);
  const y = useTransform(scrollY, [0, vh * 0.9], [0, -28]);

  // optional. slight blur for the text as it leaves
  const blur = useTransform(scrollY, [0, vh * 0.9], [0, 6]);
  const filter = useTransform(blur, (v: number) => `blur(${v}px)`);

  return (
    <section className="relative min-h-screen px-8 sm:px-16 flex items-center">
      <motion.div style={{ opacity, y, filter }} className="max-w-2xl text-white">
        <p className="text-white/70 text-lg tracking-wide">Sample work</p>

      </motion.div>
    </section>
  );
}
