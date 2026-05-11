"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

export default function BlackWhitePage() {
  const { RiveComponent } = useRive({
    src: "/rive/blackwhite.riv",
    artboard: "MacBook Air - 4",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <main className="relative h-screen w-full bg-white">
      <RiveComponent className="absolute inset-0 h-full w-full" />
    </main>
  );
}
