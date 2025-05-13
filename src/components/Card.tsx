interface CardProps {
  id: number;
  name: string;
  temperature: number;
  min: number;
  max: number;
  feelsLike: number;
  weather: string;
  icon: string;
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
  onClose,
}: CardProps) {
  return (
    <article className="relative grid place-items-center gap-5 rounded-3xl bg-white px-5 py-12 text-center shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-3 mr-3 grid h-7 w-7 place-items-center rounded-full bg-red-400 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-red-600"
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
        src={"/weather-icons/" + icon + ".svg"}
        className="w-1/3 drop-shadow-sm"
        width="100"
        height="100"
        alt={name}
      />
      <div>
        <h3 className="text-3xl">{name}</h3>
        <h5 className="text-sm text-gray-700">{weather}</h5>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="text-5xl font-bold">{Math.round(temperature)}°C</h5>
        <p className="text-lg text-gray-700">
          {Math.round(min)}°C | {Math.round(max)}°C
        </p>
        {/* <p>Feels like {Math.round(feelsLike)}°C</p> */}
      </div>
    </article>
  );
}
