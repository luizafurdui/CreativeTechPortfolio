"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { QRCodeSVG } from "qrcode.react";
import "./qrcode.css";

export default function QrCode({ value = "https://luiza.dev", theme = "dark" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="qr-component" data-theme={theme}>
      <div className="qr-wrapper">
        <motion.button
          layoutId="qr-shell"
          onClick={() => setOpen(true)}
          key="button"
          className="qr-button"
          style={{ borderRadius: 9999 }}
        >
          <motion.span
            className="qr-button-label"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          >
            <svg
              className="qr-button-icon"
              width="20"
              height="20"
              viewBox="0 -0.5 25 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" />
              <path d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" />
              <path d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" />
              <path d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" />
            </svg>
            Show QR Code
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={ref}
              layoutId="qr-shell"
              className="qr-popover"
              style={{ borderRadius: 20 }}
            >
              <motion.div
                key="body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="qr-popover-body"
              >
                <div className="qr-code-frame">
                  <QRCodeSVG
                    value={value}
                    size={240}
                    bgColor="transparent"
                    fgColor="currentColor"
                    level="M"
                  />
                </div>

                <div className="qr-actions">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="qr-action qr-action-primary"
                  >
                    <svg
                      className="qr-action-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.99 17.5H16.5C19.52 17.5 22 15.03 22 12C22 8.98 19.53 6.5 16.5 6.5H14.99" />
                      <path d="M9 6.5H7.5C4.47 6.5 2 8.97 2 12C2 15.02 4.47 17.5 7.5 17.5H9" />
                      <path d="M8 12H16" />
                    </svg>
                    {copied ? "Copied" : "Copy QR Code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="qr-close-btn"
                    aria-label="Close"
                  >
                    <svg
                      className="qr-close-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 12H18" />
                      <path d="M12 18V6" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
