# AGENTS.md

Astro 7 + React 19 + Tailwind CSS v4 weather app (OpenWeatherMap). Single page; `src/pages/index.astro` renders `<Home client:only="react"/>` from `src/components/`.

## Commands (use pnpm, not npm)

- `pnpm dev` — dev server at http://localhost:4321
- `pnpm build` — production build via Vercel adapter (also writes `.vercel/output`)
- `pnpm preview` — preview the production build
- No lint/test/typecheck scripts exist. The main verification is `pnpm build`. Do not run `astro check` — `@astrojs/check` is not installed and it prompts to add it.

## Must-know gotchas

- **Do NOT remove `cookie@^2.0.1` from dependencies.** It is a direct dep that works around a pnpm hoisting bug: `@netlify/vite-plugin`'s transitive `cookie@1.0.2` otherwise lands at root `node_modules` and shadows Astro 7's `cookie@2.0.1`, breaking build/dev with "The requested module 'cookie' does not provide an export named 'parseCookie'".
- **Dark mode is a custom Tailwind variant, not the default.** `src/styles/global.css` defines `@custom-variant dark (&:where(.dark, .dark *));`. The `.dark` class is toggled on `document.body` (persisted in localStorage `theme`), so `dark:` utilities only work when body has that class. Style all components with explicit `dark:` variants.

## Conventions

- **Images:** use `@lonik/oh-image`'s `<Image>` component (with `width`/`height`) — never plain `<img>`. Raster assets are AVIF for performance. New static images should be AVIF.
- **Weather icons:** from `@meteocons/svg` (fill style), rendered inline via `src/components/WeatherIcon.tsx`. The OpenWeatherMap code → meteocons slug mapping lives in `src/lib/weatherIcons.ts` (raw `?raw` SVG imports, outer `<svg>` tag stripped). Add `src/env.d.ts` references if `?raw` typing breaks.
- **Background:** `public/bg-image.avif` is a pre-blurred AVIF (4000px, q70, sigma 120), set on `body` in `src/layouts/Layout.astro` via Tailwind (`bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat` + `bg-white dark:bg-black` + `backdrop-brightness-125 dark:backdrop-brightness-33`). Blur is baked into the image (not a live `backdrop-blur`) for perf. `public/bg-image-unblurred.avif` is the source encode kept for re-blurring; regenerate both with sharp-cli: `pnpm dlx sharp-cli -i <source> -o public/bg-image.avif -q 70 resize 4000 -- blur 120`. No `<style>` blocks in this repo — use Tailwind classes. Note `bg-fixed` was removed (breaks/zooms the image on iOS).
- **Styling:** Tailwind v4, configured via `@tailwindcss/vite` in `astro.config.mjs` (no `tailwind.config.*`). UI palette is strictly black/white by theme — light mode uses white surfaces + black text, dark mode uses black surfaces + white text. No blue/colored accents (weather icons may be colorful — they come from meteocons). **Prefer default Tailwind utilities** — no arbitrary `[...]` values or custom opacity steps; the liquid-glass surfaces are built from `shadow-xl shadow-black/20 ring-1 ring-inset ring-white/30`. Prettier with `prettier-plugin-tailwindcss` is configured. The unified frosted-glass surface token is `border-white/25 bg-white/80 dark:border-white/10 dark:bg-black/60` with `backdrop-blur-xl` (modals `bg-white/90 dark:bg-black/60`, blur-2xl/3xl; inner tiles slightly more transparent). The **WeatherDetail modal is an exception: solid** `bg-white` / `dark:bg-black` with `border-black/10 dark:border-white/10` and `shadow-2xl` — it relies on the `bg-black/60` scrim overlay for contrast instead of transparency.
- **Fonts:** self-hosted in `public/`. UI font is **OpenRunde**, registered as 4 static `@font-face` weights (400/500/600/700) in `src/styles/global.css` — not a variable font, so don't use a weight range.
- **Env:** API key is read from `PUBLIC_API_KEY` in `.env` (gitignored) at module top level in `src/components/Home.tsx`. Set it in deployment env too.
- **Deployment:** `@astrojs/vercel` adapter with `imageService: true`. `@astrojs/netlify` is in deps but unused by config.
