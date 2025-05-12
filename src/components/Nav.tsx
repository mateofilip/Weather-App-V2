import { useState } from "react";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <nav className="flex h-1/10 w-screen justify-center gap-3 bg-white px-0 py-10 align-middle shadow-xl md:justify-between md:px-15">
      <div className="hidden items-center gap-2 md:flex md:text-xl">
        <span>☀</span>
        <h1>Weather App - Mateo Filip</h1>
      </div>

      <div className="flex w-full items-center justify-center gap-3 align-middle md:w-1/2 lg:w-1/4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(city);
            setCity("");
          }}
          className="w-3/4"
        >
          <input
            type="search"
            placeholder="🔎   Search for a City!"
            className="w-full rounded-md bg-gray-100 px-5 py-3 shadow-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        <button className="rounded-md bg-gray-100 px-5 py-3 shadow-md">
          🌙
        </button>
      </div>
    </nav>
  );
}
