import Nav from "./Nav";
import Cards from "./Cards";
import StackInfo from "./StackInfo";
import TimeMachine from "./TimeMachine";
import Toolbar from "./Toolbar";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { MotionConfig } from "motion/react";
import type { City } from "../types/City";
const apiKey = (await import.meta.env.PUBLIC_API_KEY) as string;

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<number>>(new Set());
  const [stackOpen, setStackOpen] = useState(false);
  const [timeMachineOpen, setTimeMachineOpen] = useState(false);

  function onClose(id: number) {
    setCities((oldCities) => oldCities.filter((city) => city.id !== id));
  }

  function onTogglePin(city: City) {
    const saved = localStorage.getItem("pinnedCities");
    const pinned: City[] = saved ? JSON.parse(saved) : [];
    const isPinned = pinned.some((c) => c.id === city.id);

    if (isPinned) {
      localStorage.setItem(
        "pinnedCities",
        JSON.stringify(pinned.filter((c) => c.id !== city.id)),
      );
      setPinnedIds((ids) => {
        const next = new Set(ids);
        next.delete(city.id);
        return next;
      });
    } else {
      localStorage.setItem("pinnedCities", JSON.stringify([city, ...pinned]));
      setPinnedIds((ids) => new Set(ids).add(city.id));
    }
  }

  async function fetchCity(
    cityToSearch: string,
    coords?: { lat: number; lon: number },
  ): Promise<City> {
    const location = coords
      ? `lat=${coords.lat}&lon=${coords.lon}`
      : `q=${encodeURIComponent(cityToSearch)}`;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${apiKey}&units=metric`,
    );
    const data = await response.json();
    if (!data.city) throw new Error("City not found.");
    return {
      id: data.city.id,
      name: data.city.name,
      lat: data.city.coord.lat,
      lon: data.city.coord.lon,
      temperature: data.list[0].main.temp,
      min: data.list[0].main.temp_min,
      max: data.list[0].main.temp_max,
      feelsLike: data.list[0].main.feels_like,
      weather: data.list[0].weather[0].main,
      icon: data.list[0].weather[0].icon,
      sunrise: data.city.sunrise,
      sunset: data.city.sunset,
      humidity: data.list[0].main.humidity,
      pressure: data.list[0].main.pressure,
      wind: data.list[0].wind.speed,
    };
  }

  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }

    const savedPinned = localStorage.getItem("pinnedCities");
    if (savedPinned) {
      try {
        const pinned: City[] = JSON.parse(savedPinned);
        setCities(pinned);
        setPinnedIds(new Set(pinned.map((c) => c.id)));

        pinned.forEach((city) => {
          const hasCoords =
            typeof city.lat === "number" && typeof city.lon === "number";
          fetchCity(
            city.name,
            hasCoords ? { lat: city.lat, lon: city.lon } : undefined,
          )
            .then((fresh) => {
              setCities((old) =>
                old.map((c) => (c.id === fresh.id ? fresh : c)),
              );
              const saved = localStorage.getItem("pinnedCities");
              if (saved) {
                try {
                  const list: City[] = JSON.parse(saved);
                  localStorage.setItem(
                    "pinnedCities",
                    JSON.stringify(
                      list.map((c) => (c.id === fresh.id ? fresh : c)),
                    ),
                  );
                } catch {
                  /* ignore */
                }
              }
            })
            .catch(() => {
              /* keep stale data on failure */
            });
        });
      } catch {
        localStorage.removeItem("pinnedCities");
      }
    }
  }, []);

  async function onSearch(
    cityToSearch: string,
    coords?: { lat: number; lon: number },
  ) {
    try {
      const city = await fetchCity(cityToSearch, coords);

      cities.some((c) => c.id === city.id)
        ? toast.warning("City already added.")
        : setCities([city, ...cities]);
    } catch (error) {
      toast.error("City not found.");
    }
  }

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Nav onSearch={onSearch} />

      <Toaster richColors closeButton />

      <Cards
        cities={cities}
        pinnedIds={pinnedIds}
        onClose={onClose}
        onTogglePin={onTogglePin}
        onSearch={onSearch}
      />

      <Toolbar
        onTimeMachine={() => setTimeMachineOpen(true)}
        onStack={() => setStackOpen(true)}
      />

      <TimeMachine
        open={timeMachineOpen}
        onOpenChange={setTimeMachineOpen}
      />

      <StackInfo open={stackOpen} onOpenChange={setStackOpen} />
    </MotionConfig>
  );
}
