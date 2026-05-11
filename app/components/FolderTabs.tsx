"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type FolderSection = { id: string; label: string };

export const FOLDER_SECTIONS: FolderSection[] = [
  { id: "overview", label: "OVERVIEW" },
  { id: "work", label: "WORK" },
  { id: "process", label: "PROCESS" },
  { id: "skills", label: "SKILLS" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export const TAB_WIDTH = 160;
const TAB_HEIGHT = 52;
const TAB_OVERLAP = 16;

export default function FolderTabs() {
  const [active, setActive] = useState<string>(FOLDER_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { id: string; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.ratio) {
            best = {
              id: (e.target as HTMLElement).id,
              ratio: e.intersectionRatio,
            };
          }
        }
        if (best) setActive(best.id);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-25% 0px -55% 0px" }
    );

    for (const s of FOLDER_SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Desktop: browser-style tabs along the folder's right edge */}
      <aside
        aria-label="Folder sections"
        className="pointer-events-none absolute top-0 right-0 hidden h-full lg:block"
      >
        <div
          className="pointer-events-auto sticky top-16 flex flex-col gap-2"
          style={{ transform: `translateX(${TAB_WIDTH}px)` }}
        >
          {FOLDER_SECTIONS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => scrollTo(tab.id)}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative focus:outline-none"
                style={{ height: TAB_HEIGHT, width: TAB_WIDTH }}
              >
                <div
                  className={`absolute inset-0 transition-colors duration-200 ${
                    isActive
                      ? "bg-white"
                      : "bg-[#d9d9d9] hover:bg-[#c9c9c9]"
                  }`}
                  style={{
                    borderTopLeftRadius: 46,
                    borderBottomLeftRadius: 46,
                    borderTopRightRadius: 170,
                    borderBottomRightRadius: 28,
                    boxShadow: isActive
                      ? "4px 4px 16px rgba(0, 0, 0, 0.1)"
                      : "2px 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                />
                <span
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[12px] font-semibold tracking-[0.28em] ${
                    isActive ? "text-black" : "text-neutral-800"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </aside>

      {/* Mobile/tablet: horizontal scrollable tab bar */}
      <nav
        aria-label="Folder sections"
        className="sticky top-2 z-40 mx-auto mb-3 flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-neutral-200 bg-white/95 px-1.5 py-1.5 shadow-sm backdrop-blur-sm lg:hidden"
      >
        {FOLDER_SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[10.5px] uppercase tracking-[0.22em] transition-colors ${
                isActive
                  ? "bg-neutral-200 text-black"
                  : "text-neutral-600 hover:text-black"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {s.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
