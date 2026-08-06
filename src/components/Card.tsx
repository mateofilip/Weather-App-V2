import { useRef, useState, useEffect } from "react";
import WeatherDetail from "./WeatherDetail";
import WeatherIcon from "./WeatherIcon";
import { AnimatePresence } from "motion/react";

interface CardProps {
  id: number;
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
  onClose: () => void;
}

export default function Card({
  id,
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
  onClose,
}: CardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className="glass-surface glass-surface-hover relative mx-auto flex w-xs cursor-pointer flex-col gap-6 rounded-2xl px-5 py-10 text-left transition-all duration-200 ease-out hover:-translate-y-1 active:scale-[0.98] sm:gap-7 sm:rounded-3xl sm:px-6 sm:py-12"
        onClick={() => {
          setShowModal(true);
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label={`Remove ${name}`}
          className="text-ink/40 hover:text-ink/60 absolute top-2 right-2 cursor-pointer p-1 transition-colors duration-200 ease-out active:scale-95 sm:top-3 sm:right-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14px"
            viewBox="0 -960 960 960"
            width="14px"
            fill="currentColor"
            className="sm:h-4 sm:w-4"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>

        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-ink truncate text-lg font-semibold tracking-tight sm:text-xl">
              {name}
            </h3>
            <p className="text-ink/60 truncate text-sm">{weather}</p>
          </div>
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-slate-50/60 blur-xl dark:bg-slate-50/10" />
            <WeatherIcon
              code={icon}
              alt={weather}
              className="relative h-14 w-14 drop-shadow-sm sm:h-16 sm:w-16 lg:h-20 lg:w-20"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-end gap-3">
          <div>
            <h5 className="text-ink/90 text-5xl font-semibold tracking-tighter tabular-nums sm:text-6xl">
              {Math.round(temperature)}°C
            </h5>
          </div>

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
      </article>

      <AnimatePresence>
        {showModal && (
          <WeatherDetail
            setShowModal={setShowModal}
            name={name}
            temperature={temperature}
            min={min}
            max={max}
            feelsLike={feelsLike}
            weather={weather}
            icon={icon}
            sunrise={sunrise}
            sunset={sunset}
            humidity={humidity}
            pressure={pressure}
            wind={wind}
          />
        )}
      </AnimatePresence>
    </>
  );
}
