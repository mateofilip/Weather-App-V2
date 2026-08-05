import type { City } from "../types/City";
import Card from "./Card";
import EmptyState from "./EmptyState";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Cards({
  cities,
  onClose,
  onSearch,
}: {
  cities: City[];
  onClose: (id: number) => void;
  onSearch: (city: string) => void;
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
    <main className="m-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
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
        <EmptyState onSearch={onSearch} />
      )}
    </main>
  );
}
