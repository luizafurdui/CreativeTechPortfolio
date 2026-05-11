"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimationPreview from "./AnimationPreview";

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

type ProjectCardProps = {
  title: string;
  slug: string;
  image?: string;
  video?: string;
  index?: number;
  hasRive?: boolean;
  riveSrc?: string;
  riveArtboard?: string;
  riveStateMachine?: string;
  riveFit?: "contain" | "cover" | "fill" | "fitWidth" | "fitHeight";
  framerComponentKey?: "feedbackslides" | "qrcode" | "w1" | "shaders" | "animatingMenu" | "dynamicIsland" | "iconsMenu" | "details" | "multistep" | "pagePilot" | "cactusGarden";
  date?: string;
};

export default function ProjectCard({
  title,
  slug,
  image,
  video,
  index = 0,
  hasRive,
  riveSrc,
  riveArtboard,
  riveStateMachine,
  riveFit,
  framerComponentKey,
  date,
}: ProjectCardProps) {
  const router = useRouter();
  const hasAnimation = Boolean((hasRive || framerComponentKey) && !video);

  const handleCardClick = () => {
    router.push(`/projects/${slug}`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={handleCardClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[13px] border border-neutral-600 bg-white"
    >
      {video ? (
        <video
          src={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : hasAnimation ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={
              riveFit === "contain"
                ? "h-full w-14/16"
                : "h-full w-full"
            }
          >
            <AnimationPreview
              hasRive={hasRive}
              riveSrc={riveSrc}
              riveArtboard={riveArtboard}
              riveStateMachine={riveStateMachine}
              riveFit={riveFit}
              framerComponentKey={framerComponentKey}
            />
          </div>
        </div>
      ) : image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-white/5 to-white/10" />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 px-4 py-3 text-sm lowercase tracking-tight text-black"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <span className="truncate font-normal">[ {title} ]</span>
        {date && <span className="shrink-0 text-xs">{date}</span>}
      </div>

      <motion.button
        type="button"
        aria-label={`Open ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white text-black shadow-sm"
      >
        <motion.span
          aria-hidden="true"
          variants={{
            rest: { x: 0, y: 0, opacity: 1 },
            hover: { x: 18, y: -18, opacity: 0 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="absolute inline-flex"
        >
          <ArrowIcon />
        </motion.span>
        <motion.span
          aria-hidden="true"
          variants={{
            rest: { x: -18, y: 18, opacity: 0 },
            hover: { x: 0, y: 0, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="absolute inline-flex"
        >
          <ArrowIcon />
        </motion.span>
      </motion.button>
    </motion.article>
  );
}
