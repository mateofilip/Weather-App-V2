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

  return (
    <div
      className="fixed top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black/50 dark:bg-black/60"
      onClick={() => setShowModal(false)}
      // data-blendy-to="card"
    >
      <div
        className="relative flex h-3/4 w-3/4 flex-col place-items-center gap-3 rounded-2xl bg-white/66 p-3 backdrop-blur-sm lg:flex-row lg:p-3 dark:bg-slate-700/66"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-0 right-0 z-50 -mt-7 -mr-7 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
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
        <div className="flex h-1/2 flex-col place-items-center justify-center gap-3 rounded-2xl bg-slate-100 text-center opacity-85 lg:h-full lg:w-1/2 lg:gap-5 dark:bg-slate-800">
          <img
            src={"/weather-icons/" + icon + ".png"}
            className="w-1/3 drop-shadow-sm md:w-1/4 lg:w-1/3"
            width="100"
            height="100"
            alt={weather}
          />
          <div>
            <h3 className="text-3xl text-slate-700 lg:text-5xl dark:text-slate-100">
              {name}
            </h3>
            <h5 className="text-sm text-slate-500 lg:text-lg dark:text-slate-400">
              {weather}
            </h5>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-5xl font-semibold text-slate-700 lg:text-7xl dark:text-slate-100">
              {Math.round(temperature)}°C
            </h5>
            <p className="text-lg text-slate-600 lg:text-3xl dark:text-slate-400">
              {Math.round(min)}°C | {Math.round(max)}°C
            </p>
          </div>
        </div>

        <div className="grid h-1/2 w-full grid-cols-2 grid-rows-3 place-items-center gap-3 lg:h-full lg:w-1/2 lg:gap-3">
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 9a4 4 0 0 0-2 7.5" />
                <path d="M12 3v2" />
                <path d="m6.6 18.4-1.4 1.4" />
                <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                <path d="M4 13H2" />
                <path d="M6.34 7.34 4.93 5.93" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Feels Like
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {Math.round(feelsLike)}°C
            </p>
          </section>
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Wind Speed
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {" "}
              {wind} m/s
            </p>
          </section>
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                <circle cx="12" cy="12" r="2" />
                <path d="M13.4 10.6 19 5" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Pressure
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {" "}
              {pressure} hPa
            </p>
          </section>
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Humidity
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {" "}
              {humidity}%
            </p>
          </section>
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 6 4-4 4 4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Sunrise
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {" "}
              {sunriseTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </section>
          <section className="grid h-full w-full content-between rounded-2xl bg-slate-100 p-3 opacity-85 shadow-md lg:p-5 dark:bg-slate-800">
            <div className="flex items-center gap-1 text-slate-700 lg:text-xl dark:text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 10V2" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m16 6-4 4-4-4" />
                <path d="M16 18a4 4 0 0 0-8 0" />
              </svg>
              <h6 className="font-semibold text-slate-700 dark:text-slate-100">
                Sunset
              </h6>
            </div>
            <p className="text-xl text-slate-600 lg:text-4xl dark:text-slate-400">
              {" "}
              {sunsetTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
