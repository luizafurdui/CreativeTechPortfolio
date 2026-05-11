"use client";

import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import WeatherWidget from "../../components/widgets/w1/w1";

export default function W1Page() {
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
      <WeatherWidget />
    </main>
  );
}
