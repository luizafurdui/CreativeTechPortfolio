"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

export default function AgentsPage() {
  const { RiveComponent } = useRive({
    src: "/rive/agents.riv",
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
