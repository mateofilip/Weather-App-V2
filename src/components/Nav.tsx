import { useState } from "react";

export default function Nav({
  onSearch,
}: {
  onSearch: (city: string) => void;
}) {
  const [city, setCity] = useState("");

  return (
    <nav className="mx-auto mt-3 flex h-1/12 w-[80vw] justify-center gap-3 rounded-full bg-white px-3 align-middle opacity-85 shadow-lg transition-all duration-300 ease-in-out hover:scale-[103%] hover:shadow-xl md:w-[75vw] md:justify-between md:px-10 md:pr-3">
      <div className="hidden items-center gap-2 text-slate-800 md:flex md:text-xl">
        <img src="./src/assets/icon.png" alt="icon" className="h-1/2" />
        <h1 className="font-bold">Weather App</h1>
      </div>

      <div className="flex w-full items-center justify-between align-middle md:w-1/2 md:justify-center md:gap-3 lg:w-1/2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(city);
            setCity("");
          }}
          className="w-4/5 md:w-3/4"
        >
          <input
            type="search"
            placeholder="🔎 Search for a City!"
            className="w-full rounded-full bg-slate-100 px-5 py-3 text-center shadow-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        <button className="cursor-pointer rounded-full bg-slate-100 p-5 px-4 py-3 shadow-md">
          🌙
        </button>
      </div>
    </nav>
  );
}
