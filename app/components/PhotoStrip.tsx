"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Photo = {
  src: string;
  alt: string;
  angle: number;
  framed: boolean;
  imgClass?: string;
  caption?: string;
  title: string;
  description: string;
};

const FRAMED_SIZE = "h-48 w-48 sm:h-56 sm:w-56";

const PHOTOS: Photo[] = [
  {
    src: "/mugs.png",
    alt: "Mugs",
    angle: -6,
    framed: true,
    caption: "feb 2025",
    title: "Coffee Mugs",
    description: "painting mugs :)",
  },
  {
    src: "/NY.png",
    alt: "New York",
    angle: 5,
    framed: true,
    caption: "New York 2025",
    title: "New York 2025",
    description:
      "On my bucket list was going to the United States. I think a part of my design journey already started there.",
  },
  {
    src: "/book.png",
    alt: "Book",
    angle: -7,
    framed: false,
    title: "Currently Reading",
    description: "A book I keep getting back to.",
  },
  {
    src: "/js.png",
    alt: "JavaScript",
    angle: 6,
    framed: true,
    caption: "JobShop® 2026",
    imgClass: "h-64 w-48 sm:h-80 sm:w-56",
    title: "JobShop® 2026",
    description:
      "Being part of the team organising a career event in Cluj. It was my first branding project and the longest one I had worked on, (6 months). We ended up with 1,231 participants and 9 partner companies.",
  },
  {
    src: "/aiArt.png",
    alt: "AI Art",
    angle: -5,
    framed: false,
    title: "AI Art",
    description:
      "Generated with Midjourney. I had my fun with AI-generated photos, but I quickly realised I always had to give it good references to get something I actually liked. It didn't last long, but it was a fun experiment.",
  },
];

const EXPAND_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EXPAND_DURATION = 0.45;
const HOVER_SPRING = { type: "spring" as const, stiffness: 500, damping: 28 };
const ACTIVE_SCALE = 1.55;

export default function PhotoStrip() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      {activeId && (
        <div
          aria-hidden
          className="fixed inset-0 z-40"
          onClick={() => setActiveId(null)}
        />
      )}

      <div className="flex flex-wrap items-center justify-center py-6 -space-x-6 sm:-space-x-10">
        {PHOTOS.map((photo, i) => {
          const isActive = activeId === photo.src;
          const hoverAngle = photo.angle + (photo.angle >= 0 ? 4 : -4);
          const zIndex = isActive
            ? 100
            : photo.src === "/book.png"
              ? PHOTOS.length + 1
              : PHOTOS.length - i;

          const animateTo = isActive
            ? { rotate: 0, scale: ACTIVE_SCALE }
            : { rotate: photo.angle, scale: 1 };

          const transition = isActive
            ? { duration: EXPAND_DURATION, ease: EXPAND_EASE }
            : { duration: EXPAND_DURATION * 0.8, ease: EXPAND_EASE };

          const hoverProps = isActive
            ? undefined
            : { rotate: hoverAngle, scale: 1.04 };

          const onClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            setActiveId(isActive ? null : photo.src);
          };

          return (
            <div
              key={photo.src}
              className="relative"
              style={{ zIndex }}
            >
              {!photo.framed ? (
                <motion.img
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  className="relative block h-56 w-auto cursor-pointer select-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-72"
                  initial={{ rotate: photo.angle }}
                  animate={animateTo}
                  whileHover={hoverProps}
                  transition={isActive ? transition : HOVER_SPRING}
                  onClick={onClick}
                />
              ) : (
                <motion.div
                  className="relative cursor-pointer bg-white px-3 pt-3 pb-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.25)]"
                  initial={{ rotate: photo.angle }}
                  animate={animateTo}
                  whileHover={hoverProps}
                  transition={isActive ? transition : HOVER_SPRING}
                  onClick={onClick}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                    className={`block select-none object-cover ${
                      photo.imgClass ?? FRAMED_SIZE
                    }`}
                  />
                  {photo.caption && (
                    <p
                      className="mt-2 text-right text-xs italic text-neutral-700"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {photo.caption}
                    </p>
                  )}
                </motion.div>
              )}

              {isActive && (
                <div
                  className="pointer-events-auto absolute -top-16 z-50 w-64 rounded-4xl border border-white/30 bg-white/25 px-5 py-4 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 sm:-top-20"
                  style={{
                    left:
                      photo.src === "/aiArt.png"
                        ? "calc(115% + 0px)"
                        : "calc(127.5% + 6px)",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.165, 0.84, 0.44, 1],
                    }}
                    className="text-sm font-semibold leading-relaxed text-white"
                  >
                    {photo.description}
                  </motion.p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
