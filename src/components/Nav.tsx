import { useState, useEffect, useRef } from "react";
import { Image } from "@lonik/oh-image/react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Sun, Moon, MapPin } from "lucide-react";
import type { CitySuggestion } from "../types/CitySuggestion";

const apiKey = import.meta.env.PUBLIC_API_KEY as string;

type SuggestionStatus = "idle" | "loading" | "success" | "error";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string, coords?: { lat: number; lon: number }) => void;
}) {
  const [city, setCity] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [status, setStatus] = useState<SuggestionStatus>("idle");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const query = city.trim();
    if (query.length < 2) {
      setSuggestions([]);
      setStatus("idle");
      setOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    setStatus("loading");
    setOpen(true);
    setHighlightedIndex(-1);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as Array<{
          name?: string;
          state?: string;
          country?: string;
          lat?: number;
          lon?: number;
        }>;
        setSuggestions(
          data
            .filter((c) => c.name && c.lat !== undefined && c.lon !== undefined)
            .map((c) => ({
              name: c.name as string,
              state: c.state,
              country: c.country ?? "",
              lat: c.lat as number,
              lon: c.lon as number,
            })),
        );
        setStatus("success");
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
          setStatus("error");
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [city]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "light" ? "dark" : "light",
    );
    document.body.classList.toggle("dark");
  };

  function selectSuggestion(suggestion: CitySuggestion) {
    onSearch(suggestion.name, { lat: suggestion.lat, lon: suggestion.lon });
    setCity("");
    setSuggestions([]);
    setStatus("idle");
    setOpen(false);
    setHighlightedIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      if (suggestions.length > 0) {
        setHighlightedIndex((i) => (i + 1) % suggestions.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setHighlightedIndex(
          (i) => (i - 1 + suggestions.length) % suggestions.length,
        );
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    } else if (e.key === "Enter") {
      const highlighted =
        highlightedIndex >= 0 ? suggestions[highlightedIndex] : undefined;
      if (highlighted) {
        e.preventDefault();
        selectSuggestion(highlighted);
      }
    }
  }

  const showDropdown = open && status !== "idle";

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDropdownHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [showDropdown]);

  useEffect(() => {
    if (!showDropdown) setDropdownHeight(0);
  }, [showDropdown]);

  return (
    <nav className="glass-surface glass-surface-hover sticky top-6 z-50 mx-auto mb-8 flex w-fit max-w-4xl items-center justify-between gap-6 rounded-full p-2 transition-all duration-200 ease-out sm:gap-10 sm:p-2.5">
      {/* Logo Section */}
      <div className="flex items-center gap-2 pl-2">
        <Image
          src="/icons/navicon.avif"
          alt="Weather App Icon"
          className="h-5 w-5 object-contain sm:h-6 sm:w-6"
          width={1024}
          height={1024}
          priority
        />

        <h1 className="text-ink hidden text-lg font-bold tracking-tight sm:block sm:text-xl">
          Weather<span className="text-accent">App</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search Section */}
        <form
          ref={formRef}
          action="."
          onSubmit={(e) => {
            e.preventDefault();
            const highlighted =
              highlightedIndex >= 0 ? suggestions[highlightedIndex] : undefined;
            if (highlighted) {
              selectSuggestion(highlighted);
            } else {
              onSearch(city.trim());
              setCity("");
            }
            setOpen(false);
            setHighlightedIndex(-1);
          }}
          className="relative flex h-8 w-50 items-center sm:h-9 sm:w-80"
        >
          <motion.div
            animate={{ borderRadius: showDropdown ? 16 : 999 }}
            transition={{
              borderRadius: {
                duration: showDropdown ? 0 : 0.2,
                ease: "easeOut",
              },
            }}
            className="glass-chip group focus-within:border-ink/50 focus-within:ring-ink/20 absolute top-0 left-0 z-50 w-50 overflow-hidden transition-colors duration-200 ease-out focus-within:ring-2 sm:w-80"
          >
            <div className="relative flex h-8 items-center sm:h-9">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="group-focus-within:text-ink h-4 w-4 text-neutral-500 transition-colors" />
              </div>
              <input
                type="search"
                role="combobox"
                aria-expanded={showDropdown}
                aria-controls="city-suggestions"
                aria-autocomplete="list"
                aria-activedescendant={
                  highlightedIndex >= 0
                    ? `suggestion-${highlightedIndex}`
                    : undefined
                }
                placeholder="Search for a city..."
                className="text-md text-ink placeholder-ink/60 block h-full w-full bg-transparent pr-4 pl-9 focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (city.trim().length >= 2) setOpen(true);
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              {showDropdown && (
                <motion.div
                  id="city-suggestions"
                  role="listbox"
                  aria-label="City suggestions"
                  aria-busy={status === "loading"}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: dropdownHeight, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div ref={contentRef}>
                    <div className="border-ink/10 mx-1.5 border-t" />
                    <div className="flex flex-col gap-0.5 px-1.5 pt-1 pb-1.5">
                      {status === "loading" && (
                        <div className="text-ink/60 flex items-center gap-2.5 px-1.5 py-2.5 text-sm">
                          <span className="border-ink/15 border-t-ink/60 h-4 w-4 animate-spin rounded-full border-2" />
                          Searching cities...
                        </div>
                      )}
                      {status === "error" && (
                        <div className="text-ink/60 py-2.5 pr-1.5 pl-7.5 text-sm">
                          Could not search right now.
                        </div>
                      )}
                      {status === "success" && suggestions.length === 0 && (
                        <div className="text-ink/60 py-2.5 pr-1.5 pl-7.5 text-sm">
                          No cities found for "{city.trim()}".
                        </div>
                      )}
                      {status === "success" &&
                        suggestions.map((suggestion, i) => {
                          const meta = [suggestion.state, suggestion.country]
                            .filter(Boolean)
                            .join(", ");
                          return (
                            <button
                              key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}`}
                              type="button"
                              id={`suggestion-${i}`}
                              role="option"
                              aria-selected={i === highlightedIndex}
                              onMouseEnter={() => setHighlightedIndex(i)}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                selectSuggestion(suggestion);
                              }}
                              className={`focus:bg-ink/5 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-2.5 text-left text-sm transition-colors duration-100 focus:outline-none ${
                                i === highlightedIndex ? "bg-ink/5" : ""
                              }`}
                            >
                              <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                              <span className="text-ink truncate font-medium">
                                {suggestion.name}
                              </span>
                              {meta && (
                                <span className="text-ink/60 ml-auto truncate text-xs">
                                  {meta}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </form>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="glass-chip group focus:ring-ink/20 relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-out focus:ring-2 focus:outline-none sm:h-10 sm:w-10"
          aria-label="Toggle theme"
        >
          <div className="relative h-5 w-5">
            <Sun
              className={`absolute inset-0 h-full w-full transform transition-all duration-200 ease-out ${
                isDark
                  ? "scale-0 rotate-180 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              } text-amber-400`}
            />
            <Moon
              className={`absolute inset-0 h-full w-full transform transition-all duration-200 ease-out ${
                isDark
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-180 opacity-0"
              } text-blue-400`}
            />
          </div>
        </button>
      </div>
    </nav>
  );
}
