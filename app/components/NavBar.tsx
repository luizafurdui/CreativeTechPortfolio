  "use client";

  import { AnimatePresence, motion } from "framer-motion";

  export default function Navbar({
    inWork,
    activeWorkId,
    activeWorkLabel,
  }: {
    inWork: boolean;
    activeWorkId: string | null;
    activeWorkLabel: string | null;
  }) {
    const visible = Boolean(inWork && activeWorkId && activeWorkLabel);

    return (
      <header className="sticky top-0 z-50 relative">
        <nav className=" flex justify-center text-blue-600 text-sm font-medium py-4">
          <div className="flex space-x-6">
            <button className="nav-button text-blue-600/70 hover:text-blue-700">Home</button>
            <button className="nav-button text-blue-600/70 hover:text-blue-700">About</button>
            <button className="nav-button text-blue-600/70 hover:text-blue-700">Projects</button>
            <button className="nav-button text-blue-600/70 hover:text-blue-700">Contact</button>
          </div>
        </nav>

        <AnimatePresence>
          {visible && (
            <motion.div
              key="work-bar"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full bg-transparent flex justify-center py-3"
            >
              <motion.button
                onClick={() => {
                  document.getElementById(activeWorkId!)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="group relative inline-flex w-auto overflow-hidden rounded-xl border px-4 py-2 text-xs text-blue-600
                          border-blue-600/20 bg-blue-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ willChange: "transform" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeWorkLabel!}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 whitespace-nowrap"
                  >
                    {activeWorkLabel}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }
