export type CardSize = "2xl" | "xl" | "tall" | "default" | "short";

export type Project = {
  title: string;
  slug: string; 
  description: string;

  tutorial?: boolean;
  tutorialLink?: string;

  image?: string;
  video?: string;

  hasRive?: boolean;
  riveSrc?: string;
  riveArtboard?: string;
  riveStateMachine?: string;
  riveFit?: "contain" | "cover" | "fill" | "fitWidth" | "fitHeight";
  framerComponentKey?: "feedbackslides" | "qrcode" | "w1" | "shaders" | "animatingMenu" | "dynamicIsland" | "iconsMenu" | "details" | "multistep" | "pagePilot" | "cactusGarden";

  date?: string;

  size?: CardSize;
  cols?: 2 | 3 | 4 | 5 | 6;
};

export type WorkSection = {
  id: string;
  title: string;
  buttonLabel: string;
  blurb?: string;
  projects: Project[];
};

export const workSections: WorkSection[] = [
  {
    id: "interactive",
    title: "Interactive Components",
    buttonLabel: "Framer Motion",
    projects: [
      {
        title: "Shaders",
        slug: "shaders",
        description: "Interactive GLSL planet with color-mode morph.",
        framerComponentKey: "shaders",
        video: "/framerMotion/sphereShaders.mp4",
        date: "03.2026",
        size: "tall",
        cols: 2,
      },
      {
        title: "Loading Animation",
        slug: "loading-animation",
        description: "Animated layer reveal with stacked product images.",
        framerComponentKey: "pagePilot",
        video: "/framerMotion/pagePilot.mp4",
        date: "03.2026",
        size: "default",
      },
      {
        title: "Details",
        slug: "details",
        description: "Expandable details button revealing stacked actions.",
        framerComponentKey: "details",
        video: "/framerMotion/createNew.mp4",
        date: "05.2026",
        size: "default",
      },
      {
        title: "Swapping Slides",
        slug: "swapping-slides",
        description: "Draggable review cards with spring snap-back.",
        framerComponentKey: "feedbackslides",
        video: "/framerMotion/draggableCards.mp4",
        date: "04.2026",
        size: "tall",
        cols: 4,
      },
      {
        title: "Icons Menu",
        slug: "icons-menu",
        description: "Hover-driven icon nav with a morphing dropdown panel.",
        framerComponentKey: "iconsMenu",
        video: "/framerMotion/Animatedicons.mp4",
        date: "05.2026",
        size: "short",
      },
      {
        title: "Multistep",
        slug: "multistep",
        description: "Animated multi-step flow with morphing height.",
        framerComponentKey: "multistep",
        video: "/framerMotion/multistep.mp4",
        date: "01.2026",
        size: "short",
      },
      {
        title: "Shake it",
        slug: "shake-it",
        description:
          "Draggable paper envelope with photos that sway with momentum.",
        video: "/framerMotion/envelope.mp4",
        date: "05.2026",
        size: "default",
      },
    ],
  },
  {
    id: "rive",
    title: "Interactive Scenes",
    buttonLabel: "Rive",
    blurb:
      "Rive really clicked with me instantly, becoming one of the tools I enjoy using the most. It’s the perfect blend of design, animation, and code.",
    projects: [
      {
        title: "Buildings",
        slug: "buildings",
        description:
          "Rive building scene with click-driven dark/light mode sync.",
        video: "/framerMotion/buildings.mov",
        date: "05.2026",
        size: "xl",
      },
      {
        title: "Coffee",
        slug: "coffee",
        description: "Rive coffee scene.",
        hasRive: true,
        riveSrc: "/rive/coffee.riv",
        riveArtboard: "coffee",
        riveStateMachine: "State Machine 1",
        riveFit: "contain",
        date: "05.2026",
        size: "2xl",
      },
      {
        title: "2D animation",
        slug: "2d-animation",
        description: "Rive black-and-white scene.",
        hasRive: true,
        riveSrc: "/rive/blackwhite.riv",
        riveArtboard: "MacBook Air - 4",
        riveStateMachine: "State Machine 1",
        date: "05.2026",
        size: "tall",
      },
      {
        title: " Reavealing Garden",
        slug: "reavealing-garden",
        description:
          "Hover-to-reveal cactus field — each sprout grows in and stays.",
        framerComponentKey: "cactusGarden",
        date: "05.2026",
        size: "default",
      },
    ],
  },
];
