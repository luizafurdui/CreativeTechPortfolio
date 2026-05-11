"use client";

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
  const { RiveComponent } = useRive({
    src,
    artboard,
    stateMachines,
    autoplay: true,
    layout: new Layout({
      fit: FIT_MAP[fit],
      alignment: Alignment.Center,
    }),
  });

  return <RiveComponent className="h-full w-full" />;
}
