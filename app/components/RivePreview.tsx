"use client";

import { useEffect, useRef } from "react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

type FitMode = "contain" | "cover" | "fill" | "fitWidth" | "fitHeight";

type Props = {
  src?: string;
  artboard?: string;
  stateMachines?: string;
  fit?: FitMode;
};

const FIT_MAP: Record<FitMode, Fit> = {
  contain: Fit.Contain,
  cover: Fit.Cover,
  fill: Fit.Fill,
  fitWidth: Fit.FitWidth,
  fitHeight: Fit.FitHeight,
};

export default function RivePreview({
  src = "/rive/running_agents.riv",
  artboard,
  stateMachines,
  fit = "cover",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rive, RiveComponent } = useRive({
    src,
    artboard,
    stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: FIT_MAP[fit],
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (!rive) return;
    const handleResize = () => {
      rive.resizeDrawingSurfaceToCanvas();
    };
    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [rive]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <RiveComponent className="h-full w-full" />
    </div>
  );
}
