"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const FRONT = { x: 0, y: 0, rotation: 0, scale: 1 };
const BACK = { x: 0, y: 10, rotation: -12, scale: 0.96 };

function addSwap(tl, left, right, backPos, label, distance, duration) {
  tl.addLabel(label, "+=0.8");

  tl.to(left, { x: distance, rotation: 14, scale: 0.94, duration, ease: "power2.inOut" }, label);
  tl.to(right, { x: -distance, rotation: -14, scale: 0.94, duration, ease: "power2.inOut" }, label);

  tl.set(left, { zIndex: 1 }, label + `+=${duration * 0.5}`);
  tl.set(right, { zIndex: 2 }, label + `+=${duration * 0.5}`);

  const settleStart = duration * 0.85;
  tl.to(right, { ...FRONT, duration: duration * 0.75, ease: "power3.out" }, label + `+=${settleStart}`);
  tl.to(left, { ...backPos, duration: duration * 0.75, ease: "power3.out" }, label + `+=${settleStart}`);
}

export default function Cards() {
  const card1 = useRef(null);
  const card2 = useRef(null);
  const result = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const a = card1.current;
    const b = card2.current;
    const r = result.current;
    const prog = progressRef.current;
    const txt = textRef.current;

    gsap.set(a, { ...FRONT, zIndex: 2 });
    gsap.set(b, { ...BACK, zIndex: 1 });
    gsap.set(r, { clipPath: "circle(0% at 50% 50%)", zIndex: 3, opacity: 0 });
    gsap.set(prog, { scaleX: 0, transformOrigin: "left" });
    gsap.set(txt, { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    // Shuffle 1: widest + slowest — glow intensifies
    tl.call(() => { if (txt) txt.textContent = "Analyzing..."; });
    tl.fromTo(txt, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    addSwap(tl, a, b, { ...BACK, rotation: 12 }, "c1", 120, 0.8);
    tl.to(a, { boxShadow: "0 4px 25px rgba(107,88,255,0.15)", duration: 0.4 }, "c1");
    tl.to(b, { boxShadow: "0 4px 25px rgba(107,88,255,0.15)", duration: 0.4 }, "c1");
    tl.to(prog, { scaleX: 0.33, duration: 0.8, ease: "power1.inOut" }, "c1");

    // Shuffle 2: tighter + faster
    tl.to(txt, { y: 10, opacity: 0, duration: 0.2, ease: "power2.in" });
    tl.call(() => { if (txt) txt.textContent = "Processing..."; });
    tl.fromTo(txt, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    addSwap(tl, b, a, BACK, "c2", 90, 0.65);
    tl.to(a, { boxShadow: "0 4px 30px rgba(107,88,255,0.25)", duration: 0.4 }, "c2");
    tl.to(b, { boxShadow: "0 4px 30px rgba(107,88,255,0.25)", duration: 0.4 }, "c2");
    tl.to(prog, { scaleX: 0.66, duration: 0.65, ease: "power1.inOut" }, "c2");

    // Shuffle 3: tightest + fastest
    tl.to(txt, { y: 10, opacity: 0, duration: 0.2, ease: "power2.in" });
    tl.call(() => { if (txt) txt.textContent = "Almost done..."; });
    tl.fromTo(txt, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    addSwap(tl, a, b, { ...BACK, rotation: 12 }, "c3", 60, 0.5);
    tl.to(a, { boxShadow: "0 4px 35px rgba(107,88,255,0.35)", duration: 0.4 }, "c3");
    tl.to(b, { boxShadow: "0 4px 35px rgba(107,88,255,0.35)", duration: 0.4 }, "c3");
    tl.to(prog, { scaleX: 1, duration: 0.5, ease: "power1.inOut" }, "c3");

    // === Merge ===
    tl.addLabel("merge", "+=0.5");
    tl.to(txt, { y: 10, opacity: 0, duration: 0.2, ease: "power2.in" });
    tl.call(() => { if (txt) txt.textContent = "Done!"; });
    tl.fromTo(txt, { y: -10, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(3)" });

    // Cards move to center
    tl.to(a, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5, ease: "power3.inOut" }, "merge");
    tl.to(b, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5, ease: "power3.inOut" }, "merge");
    tl.set(a, { zIndex: 2 }, "merge");

    // Result reveals with clipPath
    tl.set(r, { opacity: 1 }, "merge+=0.25");
    tl.to(r, { clipPath: "circle(75% at 50% 50%)", duration: 0.7, ease: "power3.out" }, "merge+=0.25");

    // Cards fade
    tl.to(a, { opacity: 0, duration: 0.4, ease: "power3.out" }, "merge+=0.4");
    tl.to(b, { opacity: 0, duration: 0.4, ease: "power3.out" }, "merge+=0.4");

    // Result settles from 0.97
    tl.fromTo(r, { scale: 0.97 }, { scale: 1, duration: 0.4, ease: "power3.out" }, "merge+=0.6");

    // Reset glow on hidden cards
    tl.set(a, { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }, "merge+=0.8");
    tl.set(b, { boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }, "merge+=0.8");

    // Hold
    tl.to(r, { duration: 1.5 });

    // Fade text + progress
    tl.to(txt, { opacity: 0, duration: 0.3, ease: "power2.out" });

    // === Reset ===
    tl.set(b, { ...BACK, opacity: 1, zIndex: 1 });
    tl.set(a, { ...FRONT, opacity: 1, zIndex: 2 });
    tl.set(r, { clipPath: "circle(0% at 50% 50%)", opacity: 0, scale: 1 });
    tl.set(prog, { scaleX: 0 });

    return () => tl.kill();
  }, []);

  const cardStyle = {
    position: "absolute",
    top: 0, left: 0,
    width: 200,
    height: 270,
    borderRadius: 16,
    padding: 6,
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
    willChange: "transform, clip-path",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
    display: "block",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ position: "relative", width: 200, height: 270 }}>
        <div ref={card1} style={cardStyle}>
          <img src="/green1.jpg" alt="Card 1" style={imgStyle} />
        </div>
        <div ref={card2} style={cardStyle}>
          <img src="/fruit.jpg" alt="Card 2" style={imgStyle} />
        </div>
        <div ref={result} style={{ ...cardStyle, opacity: 0 }}>
          <img src="/green2.jpg" alt="Result" style={imgStyle} />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, height: 3, backgroundColor: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}>
        <div
          ref={progressRef}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#6B58FF",
            borderRadius: 2,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Status text */}
      <span
        ref={textRef}
        style={{ fontSize: 12, color: "#9ca3af", opacity: 0 }}
      />
    </div>
  );
}
