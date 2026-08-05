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
        className="group fixed right-4 bottom-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/70 text-black shadow-lg transition-all hover:scale-110 hover:bg-white/80 focus:outline-none active:scale-95 dark:border-white/12 dark:bg-black/33 dark:text-white dark:hover:bg-white/10"
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
        <div className="visible absolute -right-1 bottom-10 flex translate-y-2 flex-col items-end opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-300">
          <div className="flex items-center gap-2 rounded-full border border-white/25 bg-white/70 px-3 py-2 text-[10px] whitespace-nowrap text-black shadow-lg dark:border-white/12 dark:bg-black/33 dark:text-white">
            Tech Stack
            <span className="float-end inline-grid w-fit place-items-center rounded-lg border border-white/25 bg-white/40 px-2 py-1 font-mono dark:border-white/12 dark:bg-white/10">
              I
            </span>
          </div>
          <div className="mr-5 h-2 w-2 -translate-y-1 rotate-45 rounded-br-sm border-r border-b border-white/25 bg-white/70 shadow-lg dark:border-white/12 dark:bg-black/33"></div>
        </div>
      </button>

      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-200 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            className={`w-full max-w-sm rounded-[2rem] border border-white/25 bg-white/70 p-6 shadow-2xl backdrop-blur-3xl transition-all duration-200 dark:border-white/12 dark:bg-black/33 ${
              isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Tech Stack
              </h2>
              <button
                onClick={handleClose}
                className="cursor-pointer rounded-full p-1 text-black transition-all hover:bg-black/10 active:scale-95 dark:text-white dark:hover:bg-white/10"
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
                  className="flex items-center justify-between rounded-xl border border-white/25 bg-white/40 p-3 transition-all duration-200 ease-out hover:bg-white/60 dark:border-white/12 dark:bg-white/10 dark:hover:bg-white/15"
                >
                  <span className="font-semibold text-black dark:text-white">
                    {item.name}
                  </span>
                  <span className="rounded-full bg-black/10 px-2 py-1 text-xs font-medium text-black/70 dark:bg-white/10 dark:text-white/70">
                    {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <p className="text-xs text-black/50 dark:text-white/50">
                Built with ❤️ by Mateo
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
