"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import "./styles.css";

const baseIconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const menuItems = [
  {
    title: "New project",
    description: "Start a fresh workspace",
    color: "#2090FF",
    tint: "rgba(32, 144, 255, 0.12)",
    icon: (
      <svg {...baseIconProps} stroke="#2090FF">
        <path
          pathLength="1"
          d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
        />
      </svg>
    ),
  },
  {
    title: "New task",
    description: "Add something to your list",
    color: "#EF4444",
    tint: "rgba(239, 68, 68, 0.12)",
    icon: (
      <svg {...baseIconProps} stroke="#EF4444">
        <path
          pathLength="1"
          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
        />
        <path pathLength="1" d="M9 11l3 3L22 4" />
      </svg>
    ),
  },
  {
    title: "New note",
    description: "Capture an idea quickly",
    color: "#F59E0B",
    tint: "rgba(245, 158, 11, 0.14)",
    icon: (
      <svg {...baseIconProps} stroke="#F59E0B">
        <path
          pathLength="1"
          d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
        />
        <path
          pathLength="1"
          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"
        />
      </svg>
    ),
  },
  {
    title: "New file",
    description: "Upload or create a file",
    color: "#10B981",
    tint: "rgba(16, 185, 129, 0.12)",
    icon: (
      <svg {...baseIconProps} stroke="#10B981">
        <path
          pathLength="1"
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        />
        <path pathLength="1" d="M14 2v6h6" />
      </svg>
    ),
  },
];

export default function CreateNewMenuStarter() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="details-wrapper">
      <motion.button
        layoutId="details-wrapper"
        onClick={() => setOpen(true)}
        className="details-button"
        style={{ borderRadius: 8 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>

        <motion.span layoutId="details-title">Create new</motion.span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            layoutId="details-wrapper"
            className="details-popover"
            style={{ borderRadius: 12 }}
            ref={ref}
          >
    

            <ul className="details-list">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <motion.button
                    className="details-row"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                  >
                    <motion.span
                      className="details-icon"
                      style={{ background: item.tint }}
                      variants={{
                        rest: { scale: 1, rotate: 0 },
                        hover: {
                          scale: 1.08,
                          rotate: [0, -12, 10, -8, 6, -3, 0],
                        },
                      }}
                      transition={{
                        rotate: { duration: 0.55, ease: "easeInOut" },
                        scale: {
                          type: "spring",
                          stiffness: 360,
                          damping: 14,
                        },
                      }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>
                      <span className="details-row-title">{item.title}</span>
                      <span className="details-row-description">
                        {item.description}
                      </span>
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
