"use client";

import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import DynamicIslandStarter from "../../components/DynamicIsland/timerView";

export default function DynamicIslandPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <main
      className={`min-h-screen px-8 py-20 transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold">Dynamic Island</h1>
          <p
            className={`mt-3 text-lg ${
              isLight ? "text-black/70" : "text-white/70"
            }`}
          >
            iOS Dynamic Island with morphing pill states.
          </p>
        </header>
      </div>

      <section className="mx-auto max-w-300">
        <div className="mb-3 flex justify-end">
          <ThemeToggle />
        </div>
        <div
          className={`relative rounded-2xl border p-8 transition-colors ${
            isLight
              ? "border-black/10 bg-black/5"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="flex h-80 items-center justify-center lg:h-100">
            <DynamicIslandStarter />
          </div>
        </div>
      </section>
    </main>
  );
}
