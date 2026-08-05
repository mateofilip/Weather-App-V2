import { useRef, useState, useEffect } from "react";
import WeatherDetail from "./WeatherDetail";
import WeatherIcon from "./WeatherIcon";

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
        className="relative mx-auto flex w-xs cursor-pointer flex-col gap-6 rounded-2xl border border-slate-50/25 bg-slate-50/80 px-5 py-10 text-left shadow-xl shadow-neutral-950/20 ring-1 ring-slate-50/30 ring-inset backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] sm:gap-7 sm:rounded-3xl sm:px-6 sm:py-12 dark:border-slate-50/10 dark:bg-neutral-950/60 dark:shadow-2xl dark:shadow-neutral-950/60 dark:ring-slate-50/10 dark:hover:shadow-2xl dark:hover:shadow-neutral-950/70"
        onClick={() => {
          setShowModal(true);
        }}
        data-blendy-from="card"
      >
        <button
          onClick={onClose}
          aria-label={`Remove ${name}`}
          className="absolute top-2 right-2 cursor-pointer p-1 text-neutral-950/40 transition-colors duration-200 ease-out hover:text-neutral-950/60 active:scale-95 sm:top-3 sm:right-3 dark:text-slate-50/40 dark:hover:text-slate-50/70"
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

        <div className="flex items-start justify-between gap-3 pt-2 sm:pt-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight text-neutral-950 sm:text-xl dark:text-slate-50">
              {name}
            </h3>
            <p className="truncate text-sm text-neutral-950/60 dark:text-slate-50/70">{weather}</p>
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
            <h5 className="text-5xl font-semibold tracking-tighter tabular-nums text-neutral-950/90 sm:text-6xl dark:text-slate-50/90">
              {Math.round(temperature)}°C
            </h5>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-950/10 pt-3 dark:border-slate-50/10">
          <p className="flex items-center gap-1.5 text-sm text-neutral-950/60 dark:text-slate-50/70">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-950/40 dark:text-slate-50/40">
              Min
            </span>
            <span className="font-semibold tabular-nums">{Math.round(min)}°</span>
          </p>
          <p className="flex items-center gap-1.5 text-sm text-neutral-950/60 dark:text-slate-50/70">
            <span className="text-xs font-medium tracking-widest uppercase text-neutral-950/40 dark:text-slate-50/40">
              Max
            </span>
            <span className="font-semibold tabular-nums">{Math.round(max)}°</span>
          </p>
          </div>
        </div>
      </article>

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
    </>
  );
}
