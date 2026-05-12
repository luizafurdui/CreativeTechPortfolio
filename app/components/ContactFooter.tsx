"use client";

const X_URL = "https://x.com/luizafurdui";
const INSTAGRAM_URL = "https://www.instagram.com/luiza_frd/";
const LINKEDIN_URL = "https://www.linkedin.com/in/furdui-luiza/";
const GITHUB_URL = "https://github.com/luizafurdui";

export default function ContactFooter() {
  return (
    <section
      id="contact"
      className="sticky bottom-0 z-0 w-full bg-[#131210] px-8 py-16 sm:px-16"
    >
      <div className="mx-auto max-w-300">
        <div className="rounded-2xl border border-neutral-700 p-0.75">
          <div
            className="w-full rounded-xl bg-linear-to-br from-[#131310] to-[#1E1D1C] px-10 py-12 sm:px-14"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-sm text-[#DEEAFF]">
                <h2
                  className="text-3xl tracking-tight sm:text-4xl"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Want to reach out?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#DEEAFF]/80 sm:text-base">
                  I&apos;m most active on{" "}
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DEEAFF] underline underline-offset-4 decoration-[#DEEAFF]/40 hover:decoration-[#DEEAFF]"
                  >
                    Twitter
                  </a>
                  , so feel free to reach out there. See some of my early
                  digital art and the beginnings of my creative journey on{" "}
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

              <div className="flex gap-12 text-base lg:items-start">
                <div className="flex flex-col gap-3">
                  <a
                    href={X_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-white"
                  >
                    X/Twitter
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-white"
                  >
                    Instagram
                  </a>
                </div>

                <div className="flex flex-col">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 transition-colors hover:text-white"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
