"use client";

import { AnimatePresence, motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "Contact", id: "contact" },
];

export default function Navbar({
  inWork,
  activeWorkId,
  activeWorkLabel,
}: {
  inWork: boolean;
  activeWorkId: string | null;
  activeWorkLabel: string | null;
}) {
  const visible = Boolean(inWork && activeWorkId && activeWorkLabel);

  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id === "contact") {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
      return;
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="flex justify-center py-4">
        <div
          className="flex items-center gap-1 rounded-full border border-white/15 bg-[#B7BDC7]/45 backdrop-saturate-150 backdrop-brightness-75 px-3 py-0.5 text-sm shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {NAV_ITEMS.map((item, i) => (
            <div key={item.id} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
              )}
              <button
                type="button"
                onClick={() => scrollTo(item.id)}
                className="rounded-md px-3 py-1 font-semibold tracking-tight text-[#DEEAFF]"
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </nav>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="work-bar"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full -mt-1 flex justify-center"
          >
            <motion.button
              onClick={() => scrollTo(activeWorkId!)}
              layout
              transition={{
                layout: {
                  type: "spring",
                  duration: 0.55,
                  bounce: 0.1,
                },
              }}
              whileTap={{ scale: 0.95 }}
              style={{ willChange: "transform", fontFamily: "var(--font-inter)" }}
              className="group relative inline-flex w-auto overflow-hidden rounded-full border border-white/15 bg-[#B7BDC7]/45 backdrop-saturate-150 backdrop-brightness-75 px-4 py-1.5 text-xs font-semibold text-[#DEEAFF] shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={activeWorkLabel!}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      delay: 0.5,
                      ease: [0.23, 1, 0.32, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0.22,
                      ease: [0.23, 1, 0.32, 1],
                    },
                  }}
                  className="relative z-10 whitespace-nowrap tracking-tight"
                >
                  {activeWorkLabel}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
