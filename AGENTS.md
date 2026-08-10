# AGENTS.md

Astro 7 + React 19 + Tailwind CSS v4 weather app (OpenWeatherMap). Single page; `src/pages/index.astro` renders `<Home client:only="react"/>` from `src/components/`.

## Commands (use pnpm, not npm)

- `pnpm dev` — dev server at http://localhost:4321
- `pnpm build` — production build via Vercel adapter (also writes `.vercel/output`). Do **not** run this after every change — only run it when the user commands a commit. Otherwise verify edits by reading the code.
- `pnpm preview` — preview the production build
- No lint/test/typecheck scripts exist. Do not run `astro check` — `@astrojs/check` is not installed and it prompts to add it.

## Must-know gotchas

- **Do NOT remove `cookie@^2.0.1` from dependencies.** It is a direct dep that works around a pnpm hoisting bug: `@netlify/vite-plugin`'s transitive `cookie@1.0.2` otherwise lands at root `node_modules` and shadows Astro 7's `cookie@2.0.1`, breaking build/dev with "The requested module 'cookie' does not provide an export named 'parseCookie'".
- **Dark mode is a custom Tailwind variant, not the default.** `src/styles/global.css` defines `@custom-variant dark (&:where(.dark, .dark *));`. The `.dark` class is toggled on `document.body` (persisted in localStorage `theme`). For semantic colors you rarely need `dark:` anymore — the `ink`/`accent` `@theme` tokens and the `glass-*`/`bg-wash` material classes flip automatically via their own `.dark` overrides in `global.css`. Reserve `dark:` for ad-hoc tweaks.
- **Chromium ignores nested `backdrop-filter`.** Any element with `backdrop-filter` becomes a "backdrop root"; Chrome (unlike Safari/Firefox) strictly enforces it, so a `backdrop-blur` on a child only blurs up to that root and can't reach page content behind it. This is why nothing with `backdrop-filter` may sit on `body`/a wrapper ancestor of the modal overlays — it silently kills the overlays' `backdrop-blur-3xl` in Chromium (only the `bg-black/25` scrim shows).

## Conventions

- **Images:** use `@lonik/oh-image`'s `<Image>` component (with `width`/`height`) — never plain `<img>`. Raster assets are AVIF for performance. New static images should be AVIF.
- **Weather icons:** from `@meteocons/svg` (fill style), rendered inline via `src/components/WeatherIcon.tsx`. The OpenWeatherMap code → meteocons slug mapping lives in `src/lib/weatherIcons.ts` (raw `?raw` SVG imports, outer `<svg>` tag stripped). Add `src/env.d.ts` references if `?raw` typing breaks.
- **Background:** `public/bg-image.avif` is a pre-blurred AVIF (4000px, q70, sigma 120). `body` in `src/layouts/Layout.astro` is `bg-wash bg-slate-100 dark:bg-neutral-950`; the image sits on an `absolute inset-0 -z-10` sibling div (`bg-[url('/bg-image.avif')] bg-cover bg-center bg-no-repeat opacity-80 dark:opacity-60 dark:brightness-33`). Blur is baked into the image (not a live `backdrop-blur`) for perf. `public/bg-image-unblurred.avif` is the source encode kept for re-blurring; regenerate both with sharp-cli: `pnpm dlx sharp-cli -i <source> -o public/bg-image.avif -q 70 resize 4000 -- blur 120`. No `<style>` blocks in this repo — use Tailwind classes. Note `bg-fixed` was removed (breaks/zooms the image on iOS), and **do NOT add `backdrop-brightness-*` (or any `backdrop-filter`) back to `body`** — it made `<body>` a backdrop root, so Chromium stopped applying the modal overlays' nested `backdrop-blur` (see gotcha below). Use normal blend + moderate opacity in light mode so the image's color shows through; do NOT use `mix-blend-screen` (it washed the image out against the light base).
- **Styling:** Tailwind v4, configured via `@tailwindcss/vite` in `astro.config.mjs` (no `tailwind.config.*`). UI palette is strictly black/white by theme — light mode uses white surfaces + black text, dark mode uses black surfaces + white text. No blue/colored accents (weather icons may be colorful — they come from meteocons). **Prefer default Tailwind utilities** — no arbitrary `[...]` values or custom opacity steps. Prettier with `prettier-plugin-tailwindcss` is configured.

  **Design tokens** live in the `@theme` block of `src/styles/global.css`: `--font-sans`, `--color-ink` (near-black in light / near-white in dark), `--color-accent` (restrained azure; reserved for future accents), and `--shadow-glass`/`--shadow-glass-hover`/`--shadow-chip`/`--shadow-chip-hover`. Use the Tailwind utilities they generate: `text-ink`, `text-ink/60`, `border-ink/10`, `ring-ink/20`, `shadow-glass`, etc. All flip automatically in dark via the `.dark` overrides — do **not** add `dark:` variants for ink/glass. **Opacity steps are free** (e.g. `text-ink/90`, `text-ink/40`).

  **Frosted-glass materials** (`@layer components` in `global.css`, also `.dark` overridden + `prefers-reduced-transparency` fallbacks):
  - **`glass-surface`** — every container/panel (cards, nav, empty state, all modals, `WeatherDetail` panel). Interactive surfaces (cards, nav) add `glass-surface-hover`. Modal overlays/scrims use pure `bg-black/25` + `backdrop-blur-3xl`.
  - **`glass-chip`** — anything sitting on a surface (search input, theme toggle, suggestion chips, **WeatherDetail stat cards**, FAB, stack list rows, TimeMachine inner tile) (+ shape/radius). Includes its own hover state; don't add `hover:shadow-md` on top (utilities would clobber the inset highlights).
  - **`glass-tint`** — `WeatherDetail` hero (chip transparency without border/shadow).
  - **`glass-deep`** — `WeatherDetail` right column behind the stat cards (darker surface).
  - **`bg-wash`** — ambient radial-gradient wash used on `body`.
  **Close buttons are an exception: plain text X** (`p-1 text-ink/40 hover:text-ink/60 active:scale-95`) — same in Card, WeatherDetail, StackInfo, and TimeMachineModal. Decorative icon glows use raw `bg-slate-50/… blur-*` (a white halo, not ink).
- **Fonts:** self-hosted in `public/`. UI font is **OpenRunde**, registered as 4 static `@font-face` weights (400/500/600/700) in `src/styles/global.css` — not a variable font, so don't use a weight range.
- **Env:** The OpenWeatherMap key is read from `API_KEY` (gitignored, `.env`) **server-side only** in the API proxy routes `src/pages/api/weather.ts` and `src/pages/api/geo.ts` (`prerender = false`, so `astro.config.mjs` uses `output: "hybrid"`). The client fetches relative `/api/weather?...` / `/api/geo?...` and never sees the key. Set `API_KEY` in deployment env too (Vercel dashboard; `PUBLIC_API_KEY` is obsolete — remove it).
- **Deployment:** `@astrojs/vercel` adapter with `imageService: true`. `@astrojs/netlify` is in deps but unused by config.
