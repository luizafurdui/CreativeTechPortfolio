"use client";

import { motion } from "framer-motion";

type ProfileButtonProps = {
  onClick?: () => void;
};

export default function ProfileButton({ onClick }: ProfileButtonProps) {
  return (
    <motion.button
      layoutId="wrapper"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
      className="group relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#e9e9e9] shadow-2xl"
    >
      <div className="flex h-[76%] w-[76%] items-center justify-center rounded-2xl border-2 border-black bg-radial from-[#2a2a2a] via-[#171717] to-[#101010] shadow-inner">
        <img
          src="/cloud-notif.svg"
          alt=""
          width={32}
          height={32}
        />
      </div>
    </motion.button>
  );
}
