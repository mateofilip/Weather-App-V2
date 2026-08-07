import { useState, useEffect } from "react";
import { Image } from "@lonik/oh-image/react";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "light" ? "dark" : "light",
    );
    document.body.classList.toggle("dark");
  };

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
          action="."
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(city);
            setCity("");
          }}
          className="relative flex max-w-[200px] flex-1 items-center sm:max-w-xs"
        >
          <div className="group relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="text-ink/60 group-focus-within:text-ink h-4 w-4 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search for a city..."
              className="glass-chip text-md text-ink placeholder-ink/60 focus:border-ink/50 focus:ring-ink/20 block w-full rounded-full py-2 pr-4 pl-9 transition-all focus:w-full focus:ring-2 focus:outline-none"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </form>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="glass-chip group focus:ring-ink/20 relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ease-out focus:ring-2 focus:outline-none sm:h-10 sm:w-10"
          aria-label="Toggle theme"
        >
          <div className="relative h-5 w-5">
            <svg
              className={`absolute inset-0 h-full w-full transform transition-all duration-200 ease-out ${
                isDark
                  ? "scale-0 rotate-180 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              } text-amber-400`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg
              className={`absolute inset-0 h-full w-full transform transition-all duration-200 ease-out ${
                isDark
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-180 opacity-0"
              } text-blue-400`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
}
