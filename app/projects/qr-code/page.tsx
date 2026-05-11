"use client";

import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../../components/ThemeToggle";
import QrCode from "../../components/qrcode/qrcode";

export default function QrCodePage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <main
      className={`min-h-screen px-8 py-20 transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold">QR Code</h1>
        </header>
      </div>

      <section className="mx-auto max-w-7xl">
        <div className="mb-3 flex justify-end">
          <ThemeToggle />
        </div>
        <div
          className="rounded-2xl p-7.5"
          style={{
            backgroundImage: "url('/bgMacBook.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`overflow-hidden rounded-xl ${
              isLight ? "bg-white" : "bg-black"
            }`}
          >
            <div
              className={`h-8 border-b ${
                isLight
                  ? "bg-white border-black/10"
                  : "bg-linear-to-b from-[#1f1f1f] to-[#141414] border-white/5"
              }`}
            />
            <div
              className={`flex items-center justify-center h-160 ${
                isLight ? "bg-white" : "bg-black"
              }`}
            >
              <QrCode theme={theme} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
