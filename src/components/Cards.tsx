import type { City } from "../types/City";
// import type { Blendy } from "blendy";
// import { createBlendy } from "blendy";
import Card from "./Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { useRef, useEffect } from "react";

export default function Cards({
  cities,
  onClose,
}: {
  cities: City[];
  onClose: (id: number) => void;
}) {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  // const blendy = createBlendy();

  // useEffect(() => {
  //   blendy.update();
  // }, [cities]);

  return (
    <main className="px-10 py-10 pt-4 md:px-16 md:pt-10 lg:px-64">
      {cities.length > 0 ? (
        <div
          ref={parent}
          className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
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
              onClose={() => onClose(city.id)}
            />
          ))}
        </div>
      ) : (
        <div className="grid place-items-center text-slate-700 dark:text-slate-100">
          <img
            src="/weather-icons/icon.png"
            alt="icon"
            className="w-1/2 md:w-1/4 lg:w-1/7"
          />
          <h1 className="text-2xl">Search for a City Above!</h1>
        </div>
      )}
    </main>
  );
}
