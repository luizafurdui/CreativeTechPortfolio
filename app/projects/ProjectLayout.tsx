"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  demo?: ReactNode;
  children?: ReactNode;
};

export default function ProjectLayout({
  title,
  subtitle,
  demo,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-20">
      {/* TEXT CONTAINER */}
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-white/70 text-lg">{subtitle}</p>
          )}
        </header>
      </div>

      {/* DEMO CONTAINER */}
      {demo && (
        <section className="mx-auto max-w-[1200px]">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="h-[520px] lg:h-[680px] flex items-center justify-center">
              {demo}
            </div>
          </div>
        </section>
      )}

      {/* EXTRA CONTENT */}
      {children && (
        <section className="mx-auto mt-16 max-w-5xl">
          {children}
        </section>
      )}
    </main>
  );
}
