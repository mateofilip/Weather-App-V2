import Nav from "./Nav";
import Cards from "./Cards";
import Footer from "./Footer";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import type { City } from "../types/City";
const apiKey = "95ec01f8b61f542bd3d75bc4a0bf4394";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);

  function onClose(id: number) {
    setCities((oldCities) => oldCities.filter((city) => city.id !== id));
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
  }, []);

  async function onSearch(cityToSearch: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${apiKey}&units=metric`,
      );
      const data = await response.json();
      const city = {
        id: data.city.id,
        name: data.city.name,
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
      };

      cities.some((c) => c.id === city.id)
        ? toast.warning("City already added.")
        : setCities([city, ...cities]);
      console.log(city);
    } catch (error) {
      toast.error("City not found.");
    }
  }

  return (
    <>
      <Nav onSearch={onSearch} />

      <Toaster richColors closeButton />

      <Cards cities={cities} onClose={onClose} />

      <Footer />
    </>
  );
}
