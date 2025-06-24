import { useRef, useState, useEffect } from "react";
import WeatherDetail from "./WeatherDetail";

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
        className="relative grid cursor-pointer place-items-center gap-3 rounded-3xl bg-white px-5 py-8 text-center opacity-90 shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl sm:gap-4 sm:px-6 sm:py-10 lg:gap-5 lg:px-8 lg:py-12 dark:bg-slate-700"
        onClick={() => {
          setShowModal(true);
        }}
        data-blendy-from="card"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-500 sm:top-3 sm:right-3 sm:h-7 sm:w-7"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="white"
            className="sm:h-5 sm:w-5"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>
        <img
          src={"/icons/" + icon + ".png"}
          className="w-16 drop-shadow-sm sm:w-20 lg:w-24"
          width="100"
          height="100"
          alt={weather}
        />
        <div>
          <h3 className="text-lg text-slate-700 sm:text-xl lg:text-2xl xl:text-3xl dark:text-slate-100">
            {name}
          </h3>
          <h5 className="text-xs text-slate-500 sm:text-sm lg:text-base dark:text-slate-300">
            {weather}
          </h5>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <h5 className="text-3xl font-semibold text-slate-700 sm:text-4xl lg:text-5xl xl:text-6xl dark:text-slate-100">
            {Math.round(temperature)}°C
          </h5>
          <p className="text-sm text-slate-600 sm:text-base lg:text-lg xl:text-xl dark:text-slate-400">
            {Math.round(min)}°C | {Math.round(max)}°C
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
