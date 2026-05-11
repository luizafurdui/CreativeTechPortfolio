"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "./components/NavBar";
import ProjectCard from "./components/ProjectCard";
import ContactFooter from "./components/ContactFooter";
import RivePreview from "./components/RivePreview";
import { workSections } from "./data/workSections";

type VisibleSection = { id: string; ratio: number };

const INITIAL_VISIBLE = 5;


export default function Page() {
  const [activeWorkSection, setActiveWorkSection] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const { ref: workRef, inView: inWork } = useInView({
    threshold: 0,
    rootMargin: "-20% 0px -70% 0px",
    triggerOnce: false,
  });

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!inWork) {
      setActiveWorkSection(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        let mostVisible: VisibleSection | undefined;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio ?? 0;

          if (!mostVisible || ratio > mostVisible.ratio) {
            mostVisible = { id: el.id, ratio };
          }
        }

        if (mostVisible && mostVisible.ratio > 0.15) {
          setActiveWorkSection((prev) =>
            prev === mostVisible!.id ? prev : mostVisible!.id
          );
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.5, 0.7],
        rootMargin: "-100px 0px -50% 0px",
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [inWork]);

  const activeWorkLabel = useMemo(() => {
    if (!inWork) return null;
    if (!activeWorkSection) return null;
    return workSections.find((s) => s.id === activeWorkSection)?.buttonLabel ?? null;
  }, [inWork, activeWorkSection]);

  return (
    <div className="relative w-full min-h-screen text-neutral-100 bg-[#131210]">
      <Navbar
        inWork={inWork}
        activeWorkId={activeWorkSection}
        activeWorkLabel={activeWorkLabel}
      />

      <section
        id="home"
        className="sticky top-0 z-0 flex h-screen items-center px-8 sm:px-16"
      >
        <div className="max-w-300 mx-auto flex h-full w-full items-center">
          <div className="h-3/4 w-full max-w-2xl">
            <RivePreview
              src="/rive/aboutme.riv"
              artboard="Artboard"
              fit="contain"
            />
          </div>
        </div>
      </section>

      <main
        id="work"
        ref={workRef}
        className="relative z-10 w-full bg-[#131210]"
      >
        <section className="px-8 pt-16 pb-20 sm:px-16">
          <div className="max-w-300 mx-auto">
            {workSections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  delay: index === 0 ? 0.15 : 0,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mb-32 min-h-[80vh]"
              >
                <div>
                  <div
                    className={`grid grid-flow-dense grid-cols-1 gap-0.75 ${
                      section.id === "rive"
                        ? "auto-rows-[60px] sm:grid-cols-2 lg:grid-cols-2"
                        : "auto-rows-[80px] sm:grid-cols-2 lg:grid-cols-6"
                    }`}
                  >
                    <AnimatePresence initial={false} mode="popLayout">
                      {section.projects
                        .slice(0, showAll ? section.projects.length : INITIAL_VISIBLE)
                        .map((project, i) => {
                          const size = project.size || "default";
                          const sizeRowSpan = {
                            short: "row-span-3",
                            default: "row-span-4",
                            tall: "row-span-6",
                            xl: "row-span-7",
                            "2xl": "row-span-9",
                          }[size];
                          const rowSpanClass =
                            section.id === "interactive"
                              ? "row-span-5"
                              : sizeRowSpan;
                          const colSpanMap: Record<number, string> = {
                            2: "lg:col-span-2",
                            3: "lg:col-span-3",
                            4: "lg:col-span-4",
                            5: "lg:col-span-5",
                            6: "lg:col-span-6",
                          };
                          const colSpanClass =
                            section.id === "interactive"
                              ? i < 3
                                ? "lg:col-span-2"
                                : "lg:col-span-3"
                              : project.cols
                                ? colSpanMap[project.cols] ?? ""
                                : "";

                          return (
                            <motion.div
                              layout
                              key={`${section.id}-${project.slug}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                opacity: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                                layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
                              }}
                              className={`${rowSpanClass} ${colSpanClass}`}
                            >
                              <div className="h-full w-full rounded-2xl border border-neutral-700 bg-linear-to-br from-[#131210] to-[#1C1C1A] p-0.75">
                                <ProjectCard
                                  title={project.title}
                                  slug={project.slug}
                                  image={project.image}
                                  video={project.video}
                                  index={i}
                                  hasRive={project.hasRive}
                                  riveSrc={project.riveSrc}
                                  riveArtboard={project.riveArtboard}
                                  riveStateMachine={project.riveStateMachine}
                                  riveFit={project.riveFit}
                                  framerComponentKey={project.framerComponentKey}
                                  date={project.date}
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                    </AnimatePresence>
                  </div>
                </div>

                {section.projects.length > INITIAL_VISIBLE && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowAll((v) => !v)}
                      className="text-sm lowercase tracking-tight text-blue-600 hover:text-blue-700 transition-colors cursor-pointer font-mono"
                    >
                      {showAll ? "Show less" : "See more"}
                    </button>
                  </div>
                )}
              </motion.section>
            ))}
          </div>
        </section>
      </main>

      <ContactFooter />
    </div>
  );
}
