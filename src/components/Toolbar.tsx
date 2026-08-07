import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Broom, Check, Ellipsis, Info, Moon, Ship, Sun, X } from "lucide-react";
import type { Unit } from "../lib/units";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const iconButtonClass =
  "text-ink/70 hover:text-ink focus:ring-ink/20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ease-out active:scale-95 focus:ring-2 focus:outline-none sm:h-11 sm:w-11";

export default function Toolbar({
  unit,
  onUnitChange,
  onTimeMachine,
  onStack,
  onClear,
}: {
  unit: Unit;
  onUnitChange: (unit: Unit) => void;
  onTimeMachine: () => void;
  onStack: () => void;
  onClear: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const toolbarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSize({ w: el.offsetWidth, h: el.offsetHeight }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "light" ? "dark" : "light",
    );
    document.body.classList.toggle("dark");
  };

  const toggleUnit = () => {
    const next: Unit = unit === "celsius" ? "fahrenheit" : "celsius";
    localStorage.setItem("unit", next);
    onUnitChange(next);
  };

  const handleClear = () => {
    onClear();
    setCleared(true);
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => setCleared(false), 1200);
  };

  const offset = isDesktop ? { y: 12 } : { x: 12 };
  const enter = { opacity: 0, scale: 0.8, filter: "blur(4px)", ...offset };
  const exit = {
    opacity: 0,
    scale: 0.8,
    filter: "blur(4px)",
    x: offset.x ?? 0,
    y: offset.y ?? 0,
    transition: { duration: 0.15, ease: "easeOut" },
  };

  const actions = [
    {
      key: "stack",
      label: "View tech stack",
      icon: <Info className="h-5 w-5" />,
      onClick: () => {
        setExpanded(false);
        onStack();
      },
    },
    {
      key: "time",
      label: "Open time machine",
      icon: <Ship className="h-5 w-5" />,
      onClick: () => {
        setExpanded(false);
        onTimeMachine();
      },
    },
  ];

  return (
    <div ref={toolbarRef} className="fixed right-4 bottom-4 z-40">
      <motion.div
        initial={false}
        animate={{ width: size.w + 2, height: size.h + 2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="glass-surface relative overflow-hidden rounded-full"
      >
        <div
          ref={contentRef}
          id="utilities-toolbar"
          role="toolbar"
          aria-label="Utilities"
          className="absolute right-0 bottom-0 flex flex-row items-center gap-1 p-1.5 sm:flex-col sm:p-2"
        >
          <AnimatePresence initial={false}>
            {expanded &&
              [
                ...actions.map((action) => (
                  <motion.button
                    key={action.key}
                    type="button"
                    aria-label={action.label}
                    title={action.label}
                    initial={enter}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0, y: 0 }}
                    exit={exit}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={action.onClick}
                    className={iconButtonClass}
                  >
                    {action.icon}
                  </motion.button>
                )),
              <motion.button
                key="clear"
                type="button"
                aria-label="Clear unpinned cities"
                title="Clear unpinned cities"
                initial={enter}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0, y: 0 }}
                exit={exit}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={handleClear}
                className={iconButtonClass}
              >
                <div className="relative h-5 w-5">
                  <AnimatePresence initial={false}>
                    {cleared ? (
                      <motion.span
                        key="check"
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, rotate: 90 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="broom"
                        className="absolute inset-0 grid place-items-center"
                        initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, rotate: -90 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <Broom className="h-5 w-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>,
              <motion.button
                key="unit"
                type="button"
                aria-label={
                  unit === "celsius"
                    ? "Switch to Fahrenheit"
                    : "Switch to Celsius"
                }
                aria-pressed={unit === "fahrenheit"}
                title={
                  unit === "celsius"
                    ? "Switch to Fahrenheit"
                    : "Switch to Celsius"
                }
                initial={enter}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0, y: 0 }}
                exit={exit}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={toggleUnit}
                className={iconButtonClass}
              >
                <div className="relative h-5 w-5">
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={unit}
                      className="absolute inset-0 grid place-items-center text-sm font-semibold tracking-tight"
                      initial={{ opacity: 0, scale: 0.75, filter: "blur(2px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.75, filter: "blur(2px)" }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      {unit === "celsius" ? "°C" : "°F"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.button>,
              <motion.button
                key="theme"
                type="button"
                aria-label="Toggle theme"
                title="Toggle theme"
                initial={enter}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0, y: 0 }}
                exit={exit}
                transition={{ duration: 0.15, ease: "easeOut" }}
                onClick={toggleTheme}
                className={iconButtonClass}
              >
                <div className="relative h-5 w-5">
                  <Sun
                    className={`absolute inset-0 h-full w-full transform transition-all duration-150 ease-out ${
                      isDark
                        ? "scale-0 rotate-180 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                    }`}
                  />
                  <Moon
                    className={`absolute inset-0 h-full w-full transform transition-all duration-150 ease-out ${
                      isDark
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-180 opacity-0"
                    }`}
                  />
                </div>
              </motion.button>,
            ]}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls="utilities-toolbar"
            aria-label={expanded ? "Close toolbar" : "Open toolbar"}
            className={iconButtonClass}
          >
            <div className="relative h-5 w-5">
              <AnimatePresence initial={false}>
                {!expanded && (
                  <motion.span
                    key="open"
                    className="absolute inset-0 grid place-items-center"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <Ellipsis className="h-5 w-5" />
                  </motion.span>
                )}
                {expanded && (
                  <motion.span
                    key="close"
                    className="absolute inset-0 grid place-items-center"
                    initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
