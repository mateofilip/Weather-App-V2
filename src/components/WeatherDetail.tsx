import WeatherIcon from "./WeatherIcon";

interface WeatherDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  temperature: number;
  min: number;
  max: number;
  feelsLike: number;
  weather: string;
  icon: string;
  sunrise: number;
  sunset: number;
  humidity: number;
  pressure: number;
  wind: number;
}

export default function WeatherDetail({
  setShowModal,
  name,
  temperature,
  min,
  max,
  feelsLike,
  weather,
  icon,
  sunrise,
  sunset,
  humidity,
  pressure,
  wind,
}: WeatherDetailProps) {
  const sunsetTime = new Date(sunset * 1000);
  const sunriseTime = new Date(sunrise * 1000);

  const StatCard = ({
    title,
    value,
    slug,
  }: {
    title: string;
    value: string | React.ReactNode;
    slug: string;
  }) => (
    <div className="glass-chip group flex flex-col justify-between gap-3 rounded-2xl p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] sm:p-5">
      <div className="flex items-center gap-2">
        <WeatherIcon
          slug={slug}
          alt={title}
          className="h-6 w-6 shrink-0 text-ink/60 sm:h-7 sm:w-7"
        />
        <span className="text-xs font-medium tracking-widest uppercase text-ink/40">
          {title}
        </span>
      </div>
      <p className="text-xl font-semibold tracking-tight tabular-nums text-ink/90 sm:text-2xl">
        {value}
      </p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/25 p-4 backdrop-blur-3xl"
      onClick={() => setShowModal(false)}
    >
      <div
        className="glass-surface relative my-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl lg:max-w-5xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 cursor-pointer p-1 text-ink/40 transition-colors duration-200 ease-out hover:text-ink/60 active:scale-95 sm:top-4 sm:right-4"
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

        {/* Hero — mirrors the card layout */}
        <div className="glass-tint flex flex-col gap-6 p-6 sm:gap-7 sm:p-8 lg:w-2/5 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {name}
              </h2>
              <p className="truncate text-sm font-medium text-ink/60 sm:text-base">
                {weather}
              </p>
            </div>
            <div className="relative shrink-0">
              <div className="absolute -inset-3 rounded-full bg-slate-50/40 blur-xl dark:bg-slate-50/5" />
              <WeatherIcon
                code={icon}
                alt={weather}
                className="relative h-20 w-20 drop-shadow-md sm:h-24 sm:w-24 lg:h-28 lg:w-28"
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-3">
            <p className="text-6xl font-semibold tracking-tighter tabular-nums text-ink/90 sm:text-7xl">
              {Math.round(temperature)}°C
            </p>

            <div className="flex items-center justify-between border-t border-ink/10 pt-3">
              <p className="flex items-center gap-1.5 text-sm text-ink/60">
                <span className="text-xs font-medium tracking-widest uppercase text-ink/40">
                  Min
                </span>
                <span className="font-semibold tabular-nums">{Math.round(min)}°</span>
              </p>
              <p className="flex items-center gap-1.5 text-sm text-ink/60">
                <span className="text-xs font-medium tracking-widest uppercase text-ink/40">
                  Max
                </span>
                <span className="font-semibold tabular-nums">{Math.round(max)}°</span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="glass-deep grid flex-1 grid-cols-2 gap-3 border-t border-ink/10 p-6 sm:gap-4 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
          <StatCard
            title="Feels Like"
            value={`${Math.round(feelsLike)}°`}
            slug="thermometer"
          />
          <StatCard
            title="Wind"
            value={`${wind} m/s`}
            slug="wind"
          />
          <StatCard
            title="Humidity"
            value={`${humidity}%`}
            slug="humidity"
          />
          <StatCard
            title="Pressure"
            value={`${pressure} hPa`}
            slug="barometer"
          />
          <StatCard
            title="Sunrise"
            value={sunriseTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            slug="sunrise"
          />
          <StatCard
            title="Sunset"
            value={sunsetTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            slug="sunset"
          />
        </div>
      </div>
    </div>
  );
}
