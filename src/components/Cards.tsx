import type { City } from "../types/City";
import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Cards({
  cities,
  onClose,
}: {
  cities: City[];
  onClose: (id: number) => void;
}) {
  const [parent, enableAnimations] = useAutoAnimate();

  // Determine grid classes based on number of cities
  const getGridClasses = () => {
    if (cities.length === 1) return "grid-cols-1";
    if (cities.length === 2) return "grid-cols-1 sm:grid-cols-2";
    if (cities.length === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
      {cities.length > 0 ? (
        <div
          ref={parent}
          className={`mx-auto grid w-fit justify-items-center gap-4 sm:gap-6 ${getGridClasses()}`}
        >
          {cities.map((city: City) => (
            <Card
              key={city.id}
              id={city.id}
              name={city.name}
              temperature={city.temperature}
              min={city.min}
              max={city.max}
              feelsLike={city.feelsLike}
              weather={city.weather}
              icon={city.icon}
              sunrise={city.sunrise}
              sunset={city.sunset}
              humidity={city.humidity}
              pressure={city.pressure}
              wind={city.wind}
              onClose={() => onClose(city.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-slate-700 sm:min-h-[60vh] dark:text-slate-100">
          <img
            src="/icons/icon.png"
            alt="icon"
            className="mb-4 w-20 sm:mb-6 sm:w-24 lg:w-32"
          />
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl">
            Search for a City Above!
          </h1>
        </div>
      )}
    </main>
  );
}
