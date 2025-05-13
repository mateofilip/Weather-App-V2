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
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  return (
    <main className="px-10 py-10 md:px-16 lg:px-64">
      {cities.length > 0 ? (
        <div
          ref={parent}
          className="flex flex-col-reverse gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
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
              onClose={() => onClose(city.id)}
            />
          ))}
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn mt-48 grid h-full w-full place-items-center">
          <h1 className="m-0 mt-8 text-2xl">Search for a City Above!</h1>
        </div>
      )}
    </main>
  );
}
