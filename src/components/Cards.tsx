import type { City } from "../types/City";
import type { Unit } from "../lib/units";
import Card from "./Card";
import EmptyState from "./EmptyState";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Cards({
  cities,
  pinnedIds,
  unit,
  onClose,
  onTogglePin,
  onSearch,
}: {
  cities: City[];
  pinnedIds: Set<number>;
  unit: Unit;
  onClose: (id: number) => void;
  onTogglePin: (city: City) => void;
  onSearch: (city: string, coords?: { lat: number; lon: number }) => void;
}) {
  const [showEmpty, setShowEmpty] = useState(true);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    if (cities.length > 0) setShowEmpty(false);
  }, [cities.length]);

  const handleEmptyExitComplete = () => {
    if (cities.length > 0) setCardsReady(true);
    else setShowEmpty(true);
  };

  const handleCardsExitComplete = () => {
    if (cities.length === 0) {
      setShowEmpty(true);
      setCardsReady(false);
    }
  };

  return (
    <main className="m-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-20 2xl:px-32">
      <div className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-4 sm:gap-6">
        <AnimatePresence onExitComplete={handleEmptyExitComplete}>
          {showEmpty && cities.length === 0 && (
            <motion.div
              key="empty"
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="animate-fade-in">
                <EmptyState onSearch={onSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence onExitComplete={handleCardsExitComplete}>
          {cities.length > 0 &&
            cardsReady &&
            cities.map((city: City) => (
              <motion.div
                key={city.id}
                layout
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="animate-fade-in">
                  <Card
                    id={city.id}
                    name={city.name}
                    unit={unit}
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
                    pinned={pinnedIds.has(city.id)}
                    onClose={() => onClose(city.id)}
                    onTogglePin={() => onTogglePin(city)}
                  />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
