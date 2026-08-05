import WeatherIcon from "./WeatherIcon";

export default function EmptyState({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const SUGGESTIONS = ["London", "Paris", "Tokyo", "Amsterdam"];

  return (
    <div className="flex min-h-[50vh] items-center justify-center sm:min-h-[60vh]">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl border border-white/25 bg-white/70 px-8 py-12 text-center shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md sm:gap-8 dark:border-white/12 dark:bg-black/33 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-white/60 blur-2xl dark:bg-white/10" />
          <WeatherIcon
            slug="compass-ne"
            alt="Compass"
            className="relative w-44 sm:w-56"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl dark:text-white">
            What's the weather like?
          </h1>
          <p className="text-sm text-black/60 sm:text-base dark:text-white/60">
            Search for a city above, or pick one of the suggestions below.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SUGGESTIONS.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="cursor-pointer rounded-full border border-white/25 bg-white/60 px-4 py-2 text-sm font-medium text-black shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md active:scale-95 dark:border-white/12 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
