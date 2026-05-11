"use client";

const LINKS = [
  { label: "x/twitter", href: "https://x.com/luizafurdui" },
  { label: "linkedin", href: "https://linkedin.com/in/luizafurdui" },
  { label: "github", href: "https://github.com/luizafurdui" },
  { label: "instagram", href: "https://instagram.com/luizafurdui" },
];

export default function ContactFooter() {
  return (
    <section
      id="contact"
      className="w-full border-t border-neutral-800 bg-[#131210] px-8 py-12 sm:px-16"
    >
      <div className="mx-auto flex max-w-300 flex-col gap-4">
        <p
          className="text-xl lowercase tracking-tight text-neutral-400"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          want to reach out?
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl lowercase tracking-tight text-neutral-200 underline underline-offset-4 transition-colors hover:text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
