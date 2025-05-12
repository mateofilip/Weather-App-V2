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
    <div className="grid place-items-center gap-5 rounded-2xl bg-white px-5 py-10 shadow-xl">
      <button
        onClick={onClose}
        className="float-end h-10 w-10 rounded-full bg-red-400 text-white"
      >
        X
      </button>
      <img
        src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"}
        width="100"
        height="100"
        alt={name}
      />
      <h3 className="text-2xl">{name}</h3>
      <h5>{weather}</h5>
      <h5 className="text-3xl font-bold">{Math.round(temperature)}°C</h5>
      <p className="text-xl">
        {Math.round(min)}°C | {Math.round(max)}°C
      </p>
      <p>Feels like {Math.round(feelsLike)}°C</p>
    </div>
  );
}
