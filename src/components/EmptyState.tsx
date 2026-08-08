import WeatherIcon from "./WeatherIcon";

export default function EmptyState({
  onSearch,
}: {
  onSearch: (city: string, coords?: { lat: number; lon: number }) => void;
}) {
  const SUGGESTIONS = ["Buenos Aires", "Paris", "Tokyo", "Amsterdam", "London"];

  return (
    <div className="flex min-h-[50vh] items-center justify-center sm:min-h-[60vh]">
      <div className="glass-surface mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl px-8 py-12 text-center sm:gap-8">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-slate-50/60 blur-2xl dark:bg-slate-50/10" />
          <WeatherIcon
            slug="compass-ne"
            alt="Compass"
            className="relative h-44 w-44 sm:h-56 sm:w-56"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">
            What's the weather like?
          </h2>
          <p className="text-ink/60 text-sm sm:text-base">
            Search for a city above, or pick one of the suggestions below.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SUGGESTIONS.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="glass-chip text-ink cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 focus-visible:ring-ink/30 active:scale-95 focus-visible:ring-2 focus-visible:outline-none"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
