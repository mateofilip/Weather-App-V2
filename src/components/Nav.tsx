import { useState } from "react";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <nav className="flex w-screen px-20 py-10 justify-between">
      <div className="flex gap-2">
        <span>☀</span>
        <h1>Weather App - Mateo Filip</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(city);
          setCity("");
        }}
      >
        <input
          type="search"
          placeholder="🔎   Search for a City!"
          className=" bg-gray-200 rounded-md px-5 py-2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </form>
    </nav>
  );
}
