"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

export default function CoffeePage() {
  const { RiveComponent } = useRive({
    src: "/rive/coffee.riv",
    artboard: "coffee",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <main className="relative h-screen w-full bg-black">
      <RiveComponent className="absolute inset-0 h-full w-full" />
    </main>
  );
}
