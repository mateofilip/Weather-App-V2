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
        className="relative grid cursor-pointer place-items-center gap-5 rounded-3xl bg-white px-5 py-10 text-center opacity-90 shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl dark:bg-slate-700"
        onClick={() => {
          setShowModal(true);
        }}
        data-blendy-from="card"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-3 mr-3 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="white"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </button>
        <img
          src={"src/icons/" + icon + ".png"}
          className="w-1/3 drop-shadow-sm"
          width="100"
          height="100"
          alt={weather}
        />
        <div>
          <h3 className="text-3xl text-slate-700 dark:text-slate-100">
            {name}
          </h3>
          <h5 className="text-sm text-slate-500 dark:text-slate-300">
            {weather}
          </h5>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-5xl font-semibold text-slate-700 dark:text-slate-100">
            {Math.round(temperature)}°C
          </h5>
          <p className="text-lg text-slate-600 dark:text-slate-400">
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
