"use client";

import ColorPane from "./ColorPane";
import {
  Alignment,
  Fit,
  Layout,
  decodeImage,
  useRive,
  useViewModel,
  useViewModelInstance,
  useViewModelInstanceBoolean,
  useViewModelInstanceImage,
} from "@rive-app/react-canvas";

const colorAssets = {
  white: {
    light: "/rive/images/white.png",
    dark: "/rive/images/whiteDark.png",
  },
  pink: {
    light: "/rive/images/pink.png",
    dark: "/rive/images/pinkDark.png",
  },
  green: {
    light: "/rive/images/green.png",
    dark: "/rive/images/greenDark.png",
  },
  maroon: {
    light: "/rive/images/maroon.png",
    dark: "/rive/images/maroonDark.png",
  },
  yellow: {
    light: "/rive/images/yellow.png",
    dark: "/rive/images/yellowDark.png",
  },
};
export default function BuildingHeroRive() {
  const { rive, RiveComponent } = useRive({
    src: "/rive/buildings.riv",
    artboard: "desktop",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.CenterLeft,
    }),
  });

  const viewModel = useViewModel(rive, { useDefault: true });

  const viewModelInstance = useViewModelInstance(viewModel, {
    useDefault: true,
    rive,
  });

  const { value: isDark } = useViewModelInstanceBoolean(
    "isDark",
    viewModelInstance,
  );

  const { setValue: setLightImage } = useViewModelInstanceImage(
    "light",
    viewModelInstance,
  );

  const { setValue: setDarkImage } = useViewModelInstanceImage(
    "dark",
    viewModelInstance,
  );

  const dark = Boolean(isDark);

  async function loadRiveImage(path: string) {
    const response = await fetch(path);
    const imageBuffer = await response.arrayBuffer();
    return decodeImage(new Uint8Array(imageBuffer));
  }

  async function handleColorChange(colorName: keyof typeof colorAssets) {
    const selected = colorAssets[colorName];

    const lightImage = await loadRiveImage(selected.light);
    const darkImage = await loadRiveImage(selected.dark);

    setLightImage?.(lightImage);
    setDarkImage?.(darkImage);

    lightImage.unref();
    darkImage.unref();
  }

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ease-out ${
        dark ? "bg-black text-white" : "bg-white text-neutral-950"
      }`}
    >
      <div className="relative h-screen w-full overflow-hidden">
        <RiveComponent className="absolute inset-0 h-full w-full origin-left scale-[1.18]" />

        <div className="absolute left-[37%] top-1/2 z-20 w-72 -translate-y-1/2">
          <ColorPane dark={dark} onColorChange={handleColorChange} />
        </div>
      </div>
    </section>
  );
}