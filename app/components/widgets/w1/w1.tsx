"use client";

import { motion } from "framer-motion";

type WeatherWidgetProps = {
  temperature?: number
  feelsLike?: number
  city?: string
  rainInHours?: number
}

const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

export default function WeatherWidget({
  temperature = 26,
  feelsLike = 20,
  city = "London",
  rainInHours = 2,
}: WeatherWidgetProps) {
  return (
    <motion.div
      layoutId="wrapper"
      transition={{ type: "spring", duration: 0.55, bounce: 0.35 }}
      className="rounded-[41px] bg-linear-to-b from-white to-[#CECECE] p-2.5 shadow-2xl"
    >
      <div className="relative w-85 rounded-[34px] border border-black bg-linear-to-b from-[#343434] to-[#151515] p-8.5 shadow-2xl">
        <motion.div
          className="space-y-1 leading-none tracking-tighter"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-4xl font-semibold text-left [&>span]:block">
            <span className="text-white">
              {temperature}° <span className="text-[#6f6f6f]">now</span>
            </span>
            <span className="text-[#6f6f6f]">
              in <span className="text-[#19ff54]">{city}</span>
            </span>
            <span className="text-[#6f6f6f]">
              feels <span className="text-white">{feelsLike}°</span>
            </span>
          </motion.p>

          <motion.p variants={itemVariants} className="mt-4 flex items-center gap-2.5 text-3xl font-semibold">
            <svg
              width={36}
              height={36}
              viewBox="0 0 24 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 shrink-0"
            >
              <motion.g
                animate={{ scale: [1, 1, 1.2, 0.92, 1.05, 1] }}
                transition={{
                  times: [0, 0.6, 0.74, 0.85, 0.93, 1],
                  duration: 1.3,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                style={{
                  transformBox: "view-box",
                  transformOrigin: "50% 50%",
                }}
              >
                <motion.path
                  d="M21.8999 13.46C22.1699 15.13 21.6999 16.92 20.2699 18.18C19.2799 19.09 17.9799 19.59 16.6299 19.58H5.53994C0.869942 19.24 0.859942 12.44 5.53994 12.1H5.58994C3.39994 5.96998 9.08994 2.36998 13.3799 3.74998"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                />
                <motion.path
                  d="M7.25984 12.51C6.73984 12.25 6.16984 12.11 5.58984 12.1"
                  stroke="white"
                  strokeWidth={1.5}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                />
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                  style={{
                    transformBox: "view-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <motion.path
                    d="M21.9702 8C21.9702 9.1 21.4602 10.09 20.6502 10.73C20.0602 11.21 19.2902 11.5 18.4702 11.5C16.5402 11.5 14.9702 9.93 14.9702 8C14.9702 7.04 15.3602 6.17 16.0002 5.54V5.53C16.6302 4.89 17.5102 4.5 18.4702 4.5C20.4002 4.5 21.9702 6.07 21.9702 8Z"
                    stroke="white"
                    strokeWidth={1.5}
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
                  />
                </motion.g>
              </motion.g>
            </svg>
            <span className="text-white">rain</span>
            <span className="text-[#5f5f5f]">coming</span>
          </motion.p>

          <motion.p variants={itemVariants} className="text-left text-4xl font-semibold text-[#6f6f6f]">
            within <span className="text-white">{rainInHours}h</span>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
