"use client";

const X_URL = "https://x.com/luizafurdui";
const INSTAGRAM_URL = "https://www.instagram.com/luiza_frd/";
const LINKEDIN_URL = "https://www.linkedin.com/in/furdui-luiza/";
const GITHUB_URL = "https://github.com/luizafurdui";

const SOCIALS = [
  { label: "X/Twitter", href: X_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "GitHub", href: GITHUB_URL },
];

export default function ContactFooter() {
  return (
    <section
      id="contact"
      className="sticky bottom-0 z-0 w-full bg-[#131210] px-8 py-16 sm:px-16"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="mx-auto flex max-w-300 flex-col gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="text-5xl leading-[1.05] tracking-tight text-[#DEEAFF] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Want to <br />
            reach out?
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-[#DEEAFF]/80 sm:text-base">
            I&apos;m most active on{" "}
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DEEAFF] underline underline-offset-4 decoration-[#DEEAFF]/40 hover:decoration-[#DEEAFF]"
            >
              Twitter
            </a>
            , so feel free to reach out there. See some of my early digital
            art and the beginnings of my creative journey on{" "}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DEEAFF] underline underline-offset-4 decoration-[#DEEAFF]/40 hover:decoration-[#DEEAFF]"
            >
              Instagram
            </a>
            .
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-2.5 text-sm">
          <div className="flex flex-wrap items-center gap-7.5">
            <div className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.filter((s) => s.label !== "GitHub").map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-neutral-500">© 2026 luiza</p>
        </div>
      </div>
    </section>
  );
}
