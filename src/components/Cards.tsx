import type { City } from "../types/City";
import Card from "./Card";

export default function Cards({
  cities,
  onClose,
}: {
  cities: City[];
  onClose: (id: number) => void;
}) {
  return (
    <section>
      {cities.length > 0 ? (
        <div>
          {cities.map((city: City) => (
            <Card
              key={city.id}
              id={city.id}
              temperature={city.temperature}
              max={city.max}
              min={city.min}
              name={city.name}
              onClose={() => onClose(city.id)}
            />
          ))}
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn w-full h-full grid place-items-center mt-48">
          <h1 className="m-0 mt-8 text-2xl">Search for a City Above!</h1>
        </div>
      )}
    </section>
  );
}
