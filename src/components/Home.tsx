import Nav from "./Nav";
import Cards from "./Cards";
import { useState } from "react";
import type { City } from "../types/City";
const apiKey = "95ec01f8b61f542bd3d75bc4a0bf4394";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);

  function onClose(id: number) {
    setCities((oldCities) => oldCities.filter((city) => city.id !== id));
  }

  async function onSearch(cityToSearch: string) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityToSearch}&appid=${apiKey}`
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
      };

      cities.some((c) => c.id === city.id)
        ? alert("City already added")
        : setCities([...cities, city]);
      console.log(city);
    } catch (error) {
      alert("City not found");
      console.log(error);
    }
  }

  return (
    <>
      <Nav onSearch={onSearch} />

      <main>
        <Cards cities={cities} onClose={onClose} />
      </main>
    </>
  );
}
