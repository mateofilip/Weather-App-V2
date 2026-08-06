import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface StackInfoProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StackInfo({ open, onOpenChange }: StackInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [open]);

  const handleClose = () => {
    if (open !== undefined) {
      onOpenChange?.(false);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const stack = [
    { name: "Astro", description: "Web Framework" },
    { name: "Tailwind CSS", description: "Styling" },
    { name: "Vercel", description: "Deployment" },
    { name: "OpenRunde", description: "Typography" },
    { name: "OpenWeatherMap", description: "Weather Data" },
  ];

  return (
    <>
      <button
        onClick={() => {
          open !== undefined ? onOpenChange?.(true) : setIsOpen(true);
        }}
        className="glass-chip text-ink focus:ring-ink/20 fixed right-4 bottom-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-out focus:ring-2 focus:outline-none"
        aria-label="View Tech Stack"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              ref={modalRef}
              className="glass-surface w-full max-w-sm rounded-3xl p-6"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-ink text-xl font-bold">Tech Stack</h2>
                <button
                  onClick={handleClose}
                  className="text-ink/40 hover:text-ink/60 cursor-pointer p-1 transition-colors duration-200 ease-out active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="currentColor"
                  >
                    <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-3">
                {stack.map((item) => (
                  <li
                    key={item.name}
                    className="glass-chip flex items-center justify-between rounded-xl p-3 transition-all duration-200 ease-out"
                  >
                    <span className="text-ink font-semibold">{item.name}</span>
                    <span className="bg-ink/10 text-ink/70 rounded-full px-2 py-1 text-xs font-medium">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <p className="text-ink/50 text-xs">Built with ❤️ by Mateo</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
