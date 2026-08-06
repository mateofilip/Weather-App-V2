import { useState, useEffect, useRef } from "react";

interface StackInfoProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StackInfo({ open, onOpenChange }: StackInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        setIsOpen(true);
      } else {
        setIsAnimating(false);
        setTimeout(() => setIsOpen(false), 200);
      }
    }
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsAnimating(true));
    }
  }, [isOpen]);

  const handleClose = () => {
    if (open !== undefined) {
      setIsAnimating(false);
      setTimeout(() => onOpenChange?.(false), 200);
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsOpen(false), 200);
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
        className="glass-chip fixed right-4 bottom-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-all duration-200 ease-out focus:ring-2 focus:ring-ink/20 focus:outline-none"
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

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-3xl transition-opacity duration-200 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            className={`glass-surface w-full max-w-sm rounded-3xl p-6 transition-all duration-200 ${
              isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">
                Tech Stack
              </h2>
              <button
                onClick={handleClose}
                className="cursor-pointer p-1 text-ink/40 transition-colors duration-200 ease-out hover:text-ink/60 active:scale-95"
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
                  <span className="font-semibold text-ink">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-ink/10 px-2 py-1 text-xs font-medium text-ink/70">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <p className="text-xs text-ink/50">
                Built with ❤️ by Mateo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
