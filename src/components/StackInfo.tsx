import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";

interface StackInfoProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function StackInfo({ open, onOpenChange }: StackInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (open !== undefined) {
      onOpenChange?.(false);
    } else {
      setIsOpen(false);
    }
  };

  const { dialogRef, dialogProps } = useDialog(isOpen, handleClose, "Tech stack");

  useEffect(() => {
    if (open !== undefined) {
      if (open) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [open]);

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
  }, [isOpen, handleClose]);

  const stack = [
    { name: "Astro", description: "Web Framework" },
    { name: "Tailwind CSS", description: "Styling" },
    { name: "Vercel", description: "Deployment" },
    { name: "OpenRunde", description: "Typography" },
    { name: "OpenWeatherMap", description: "Weather Data" },
  ];

  return (
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
            {...dialogProps}
            ref={(el) => {
              dialogRef.current = el;
              modalRef.current = el;
            }}
            className="glass-surface w-full max-w-sm rounded-3xl p-6 focus:outline-none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-ink text-xl font-bold">Tech Stack</h2>
              <button
                onClick={handleClose}
                aria-label="Close"
                className="hover:text-ink cursor-pointer rounded-full p-1 text-neutral-500 transition-colors duration-200 ease-out active:scale-95 focus-visible:ring-ink/30 focus-visible:ring-2 focus-visible:outline-none"
              >
                <X className="h-5 w-5" />
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
  );
}
