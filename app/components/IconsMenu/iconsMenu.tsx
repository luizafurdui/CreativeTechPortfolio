"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import {
  Box,
  Mail,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const iconVariants = {
  rest: {
    rotate: 0,
    transition: { type: "spring" as const, duration: 1, bounce: 0.85 },
  },
  hover: {
    rotate: [0, 18, -14, 10, -6, 3, 0],
    transition: {
      duration: 0.8,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

function MenuItem({
  label,
  Icon,
  content,
}: {
  label: string;
  Icon: LucideIcon;
  content: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className="group relative flex h-11 items-center overflow-hidden rounded-full px-3 text-neutral-700 outline-none transition-colors duration-200 hover:bg-neutral-100 data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900"
      >
        <motion.span
          variants={iconVariants}
          initial="rest"
          animate={hovered ? "hover" : "rest"}
          className="flex shrink-0 items-center justify-center"
        >
          <Icon size={18} strokeWidth={2} />
        </motion.span>
        <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-data-[state=open]:grid-cols-[1fr]">
          <span className="min-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-neutral-900">
            <span className="block pl-2">{label}</span>
          </span>
        </span>
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="absolute left-1/2 top-0 -translate-x-1/2 duration-200 data-[motion=from-end]:animate-in data-[motion=from-end]:fade-in-0 data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=to-end]:animate-out data-[motion=to-end]:fade-out-0 data-[motion=to-start]:animate-out data-[motion=to-start]:fade-out-0">
        {content}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

type Item = {
  id: string;
  label: string;
  icon: LucideIcon;
  content: ReactNode;
};

const items: Item[] = [
  {
    id: "product",
    label: "Product",
    icon: Box,
    content: (
      <div className="w-72 p-5">
        <h3 className="text-sm font-semibold text-neutral-900">Product</h3>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li>Dashboard</li>
          <li>Analytics</li>
          <li>Notifications</li>
          <li>Search</li>
          <li>Integrations</li>
        </ul>
      </div>
    ),
  },
  {
    id: "features",
    label: "Features",
    icon: Sparkles,
    content: (
      <div className="w-96 p-5">
        <h3 className="text-sm font-semibold text-neutral-900">Features</h3>
        <ul className="mt-3 space-y-3">
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Smooth springs
              </p>
              <p className="text-xs text-neutral-500">
                Spring physics for organic, interruptible motion.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Layout transitions
              </p>
              <p className="text-xs text-neutral-500">
                Auto-animated layouts as content changes.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Reduced motion
              </p>
              <p className="text-xs text-neutral-500">
                Accessible defaults that respect user preferences.
              </p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Composable primitives
              </p>
              <p className="text-xs text-neutral-500">
                Drop-in pieces that fit your existing stack.
              </p>
            </div>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    content: (
      <div className="w-64 p-5">
        <h3 className="text-sm font-semibold text-neutral-900">Contact</h3>
        <p className="mt-1 text-xs text-neutral-500">hello@example.com</p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    content: (
      <div className="grid w-96 grid-cols-2 gap-4 p-5">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Theme</h3>
          <p className="mt-1 text-xs text-neutral-500">Light, dark, or auto.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Motion</h3>
          <p className="mt-1 text-xs text-neutral-500">
            Respect reduced-motion.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Account</h3>
          <p className="mt-1 text-xs text-neutral-500">Profile and sign-in.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">Shortcuts</h3>
          <p className="mt-1 text-xs text-neutral-500">Keyboard bindings.</p>
        </div>
      </div>
    ),
  },
];

export default function IconsMenu() {
  return (
    <div className="flex h-full w-full items-end justify-center rounded-2xl bg-[#f3f3f3] py-16">
      <NavigationMenu.Root className="relative flex justify-center">
        {/* Floating viewport positioned ABOVE the pill with a clear gap — outer wrapper gives the layered look, hidden until a panel opens */}
        <div className="absolute left-1/2 -top-6 flex -translate-x-1/2 -translate-y-full justify-center">
          <div className="rounded-[25px] border border-neutral-300 bg-white/60 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.06)] transition-opacity duration-200 not-has-data-[state=open]:pointer-events-none not-has-data-[state=open]:opacity-0">
            <NavigationMenu.Viewport
              className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-bottom overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-[width,height] duration-300 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
            />
          </div>
        </div>

        <NavigationMenu.List className="flex items-center gap-1 rounded-full border border-black/5 bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
          {items.map(({ id, label, icon: Icon, content }) => (
            <MenuItem
              key={id}
              label={label}
              Icon={Icon}
              content={content}
            />
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}
