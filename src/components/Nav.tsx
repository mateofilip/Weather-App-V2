import { useState } from "react";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <nav className="mx-auto mt-3 flex h-1/12 w-[75vw] justify-center gap-3 rounded-full bg-white px-10 pr-3 align-middle opacity-85 shadow-xl md:justify-between">
      <div className="hidden items-center gap-2 md:flex md:text-xl">
        <span>☀</span>
        <h1>Weather App - Mateo Filip</h1>
      </div>

      <div className="flex w-full items-center justify-center gap-3 align-middle md:w-1/2 lg:w-1/3">
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
            placeholder="🔎 Search for a City!"
            className="w-full rounded-full bg-slate-100 px-5 py-3 text-center shadow-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        <button className="rounded-full bg-slate-100 p-5 px-4 py-3 shadow-md">
          🌙
        </button>
      </div>
    </nav>
  );
}
