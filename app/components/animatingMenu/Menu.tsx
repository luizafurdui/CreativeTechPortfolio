"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  BellRing,
  Wand2,
  Send,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

type Item = {
  icon: LucideIcon;
  label: string;
  sections: { title: string; items: [string, string][] }[];
};

const items: Item[] = [
  {
    icon: BellRing,
    label: "Notifications",
    sections: [
      {
        title: "Inbox",
        items: [
          ["Alerts", "Important updates from your apps."],
          ["Messages", "Unread conversations."],
        ],
      },
      {
        title: "Reminders",
        items: [
          ["Today", "Things due in the next few hours."],
          ["Scheduled", "Upcoming tasks and follow-ups."],
        ],
      },
    ],
  },
  {
    icon: Wand2,
    label: "Features",
    sections: [
      {
        title: "Core",
        items: [
          ["Dashboard", "Your main workspace."],
          ["Analytics", "Insights at a glance."],
        ],
      },
      {
        title: "Power",
        items: [
          ["Automations", "Run tasks on autopilot."],
          ["Integrations", "Connect your tools."],
        ],
      },
    ],
  },
  {
    icon: Send,
    label: "Contact",
    sections: [
      {
        title: "Support",
        items: [
          ["Help Center", "Browse guides and FAQs."],
          ["Live Chat", "Talk to a real person."],
        ],
      },
      {
        title: "Reach Us",
        items: [
          ["Email", "Drop us a line."],
          ["Office", "Find us in person."],
        ],
      },
    ],
  },
  {
    icon: CreditCard,
    label: "Pricing",
    sections: [
      {
        title: "Plans",
        items: [
          ["Starter", "For getting started."],
          ["Pro", "For growing teams."],
        ],
      },
      {
        title: "Resources",
        items: [
          ["Compare", "Side-by-side breakdown."],
          ["FAQ", "Common pricing questions."],
        ],
      },
    ],
  },
];

export default function FloatingNavigationMenu() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#f3f3f3]">
      <NavigationMenu.Root className="relative flex justify-center">
        <NavigationMenu.List className="flex items-center gap-1 rounded-full border border-white/70 bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
          {items.map(({ icon: Icon, label, sections }) => (
            <NavigationMenu.Item key={label}>
              <NavigationMenu.Trigger className="group flex h-10 items-center rounded-full px-3 outline-none transition-colors duration-200 ease-out hover:bg-neutral-100 data-[state=open]:bg-neutral-100">
                <Icon
                  size={22}
                  strokeWidth={2.25}
                  className="shrink-0 text-neutral-500 transition-colors duration-200 group-hover:text-neutral-900 group-data-[state=open]:text-neutral-900"
                />
                <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]">
                  <span className="min-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-neutral-800">
                    <span className="block pl-2">{label}</span>
                  </span>
                </span>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="absolute left-1/2 top-0 w-105 -translate-x-1/2 animate-in fade-in-0 zoom-in-95 data-[motion=from-end]:slide-in-from-right-4 data-[motion=from-start]:slide-in-from-left-4 data-[motion=to-end]:slide-out-to-right-4 data-[motion=to-start]:slide-out-to-left-4">
                <div className="grid grid-cols-2 gap-5 rounded-[28px] border border-white/70 bg-white/95 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                  {sections.map((section) => (
                    <div key={section.title}>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                        {section.title}
                      </p>
                      <ul className="space-y-1">
                        {section.items.map(([title, description]) => (
                          <ListItem key={title} href="/" title={title}>
                            {description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>

        <div className="absolute left-1/2 -top-3 flex -translate-x-1/2 -translate-y-full justify-center">
          <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-bottom overflow-hidden rounded-[28px] transition-[width,height] duration-300 ease-out data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95" />
        </div>
      </NavigationMenu.Root>
    </div>
  );
}

function ListItem({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <a
          href={href}
          className="block rounded-2xl px-3 py-2 transition hover:bg-neutral-100"
        >
          <div className="text-sm font-medium text-neutral-800">{title}</div>
          <p className="mt-0.5 text-xs leading-5 text-neutral-500">
            {children}
          </p>
        </a>
      </NavigationMenu.Link>
    </li>
  );
}
