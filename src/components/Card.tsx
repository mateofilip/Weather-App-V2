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
        className="relative mx-auto flex w-xs cursor-pointer flex-col gap-4 rounded-2xl border border-white/25 bg-white/70 px-5 py-6 text-left shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_24px_50px_-14px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-[0.98] sm:gap-5 sm:rounded-3xl sm:px-6 sm:py-7 dark:border-white/12 dark:bg-black/33 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:shadow-[0_24px_50px_-14px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]"
        onClick={() => {
          setShowModal(true);
        }}
        data-blendy-from="card"
      >
        <button
          onClick={onClose}
          aria-label={`Remove ${name}`}
          className="absolute top-2 right-2 cursor-pointer p-1 text-black/40 transition-colors duration-200 ease-out hover:text-black/60 active:scale-95 sm:top-3 sm:right-3 dark:text-white/40 dark:hover:text-white/70"
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
            <h3 className="truncate text-lg font-semibold tracking-tight text-black sm:text-xl dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-black/60 dark:text-white/70">{weather}</p>
          </div>
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-full bg-white/60 blur-xl dark:bg-white/10" />
            <WeatherIcon
              code={icon}
              alt={weather}
              className="relative w-14 drop-shadow-sm sm:w-16 lg:w-20"
            />
          </div>
        </div>

        <div>
          <h5 className="text-5xl font-semibold tracking-tighter tabular-nums text-black/85 sm:text-6xl dark:text-white/90">
            {Math.round(temperature)}°C
          </h5>
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/12">
          <p className="flex items-center gap-1.5 text-sm text-black/60 dark:text-white/70">
            <span className="text-[10px] font-medium tracking-widest uppercase text-black/40 dark:text-white/40">
              Min
            </span>
            <span className="font-semibold tabular-nums">{Math.round(min)}°</span>
          </p>
          <p className="flex items-center gap-1.5 text-sm text-black/60 dark:text-white/70">
            <span className="text-[10px] font-medium tracking-widest uppercase text-black/40 dark:text-white/40">
              Max
            </span>
            <span className="font-semibold tabular-nums">{Math.round(max)}°</span>
          </p>
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
