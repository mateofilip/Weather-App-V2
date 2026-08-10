import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const limit = url.searchParams.get("limit") ?? "5";
  const apiKey = import.meta.env.API_KEY as string | undefined;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Weather API is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!q) {
    return new Response(JSON.stringify({ error: "Missing query." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const upstream = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=${limit}&appid=${apiKey}`,
  );
  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400",
    },
  });
};
