"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import "./frame.css";

const ACTIVE_SCALE = 2.5;

const PHOTOS = [
  {
    src: "/footer/plic/bee.png",
    cls: "plic-photo--bee",
    dir: -1,
    factor: 1,
    spring: { stiffness: 80, damping: 9, mass: 1 },
    kick: 5,
    tilt: -12,
    nativeW: 169,
    nativeH: 168,
  },
  {
    src: "/footer/plic/butterfly.png",
    cls: "plic-photo--butterfly",
    dir: 0.3,
    factor: 1.1,
    spring: { stiffness: 70, damping: 8, mass: 1.1 },
    kick: 4,
    tilt: 0,
    nativeW: 207,
    nativeH: 200,
  },
  {
    src: "/footer/plic/flower.png",
    cls: "plic-photo--flower",
    dir: 1,
    factor: 0.95,
    spring: { stiffness: 90, damping: 9, mass: 0.95 },
    kick: 5,
    tilt: 12,
    nativeW: 203,
    nativeH: 201,
  },
];

function PlicPhoto({
  src,
  cls,
  vx,
  vy,
  dir,
  factor,
  spring,
  dragging,
  kick,
  tilt,
  nativeW,
  nativeH,
  onSelect,
}) {
  const speed = useTransform([vx, vy], ([sx, sy]) => Math.hypot(sx, sy));
  const baseRotate = useTransform(
    speed,
    (s) => Math.min(s * 0.018 * factor, 7) * dir,
  );
  const baseX = useTransform(speed, (s) => s * 0.018 * factor * dir);
  const baseY = useTransform(vy, (v) => -v * 0.018 * factor);

  const kickRotate = useMotionValue(0);
  const kickX = useMotionValue(0);

  useEffect(() => {
    animate(kickRotate, dragging ? kick * dir : 0, {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    animate(kickX, dragging ? kick * 0.4 * dir : 0, {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
  }, [dragging, kick, dir, kickRotate, kickX]);

  const rotateCombined = useTransform(
    [baseRotate, kickRotate],
    ([a, b]) => tilt + a + b,
  );
  const xCombined = useTransform([baseX, kickX], ([a, b]) => a + b);

  const rotate = useSpring(rotateCombined, spring);
  const x = useSpring(xCombined, spring);
  const y = useSpring(baseY, spring);

  return (
    <motion.div
      className={`plic-photo ${cls}`}
      style={{ rotate, x, y, cursor: "pointer", pointerEvents: "auto" }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(src);
      }}
    >
      <motion.img
        layoutId={`photo-${src}`}
        src={src}
        alt=""
        width={nativeW}
        height={nativeH}
        style={{ width: "100%", height: "auto", display: "block" }}
        draggable={false}
      />
    </motion.div>
  );
}

/**
 * @param {{ dragConstraints?: import("react").RefObject<HTMLElement | null> }} props
 */
export default function EnvelopeFrame({ dragConstraints } = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const vx = useVelocity(x);
  const vy = useVelocity(y);
  const [dragging, setDragging] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const innerRef = useRef(null);
  useOnClickOutside(innerRef, () => setActiveImage(null));

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="envelope-wrapper">
      <motion.div
        className="envelope-stage"
        drag
        dragMomentum={false}
        dragConstraints={dragConstraints}
        dragElastic={0}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        style={{ x, y, cursor: "grab" }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {PHOTOS.map((photo) => (
          <PlicPhoto
            key={photo.src}
            {...photo}
            vx={vx}
            vy={vy}
            dragging={dragging}
            onSelect={setActiveImage}
          />
        ))}

        <div className="envelope-frame">
          <div className="paper-texture" />
          <div className="envelope-text">
            <div className="envelope-text-left">
              <h3 className="envelope-title">digital art</h3>
              <p className="envelope-meta">
                <span className="envelope-meta-label">Tool:</span> Procreate
              </p>
            </div>
            <p className="envelope-date">Sep 2024</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="photo-overlay"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeImage
          ? (() => {
              const meta = PHOTOS.find((p) => p.src === activeImage);
              if (!meta) return null;
              return (
                <div className="active-photo">
                  <motion.img
                    layoutId={`photo-${activeImage}`}
                    src={activeImage}
                    alt=""
                    width={meta.nativeW * ACTIVE_SCALE}
                    height={meta.nativeH * ACTIVE_SCALE}
                    className="photo-fullscreen"
                    ref={innerRef}
                    draggable={false}
                  />
                </div>
              );
            })()
          : null}
      </AnimatePresence>
    </div>
  );
}
