import WeatherIcon from "./WeatherIcon";
import { motion } from "motion/react";
import { X } from "lucide-react";

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
          className="text-ink/60 h-6 w-6 shrink-0 sm:h-7 sm:w-7"
        />
        <span className="text-ink/40 text-xs font-medium tracking-widest uppercase">
          {title}
        </span>
      </div>
      <p className="text-ink/90 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
        {value}
      </p>
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/25 p-4 backdrop-blur-3xl"
      onClick={() => setShowModal(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="glass-surface relative my-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl lg:max-w-5xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          aria-label="Close"
          className="hover:text-ink absolute top-3 right-3 z-20 cursor-pointer p-1 text-neutral-500 transition-colors duration-200 ease-out active:scale-95 sm:top-4 sm:right-4"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero — mirrors the card layout */}
        <div className="glass-tint flex flex-col gap-6 p-6 sm:gap-7 sm:p-8 lg:w-2/5 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-ink truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                {name}
              </h2>
              <p className="text-ink/60 truncate text-sm font-medium sm:text-base">
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
            <p className="text-ink/90 text-6xl font-semibold tracking-tighter tabular-nums sm:text-7xl">
              {Math.round(temperature)}°C
            </p>

            <div className="border-ink/10 flex items-center justify-between border-t pt-3">
              <p className="text-ink/60 flex items-center gap-1.5 text-sm">
                <span className="text-ink/40 text-xs font-medium tracking-widest uppercase">
                  Min
                </span>
                <span className="font-semibold tabular-nums">
                  {Math.round(min)}°
                </span>
              </p>
              <p className="text-ink/60 flex items-center gap-1.5 text-sm">
                <span className="text-ink/40 text-xs font-medium tracking-widest uppercase">
                  Max
                </span>
                <span className="font-semibold tabular-nums">
                  {Math.round(max)}°
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="glass-deep border-ink/10 grid flex-1 grid-cols-2 gap-3 border-t p-6 sm:gap-4 sm:p-8 lg:border-t-0 lg:border-l lg:p-10">
          <StatCard
            title="Feels Like"
            value={`${Math.round(feelsLike)}°`}
            slug="thermometer"
          />
          <StatCard title="Wind" value={`${wind} m/s`} slug="wind" />
          <StatCard title="Humidity" value={`${humidity}%`} slug="humidity" />
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
      </motion.div>
    </motion.div>
  );
}
