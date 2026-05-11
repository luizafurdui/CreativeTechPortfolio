"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import EnvelopeFrame from "./anvelope/frame";

const SF_FONT = "var(--font-inter), system-ui, sans-serif";

const SMALL_WIDTH = 240;
const ACTIVE_SCALE = 2;

type Photo = {
  src: string;
  nativeW: number;
  nativeH: number;
  label: string;
  date: string;
};

const PHOTOS: Photo[] = [
  {
    src: "/generated.png",
    nativeW: 230,
    nativeH: 297,
    label: "MIDJOURNEY",
    date: "OCT 2025",
  },
  {
    src: "/footer/coffee.png",
    nativeW: 320,
    nativeH: 394,
    label: "FILM",
    date: "JUN 2024",
  },
  {
    src: "/footer/jobshop.png",
    nativeW: 209,
    nativeH: 302,
    label: "DESIGN",
    date: "MAR 2024",
  },
  {
    src: "/footer/nft.png",
    nativeW: 240,
    nativeH: 240,
    label: "BLENDER",
    date: "JAN 2024",
  },
  {
    src: "/footer/NY.png",
    nativeW: 259,
    nativeH: 316,
    label: "FILM",
    date: "DEC 2023",
  },
];

function layoutIdFor(src: string) {
  return `footer-${src}`;
}

function DraggablePhoto({
  photo,
  onSelect,
  dragConstraints,
  zIndex,
  onActivate,
}: {
  photo: Photo;
  onSelect: (src: string) => void;
  dragConstraints?: React.RefObject<HTMLDivElement | null>;
  zIndex?: number;
  onActivate?: () => void;
}) {
  const displayW = SMALL_WIDTH;
  const displayH = (SMALL_WIDTH * photo.nativeH) / photo.nativeW;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragElastic={0}
      whileDrag={{ cursor: "grabbing" }}
      onPointerDown={onActivate}
      style={{
        cursor: "grab",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: displayW,
        position: "relative",
        zIndex,
      }}
    >
      <div style={{ position: "relative", width: displayW }}>
        <motion.img
          layoutId={layoutIdFor(photo.src)}
          src={photo.src}
          alt=""
          width={displayW}
          height={displayH}
          draggable={false}
          style={{
            display: "block",
            aspectRatio: `${photo.nativeW} / ${photo.nativeH}`,
          }}
        />
        <button
          type="button"
          aria-label="Expand photo"
          onClick={() => onSelect(photo.src)}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: 6,
            background: "rgba(0, 0, 0, 0.55)",
            color: "#fff",
            cursor: "pointer",
            pointerEvents: "auto",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          color: "#4F5D75",
          backgroundColor: "rgba(79, 93, 117, 0.12)",
          borderRadius: 8,
          padding: "5px 10px",
          fontFamily: SF_FONT,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 10 }}>
          Generated: <strong style={{ fontWeight: 700 }}>{photo.label}</strong>
        </span>
        <span style={{ fontSize: 8 }}>{photo.date}</span>
      </div>
    </motion.div>
  );
}

export default function Footer() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);
  const [zMap, setZMap] = useState<Record<string, number>>({});
  const [panelSize, setPanelSize] = useState({ width: 0, height: 0 });
  const zCounter = useRef(10);
  const innerRef = useRef<HTMLImageElement>(null!);
  const photoPanelRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(innerRef, () => setActiveSrc(null));

  const bringToFront = useCallback((id: string) => {
    zCounter.current += 1;
    const next = zCounter.current;
    setZMap((prev) => (prev[id] === next ? prev : { ...prev, [id]: next }));
  }, []);

  useEffect(() => {
    const el = photoPanelRef.current;
    if (!el) return;
    const update = () =>
      setPanelSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const horizontalTicks = Array.from(
    { length: Math.max(0, Math.floor(panelSize.width / 100)) },
    (_, i) => i * 100,
  );
  const verticalTicks = Array.from(
    { length: Math.max(0, Math.floor(panelSize.height / 100)) },
    (_, i) => i * 100,
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const activePhoto = activeSrc
    ? PHOTOS.find((p) => p.src === activeSrc) ?? null
    : null;

  return (
    <footer className="w-full bg-white">
      <section className="mx-auto flex w-full max-w-400 flex-col items-center justify-end gap-6 px-8 pb-8 pt-10 sm:px-16">
        <div className="footer-photo-panel-frame">
          <div className="footer-photo-panel-ruler-vertical" aria-hidden="true">
            <span className="footer-photo-panel-axis-label footer-photo-panel-axis-label--y">
              Y
            </span>
            {verticalTicks.map((n) => (
              <span
                key={n}
                className="footer-photo-panel-ruler-vertical-tick"
                style={{ bottom: n }}
              >
                {n / 10}
              </span>
            ))}
          </div>

          <div
            ref={photoPanelRef}
            className="footer-photo-panel relative overflow-hidden bg-white px-6 py-4"
          >
            <div className="flex items-center justify-center">
              <div
                style={{ position: "relative", zIndex: zMap["envelope"] }}
                onPointerDown={() => bringToFront("envelope")}
              >
                <EnvelopeFrame dragConstraints={photoPanelRef} />
              </div>
            </div>
          </div>

          <div className="footer-photo-panel-ruler" aria-hidden="true">
            {horizontalTicks.map((n) => (
              <span
                key={n}
                className="footer-photo-panel-ruler-tick"
                style={{ left: n }}
              >
                {n / 10}
              </span>
            ))}
            <span className="footer-photo-panel-axis-label footer-photo-panel-axis-label--x">
              X
            </span>
          </div>

          <div className="footer-photo-panel-corner" aria-hidden="true">
            O
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeSrc ? (
          <motion.div
            key="generated-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="generated-overlay"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activePhoto ? (
          <div className="generated-active">
            <motion.img
              layoutId={layoutIdFor(activePhoto.src)}
              src={activePhoto.src}
              alt=""
              width={activePhoto.nativeW * ACTIVE_SCALE}
              height={activePhoto.nativeH * ACTIVE_SCALE}
              draggable={false}
              ref={innerRef}
              className="generated-active-image"
              style={{
                aspectRatio: `${activePhoto.nativeW} / ${activePhoto.nativeH}`,
              }}
            />
          </div>
        ) : null}
      </AnimatePresence>
    </footer>
  );
}
