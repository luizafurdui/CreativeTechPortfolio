"use client";

import { useCallback, useMemo, useState } from "react";

const FLOWERS = [
  "/cactus/C1.svg",
  "/cactus/C2.svg",
  "/cactus/C3.svg",
  "/cactus/C4.svg",
  "/cactus/C5.svg",
  "/cactus/C6.svg",
];

const BLOCK_SRC = "/cactus/block.svg";
const BLOCK_W = 196;
const BLOCK_H = 130;
const DIAMOND_H = 113;

const ROWS = 5;
const COLS = 16;
const SEED = 7;

const FLOOR_HEIGHT = (ROWS - 1) * (DIAMOND_H / 2) + BLOCK_H;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Tile = {
  key: string;
  x: number;
  y: number;
  flower: string;
  scale: number;
  rotation: number;
};

export default function CactusGrid() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const tiles = useMemo<Tile[]>(() => {
    const list: Tile[] = [];
    for (let r = ROWS - 1; r >= 0; r--) {
      const xOffset = r % 2 === 0 ? 0 : -BLOCK_W / 2;
      for (let c = 0; c < COLS; c++) {
        const rand = mulberry32(SEED + r * 131 + c * 17);
        list.push({
          key: `${r}-${c}`,
          x: xOffset + c * BLOCK_W,
          y: (ROWS - 1 - r) * (DIAMOND_H / 2),
          flower: FLOWERS[Math.floor(rand() * FLOWERS.length)],
          scale: 0.85 + rand() * 0.4,
          rotation: (rand() - 0.5) * 10,
        });
      }
    }
    return list;
  }, []);

  const reveal = useCallback((key: string) => {
    setRevealed((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      for (const touch of Array.from(e.touches)) {
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        if (el instanceof HTMLElement) {
          const tileKey = el.dataset.tileKey;
          if (tileKey) reveal(tileKey);
        }
      }
    },
    [reveal]
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <div
        className="absolute bottom-0 left-0 right-0 origin-bottom-left scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100"
        style={{ height: FLOOR_HEIGHT, touchAction: "pan-y" }}
        onTouchMove={handleTouchMove}
      >
        {tiles.map((tile) => {
          const isRevealed = revealed.has(tile.key);
          return (
            <div
              key={tile.key}
              className="absolute"
              style={{
                left: tile.x,
                top: tile.y,
                width: BLOCK_W,
                height: BLOCK_H,
                pointerEvents: "none",
              }}
            >
              <img
                src={BLOCK_SRC}
                alt=""
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none"
              />

              <div
                data-tile-key={tile.key}
                className="absolute cursor-pointer"
                style={{
                  left: 0,
                  top: 0,
                  width: BLOCK_W,
                  height: DIAMOND_H,
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => reveal(tile.key)}
                onClick={() => reveal(tile.key)}
                onTouchStart={() => reveal(tile.key)}
              />

              <img
                src={tile.flower}
                alt=""
                draggable={false}
                className="pointer-events-none absolute max-w-none select-none"
                style={{
                  left: "50%",
                  bottom: BLOCK_H - DIAMOND_H / 2,
                  opacity: isRevealed ? 1 : 0,
                  transform: `translateX(-50%) scale(${
                    isRevealed ? tile.scale : 0
                  }) rotate(${tile.rotation}deg)`,
                  transformOrigin: "50% 100%",
                  transition:
                    "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 250ms ease-out",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
