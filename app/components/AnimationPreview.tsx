// components/AnimationPreview.tsx
"use client";
import { Suspense, lazy } from "react";
import RivePreview from "./RivePreview";

type FitMode = "contain" | "cover" | "fill" | "fitWidth" | "fitHeight";

type AnimationPreviewProps = {
  hasRive?: boolean;
  riveSrc?: string;
  riveArtboard?: string;
  riveStateMachine?: string;
  riveFit?: FitMode;
  framerComponentKey?: "feedbackslides" | "qrcode" | "w1" | "shaders" | "animatingMenu" | "dynamicIsland" | "iconsMenu" | "details" | "multistep" | "pagePilot" | "cactusGarden" | "photoStrip";
};

export default function AnimationPreview({
  hasRive,
  riveSrc,
  riveArtboard,
  riveStateMachine,
  riveFit,
  framerComponentKey,
}: AnimationPreviewProps) {
  // Render Rive animation
  if (hasRive) {
    return (
      <RivePreview
        src={riveSrc}
        artboard={riveArtboard}
        stateMachines={riveStateMachine}
        fit={riveFit}
      />
    );
  }

  // Render Framer Motion component
  if (framerComponentKey) {
    let FramerComponent;
    
    // Import based on the key
    switch (framerComponentKey) {
      case "feedbackslides":
        FramerComponent = lazy(() => import("./feedbackslides/feedbackslides"));
        break;
      case "qrcode":
        FramerComponent = lazy(() => import("./qrcode/qrcode"));
        break;
      case "w1":
        FramerComponent = lazy(() => import("./widgets/w1/w1"));
        break;
      case "shaders":
        FramerComponent = lazy(() => import("./shaders/ShaderBackground"));
        break;
      case "animatingMenu":
        FramerComponent = lazy(() => import("./animatingMenu/Menu"));
        break;
      case "dynamicIsland":
        FramerComponent = lazy(() => import("./DynamicIsland/timerView"));
        break;
      case "iconsMenu":
        FramerComponent = lazy(() => import("./IconsMenu/iconsMenu"));
        break;
      case "details":
        FramerComponent = lazy(() => import("./Details/Details"));
        break;
      case "multistep":
        FramerComponent = lazy(() => import("./multistep/multistep"));
        break;
      case "pagePilot":
        FramerComponent = lazy(() => import("./pagePilot/Cards"));
        break;
      case "cactusGarden":
        FramerComponent = lazy(() => import("./CactusGrid"));
        break;
      case "photoStrip":
        FramerComponent = lazy(() => import("./PhotoStrip"));
        break;
      default:
        return null;
    }
    
    return (
      <Suspense 
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-gray-900/50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
          </div>
        }
      >
        <FramerComponent />
      </Suspense>
    );
  }

  return null;
}