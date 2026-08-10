import Nav from "./Nav";
import Cards from "./Cards";
import TimeMachine from "./TimeMachine";
import Toolbar from "./Toolbar";
import { Toaster, toast } from "sonner";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import type { City } from "../types/City";
import type { Unit } from "../lib/units";

const StackInfo = lazy(() => import("./StackInfo"));

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const citiesRef = useRef<City[]>([]);
  const [pinnedIds, setPinnedIds] = useState<Set<number>>(new Set());
  const [stackOpen, setStackOpen] = useState(false);
  const [timeMachineOpen, setTimeMachineOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>(() =>
    localStorage.getItem("unit") === "fahrenheit" ? "fahrenheit" : "celsius",
  );

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  function onClose(id: number) {
    setCities((oldCities) => oldCities.filter((city) => city.id !== id));
  }

  function clearCities() {
    setCities((oldCities) =>
      oldCities.filter((city) => pinnedIds.has(city.id)),
    );
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
    const response = await fetch(`/api/weather?${location}`);
    if (!response.ok) {
      let serverMessage: string | null = null;
      try {
        const body = await response.json();
        if (typeof body?.error === "string") serverMessage = body.error;
      } catch {
        /* ignore */
      }
      if (response.status === 401 || response.status === 403)
        throw new Error("Invalid API key.");
      if (response.status === 429)
        throw new Error("Rate limit reached, try again.");
      if (response.status === 404) throw new Error("City not found.");
      throw new Error(serverMessage ?? "Could not reach the weather service.");
    }
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

      citiesRef.current.some((c) => c.id === city.id)
        ? toast.warning("City already added.")
        : setCities((old) => [city, ...old]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "City not found.");
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
        unit={unit}
        onClose={onClose}
        onTogglePin={onTogglePin}
        onSearch={onSearch}
      />

      <Toolbar
        unit={unit}
        onUnitChange={setUnit}
        onTimeMachine={() => setTimeMachineOpen(true)}
        onStack={() => setStackOpen(true)}
        onClear={clearCities}
      />

      <TimeMachine open={timeMachineOpen} onOpenChange={setTimeMachineOpen} />

      <Suspense fallback={null}>
        <StackInfo open={stackOpen} onOpenChange={setStackOpen} />
      </Suspense>
    </MotionConfig>
  );
}
