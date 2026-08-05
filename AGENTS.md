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
- **Chromium ignores nested `backdrop-filter`.** Any element with `backdrop-filter` becomes a "backdrop root"; Chrome (unlike Safari/Firefox) strictly enforces it, so a `backdrop-blur` on a child only blurs up to that root and can't reach page content behind it. This is why nothing with `backdrop-filter` may sit on `body`/a wrapper ancestor of the modal overlays — it silently kills the overlays' `backdrop-blur-3xl` in Chromium (only the `bg-black/66` scrim shows).

## Conventions

- **Images:** use `@lonik/oh-image`'s `<Image>` component (with `width`/`height`) — never plain `<img>`. Raster assets are AVIF for performance. New static images should be AVIF.
- **Weather icons:** from `@meteocons/svg` (fill style), rendered inline via `src/components/WeatherIcon.tsx`. The OpenWeatherMap code → meteocons slug mapping lives in `src/lib/weatherIcons.ts` (raw `?raw` SVG imports, outer `<svg>` tag stripped). Add `src/env.d.ts` references if `?raw` typing breaks.
- **Background:** `public/bg-image.avif` is a pre-blurred AVIF (4000px, q70, sigma 120), set on `body` in `src/layouts/Layout.astro` via Tailwind (`bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat` + `bg-slate-50 dark:bg-neutral-950`). Blur is baked into the image (not a live `backdrop-blur`) for perf. `public/bg-image-unblurred.avif` is the source encode kept for re-blurring; regenerate both with sharp-cli: `pnpm dlx sharp-cli -i <source> -o public/bg-image.avif -q 70 resize 4000 -- blur 120`. No `<style>` blocks in this repo — use Tailwind classes. Note `bg-fixed` was removed (breaks/zooms the image on iOS), and **do NOT add `backdrop-brightness-*` (or any `backdrop-filter`) back to `body`** — it made `<body>` a backdrop root, so Chromium stopped applying the modal overlays' nested `backdrop-blur` (see gotcha below).
- **Styling:** Tailwind v4, configured via `@tailwindcss/vite` in `astro.config.mjs` (no `tailwind.config.*`). UI palette is strictly black/white by theme — light mode uses white surfaces + black text, dark mode uses black surfaces + white text. No blue/colored accents (weather icons may be colorful — they come from meteocons). **Prefer default Tailwind utilities** — no arbitrary `[...]` values or custom opacity steps; the liquid-glass surfaces are built from `shadow-xl shadow-neutral-950/20 ring-1 ring-inset ring-slate-50/30` (dark `shadow-neutral-950/60 ring-slate-50/10`). Prettier with `prettier-plugin-tailwindcss` is configured. There are exactly **two surface tokens**:
  - **Surface** (every container/panel: cards, nav, empty state, all modals, `WeatherDetail` panel): `border-slate-50/25 bg-slate-50/80 shadow-sm ring-1 ring-slate-50/30 ring-inset backdrop-blur-xl dark:border-slate-50/10 dark:bg-neutral-950/60 dark:ring-slate-50/10`. Interactive surfaces (cards, nav) add `hover:shadow-md` so their shadow grows on hover. Modal overlays/scrims use pure `bg-black/66` + `backdrop-blur-3xl`.
  - **Chip** (anything sitting on a surface: search input, theme toggle, suggestion chips, **WeatherDetail stat cards**, FAB, stack list rows, TimeMachine inner tile): `border-slate-50/25 bg-slate-50/40 shadow-sm hover:bg-slate-50/60 hover:shadow-md dark:border-slate-50/10 dark:bg-slate-50/10 dark:hover:bg-slate-50/20` (+ shape/radius). The `WeatherDetail` hero is the chip's transparency without border/shadow (`bg-slate-50/40 dark:bg-slate-50/10`); the right column behind the stat cards keeps a darker surface (`bg-slate-50/90 dark:bg-neutral-900/90`). **Close buttons are an exception: plain text X** (`p-1 text-neutral-950/40 hover:text-neutral-950/60 active:scale-95 dark:text-slate-50/40 dark:hover:text-slate-50/70`) — same in Card, WeatherDetail, StackInfo, and TimeMachineModal.
- **Fonts:** self-hosted in `public/`. UI font is **OpenRunde**, registered as 4 static `@font-face` weights (400/500/600/700) in `src/styles/global.css` — not a variable font, so don't use a weight range.
- **Env:** API key is read from `PUBLIC_API_KEY` in `.env` (gitignored) at module top level in `src/components/Home.tsx`. Set it in deployment env too.
- **Deployment:** `@astrojs/vercel` adapter with `imageService: true`. `@astrojs/netlify` is in deps but unused by config.
