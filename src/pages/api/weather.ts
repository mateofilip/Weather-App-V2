import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  const apiKey = import.meta.env.API_KEY as string | undefined;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Weather API is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!q && (lat === null || lon === null)) {
    return new Response(JSON.stringify({ error: "Missing query." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const location = q
    ? `q=${encodeURIComponent(q)}`
    : `lat=${lat}&lon=${lon}`;
  const upstream = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?${location}&appid=${apiKey}&units=metric`,
  );
  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
};
