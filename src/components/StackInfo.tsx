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
        className="fixed right-4 bottom-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-50/25 bg-slate-50/40 text-neutral-950 shadow-sm transition-all hover:bg-slate-50/60 hover:shadow-md focus:ring-2 focus:ring-neutral-950/20 focus:outline-none dark:border-slate-50/10 dark:bg-slate-50/10 dark:text-slate-50 dark:hover:bg-slate-50/20"
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
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/66 p-4 backdrop-blur-3xl transition-opacity duration-200 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            className={`w-full max-w-sm rounded-3xl border border-slate-50/25 bg-slate-50/80 p-6 shadow-sm ring-1 ring-slate-50/30 ring-inset backdrop-blur-xl transition-all duration-200 dark:border-slate-50/10 dark:bg-neutral-950/60 dark:ring-slate-50/10 ${
              isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-950 dark:text-slate-50">
                Tech Stack
              </h2>
              <button
                onClick={handleClose}
                className="cursor-pointer p-1 text-neutral-950/40 transition-colors duration-200 ease-out hover:text-neutral-950/60 active:scale-95 dark:text-slate-50/40 dark:hover:text-slate-50/70"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {stack.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-slate-50/25 bg-slate-50/40 p-3 shadow-sm transition-all duration-200 ease-out hover:bg-slate-50/60 hover:shadow-md dark:border-slate-50/10 dark:bg-slate-50/10 dark:hover:bg-slate-50/20"
                >
                  <span className="font-semibold text-neutral-950 dark:text-slate-50">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-neutral-950/10 px-2 py-1 text-xs font-medium text-neutral-950/70 dark:bg-slate-50/10 dark:text-slate-50/70">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <p className="text-xs text-neutral-950/50 dark:text-slate-50/50">
                Built with ❤️ by Mateo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
