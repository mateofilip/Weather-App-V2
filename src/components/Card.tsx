import { useRef, useState, useEffect } from "react";
import WeatherDetail from "./WeatherDetail";
import WeatherIcon from "./WeatherIcon";
import AnimatedTemp from "./AnimatedTemp";
import { AnimatePresence } from "motion/react";
import { Bookmark, X } from "lucide-react";
import type { Unit } from "../lib/units";
import { unitLabel } from "../lib/units";

interface CardProps {
  id: number;
  name: string;
  unit: Unit;
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
  pinned: boolean;
  onClose: () => void;
  onTogglePin: () => void;
}

export default function Card({
  id,
  name,
  unit,
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
  pinned,
  onClose,
  onTogglePin,
}: CardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <article
        className="glass-surface glass-surface-hover relative mx-auto flex w-xs cursor-pointer flex-col gap-6 rounded-2xl px-5 py-10 text-left transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:ring-ink/30 active:scale-[0.98] focus-visible:ring-2 focus-visible:outline-none sm:gap-7 sm:rounded-3xl sm:px-6 sm:py-12"
        tabIndex={0}
        role="button"
        aria-label={`View details for ${name}`}
        onClick={() => {
          setShowModal(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          aria-label={pinned ? `Unpin ${name}` : `Pin ${name}`}
          aria-pressed={pinned}
          title={pinned ? `Unpin ${name}` : `Pin ${name}`}
          className={`hover:text-ink absolute top-2 cursor-pointer p-1 text-neutral-500 transition-all duration-200 ease-out active:scale-95 sm:top-3 ${
            pinned ? "right-2 sm:right-3" : "right-9 sm:right-10"
          }`}
        >
          {pinned ? (
            <Bookmark className="h-4 w-4" fill="currentColor" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>

        {!pinned && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label={`Remove ${name}`}
            title={`Remove ${name}`}
            className="hover:text-ink absolute top-2 right-2 cursor-pointer p-1 text-neutral-500 transition-colors duration-200 ease-out active:scale-95 sm:top-3 sm:right-3"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        )}

        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-ink truncate text-lg font-semibold tracking-tight sm:text-xl">
              {name}
            </h2>
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
              <AnimatedTemp value={temperature} unit={unit} label={unitLabel(unit)} />
            </h5>
          </div>

          <div className="border-ink/10 flex items-center justify-between border-t pt-3">
            <p className="text-ink/60 flex items-center gap-1.5 text-sm">
              <span className="text-ink/40 text-xs font-medium tracking-widest uppercase">
                Min
              </span>
              <span className="font-semibold tabular-nums">
                <AnimatedTemp value={min} unit={unit} label="°" />
              </span>
            </p>
            <p className="text-ink/60 flex items-center gap-1.5 text-sm">
              <span className="text-ink/40 text-xs font-medium tracking-widest uppercase">
                Max
              </span>
              <span className="font-semibold tabular-nums">
                <AnimatedTemp value={max} unit={unit} label="°" />
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
            unit={unit}
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
