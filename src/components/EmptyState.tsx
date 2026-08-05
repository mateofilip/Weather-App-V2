import WeatherIcon from "./WeatherIcon";

export default function EmptyState({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const SUGGESTIONS = ["Buenos Aires", "Paris", "Tokyo", "Amsterdam", "London"];

  return (
    <div className="flex min-h-[50vh] items-center justify-center sm:min-h-[60vh]">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-3xl border border-slate-50/25 bg-slate-50/80 px-8 py-12 text-center shadow-sm ring-1 ring-slate-50/30 ring-inset backdrop-blur-xl sm:gap-8 dark:border-slate-50/10 dark:bg-neutral-950/60 dark:ring-slate-50/10">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-slate-50/60 blur-2xl dark:bg-slate-50/10" />
          <WeatherIcon
            slug="compass-ne"
            alt="Compass"
            className="relative h-44 w-44 sm:h-56 sm:w-56"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl dark:text-slate-50">
            What's the weather like?
          </h1>
          <p className="text-sm text-neutral-950/60 sm:text-base dark:text-slate-50/60">
            Search for a city above, or pick one of the suggestions below.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {SUGGESTIONS.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              className="cursor-pointer rounded-full border border-slate-50/25 bg-slate-50/40 px-4 py-2 text-sm font-medium text-neutral-950 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-50/60 hover:shadow-md active:scale-95 dark:border-slate-50/10 dark:bg-slate-50/10 dark:text-slate-50 dark:hover:bg-slate-50/20"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
