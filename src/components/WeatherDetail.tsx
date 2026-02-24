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
    icon: Icon,
  }: {
    title: string;
    value: string | React.ReactNode;
    icon: React.ReactNode;
  }) => (
    <div className="group flex flex-col justify-between gap-2 rounded-3xl border border-white/40 bg-white/60 p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/80 hover:shadow-md sm:p-4 dark:border-white/10 dark:bg-slate-800/60 dark:hover:bg-slate-700/80">
      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
        <div className="text-slate-500 transition-colors group-hover:text-blue-500 dark:text-slate-400 dark:group-hover:text-blue-400">
          {Icon}
        </div>
        <span className="text-xs font-medium tracking-wider uppercase opacity-80 sm:text-sm">
          {title}
        </span>
      </div>
      <p className="text-lg font-bold text-slate-800 sm:text-xl lg:text-2xl dark:text-slate-100">
        {value}
      </p>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm transition-all duration-300"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative my-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/40 bg-white/90 shadow-2xl backdrop-blur-2xl transition-all lg:flex-row lg:rounded-[2.5rem] dark:border-white/10 dark:bg-slate-900/90"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/60 text-slate-600 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:bg-white/80 hover:text-red-500 lg:top-6 lg:right-6 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700/80 dark:hover:text-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Left Side: Main Info */}
        <div className="relative flex flex-col items-center justify-center gap-4 p-6 text-center lg:w-2/5 lg:gap-6 lg:p-12 lg:pr-0">
          {/* Weather Icon Glow Effect */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-600/20" />
            <img
              src={"/icons/" + icon + ".png"}
              className="relative w-24 drop-shadow-2xl transition-transform hover:scale-110 md:w-32 lg:w-48"
              width="150"
              height="150"
              alt={weather}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800 md:text-4xl lg:text-5xl dark:text-white">
              {name}
            </h2>
            <p className="text-base font-medium text-blue-600 lg:text-xl dark:text-blue-400">
              {weather}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-3xl px-6 py-3 lg:px-8 lg:py-4">
            <span className="text-5xl font-bold text-slate-800 md:text-6xl lg:text-7xl dark:text-white">
              {Math.round(temperature)}{" "}
              <span className="absolute text-3xl lg:text-4xl">°</span>
            </span>
            <div className="flex gap-4 text-sm text-slate-600 lg:text-base dark:text-slate-300">
              <span className="flex items-center gap-1">
                <span className="text-blue-500">↓</span> {Math.round(min)}°
              </span>
              <span className="flex items-center gap-1">
                <span className="text-red-500">↑</span> {Math.round(max)}°
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Details Grid */}
        <div className="grid flex-1 grid-cols-2 gap-2 bg-slate-50/50 p-4 backdrop-blur-sm md:gap-3 md:p-6 lg:gap-6 lg:p-10 dark:bg-slate-900/20">
          <StatCard
            title="Feels Like"
            value={`${Math.round(feelsLike)}°`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12 9a4 4 0 0 0-2 7.5" />
                <path d="M12 3v2" />
                <path d="m6.6 18.4-1.4 1.4" />
                <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                <path d="M4 13H2" />
                <path d="M6.34 7.34 4.93 5.93" />
              </svg>
            }
          />
          <StatCard
            title="Wind Speed"
            value={`${wind} m/s`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
                <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
              </svg>
            }
          />
          <StatCard
            title="Humidity"
            value={`${humidity}%`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
              </svg>
            }
          />
          <StatCard
            title="Pressure"
            value={`${pressure} hPa`}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
                <circle cx="12" cy="12" r="2" />
                <path d="M13.4 10.6 19 5" />
              </svg>
            }
          />
          <StatCard
            title="Sunrise"
            value={sunriseTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            }
          />
          <StatCard
            title="Sunset"
            value={sunsetTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
            }
          />
        </div>
      </div>
    </div>
  );
}
