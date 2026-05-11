"use client";

import Scene from "../../components/shaders/ShaderBackground";
import ThemeToggle from "../../components/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

export default function ShadersPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <main
      className={`relative flex min-h-screen items-center justify-center transition-colors duration-300 ${
        isLight ? "bg-[#f3f3f3]" : "bg-black"
      }`}
    >
      <div className="absolute right-6 top-6 z-10">
        <ThemeToggle />
      </div>
      <Scene />
    </main>
  );
}
