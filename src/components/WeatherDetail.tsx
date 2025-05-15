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
}: WeatherDetailProps) {
  const sunsetTime = new Date(sunset * 1000);
  const sunriseTime = new Date(sunrise * 1000);

  return (
    <div
      className="fixed top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black/50"
      onClick={() => setShowModal(false)}
      // data-blendy-to="card"
    >
      <div
        className="relative grid h-fit w-fit place-items-center rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-0 right-0 mt-3 mr-3 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
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
        <div className="grid place-items-center">
          <img
            src={"/weather-icons/" + icon + ".svg"}
            className="w-full drop-shadow-sm"
            alt={weather}
          />
          <h3 className="text-3xl">{name}</h3>
          <h5 className="text-gray-700">{weather}</h5>
        </div>

        <div className="grid place-items-center gap-2 px-60">
          <h5 className="text-6xl font-bold">{Math.round(temperature)}°C</h5>
          <p className="text-lg text-gray-700">
            L: {Math.round(min)}°C | H: {Math.round(max)}°C
          </p>
          <p className="text-lg text-gray-700">
            Feels Like: {Math.round(feelsLike)}°C
          </p>

          <div className="grid grid-cols-2 grid-rows-2 gap-5">
            <div className="grid place-items-center gap-3 rounded-2xl bg-gray-100 p-5 shadow-xl">
              <div className="flex items-center gap-2">
                {humidity < 30 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path d="M480-120q-124.69 0-212.34-86.12Q180-292.24 180-415.8q0-58.97 23.35-112.81 23.34-53.85 64.5-95.54L480-832.31l212.15 208.16q41.16 41.69 64.5 95.55Q780-474.74 780-415.72q0 123.64-87.66 209.68Q604.69-120 480-120Zm0-60q100 0 170-68.31t70-167.39q0-47.05-18-89.58-18-42.54-52-74.57L480-748 310-579.85q-34 32.03-52 74.57-18 42.53-18 89.58 0 99.08 70 167.39Q380-180 480-180Z" />
                  </svg>
                ) : humidity < 60 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path d="M480-120q-124.69 0-212.34-86.12Q180-292.24 180-415.8q0-58.97 23.35-112.81 23.34-53.85 64.5-95.54L480-832.31l212.15 208.16q41.16 41.69 64.5 95.55Q780-474.74 780-415.72q0 123.64-87.66 209.68Q604.69-120 480-120ZM240-415.62h480q0-47-18-89.64-18-42.63-52-74.74L480-748 310-580q-34 32.11-52 74.74-18 42.64-18 89.64Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f1f1f"
                  >
                    <path d="M480-120q-124.69 0-212.34-86.12Q180-292.24 180-415.8q0-58.97 23.35-112.81 23.34-53.85 64.5-95.54L480-832.31l212.15 208.16q41.16 41.69 64.5 95.55Q780-474.74 780-415.72q0 123.64-87.66 209.68Q604.69-120 480-120Z" />
                  </svg>
                )}
                <h5 className="text-lg font-semibold">HUMIDITY</h5>
              </div>
              <p className="text-4xl">{humidity}%</p>
              <p className="text-sm text-gray-700">
                {humidity < 30
                  ? "Dry air – can cause skin dryness, respiratory discomfort"
                  : humidity < 60
                    ? "Comfortable for most people and environments"
                    : "Feels muggy – can promote mold, dust mites, and discomfort"}
              </p>
            </div>

            <div className="grid place-items-center gap-3 rounded-2xl bg-gray-100 p-5 shadow-xl">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1f1f1f"
                >
                  <path d="M479.88-100q-78.03 0-147.33-29.9-69.29-29.9-121.02-81.63-51.73-51.73-81.63-121.02-29.9-69.3-29.9-147.33 0-78.98 29.96-147.97 29.96-69 81.58-120.61 51.61-51.62 121-81.58T479.88-860q78.89 0 147.93 29.96t120.65 81.58q51.62 51.61 81.58 120.61Q860-558.86 860-479.88q0 78.03-29.96 147.38t-81.58 120.96q-51.61 51.62-120.61 81.58Q558.86-100 479.88-100Zm.12-210q57.69 0 112.96 16.54 55.27 16.54 103.35 48.38 49.84-45.61 76.77-106.46Q800-412.39 800-480q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 67.69 26.62 128.81 26.61 61.11 77.07 106.11 48.08-31.84 103.35-48.38Q422.31-310 480-310Zm.06 60q-43.37 0-84.68 11.15-41.3 11.16-78.61 32.7 36.54 22.69 78.07 34.42Q436.37-160 480.03-160t85.16-11.73q41.5-11.73 78.04-34.42-37.31-21.54-78.56-32.7Q523.42-250 480.06-250ZM280-523.85q15.08 0 25.62-10.53 10.53-10.54 10.53-25.62 0-15.08-10.53-25.62-10.54-10.53-25.62-10.53-15.08 0-25.62 10.53-10.53 10.54-10.53 25.62 0 15.08 10.53 25.62 10.54 10.53 25.62 10.53Zm120-120q15.08 0 25.62-10.53 10.53-10.54 10.53-25.62 0-15.08-10.53-25.62-10.54-10.53-25.62-10.53-15.08 0-25.62 10.53-10.53 10.54-10.53 25.62 0 15.08 10.53 25.62 10.54 10.53 25.62 10.53Zm280 120q15.08 0 25.62-10.53 10.53-10.54 10.53-25.62 0-15.08-10.53-25.62-10.54-10.53-25.62-10.53-15.08 0-25.62 10.53-10.53 10.54-10.53 25.62 0 15.08 10.53 25.62 10.54 10.53 25.62 10.53ZM480-410q29.15 0 49.58-20.42Q550-450.85 550-480q0-13-4.58-24.92-4.57-11.93-12.96-21.54L591.08-674q5.07-11.77.11-23.42-4.96-11.66-16.79-16.73-11.09-5.08-22.72-.22-11.64 4.86-16.14 16.83L476.15-550q-27.69 1.92-46.92 21.92T410-480q0 29.15 20.42 49.58Q450.85-410 480-410Zm0 100Zm0-212.54ZM480-250Z" />
                </svg>
                <h5 className="text-lg font-semibold">PRESSURE</h5>
              </div>
              <p className="text-4xl">{pressure} hPa</p>
              <p className="text-sm text-gray-700">
                {pressure < 1000
                  ? "Often indicates bad or unstable weather conditions"
                  : humidity < 60
                    ? "Typical, stable weather conditions"
                    : "Often signals clear, calm, dry weather conditions"}
              </p>
            </div>

            <div className="col-span-2">
              Sunrise: {sunriseTime.toTimeString()} | Sunset:
              {sunsetTime.toTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
