import clearDay from "@meteocons/svg/fill/clear-day.svg?raw";
import clearNight from "@meteocons/svg/fill/clear-night.svg?raw";
import mostlyClearDay from "@meteocons/svg/fill/mostly-clear-day.svg?raw";
import mostlyClearNight from "@meteocons/svg/fill/mostly-clear-night.svg?raw";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg?raw";
import partlyCloudyNight from "@meteocons/svg/fill/partly-cloudy-night.svg?raw";
import overcastDay from "@meteocons/svg/fill/overcast-day.svg?raw";
import overcastNight from "@meteocons/svg/fill/overcast-night.svg?raw";
import overcastDayRain from "@meteocons/svg/fill/overcast-day-rain.svg?raw";
import overcastNightRain from "@meteocons/svg/fill/overcast-night-rain.svg?raw";
import partlyCloudyDayRain from "@meteocons/svg/fill/partly-cloudy-day-rain.svg?raw";
import partlyCloudyNightRain from "@meteocons/svg/fill/partly-cloudy-night-rain.svg?raw";
import thunderstormsDay from "@meteocons/svg/fill/thunderstorms-day.svg?raw";
import thunderstormsNight from "@meteocons/svg/fill/thunderstorms-night.svg?raw";
import overcastDaySnow from "@meteocons/svg/fill/overcast-day-snow.svg?raw";
import overcastNightSnow from "@meteocons/svg/fill/overcast-night-snow.svg?raw";
import fogDay from "@meteocons/svg/fill/fog-day.svg?raw";
import fogNight from "@meteocons/svg/fill/fog-night.svg?raw";
import compassNe from "@meteocons/svg/fill/compass-ne.svg?raw";
import thermometer from "@meteocons/svg/fill/thermometer.svg?raw";
import windIcon from "@meteocons/svg/monochrome/wind.svg?raw";
import humidityIcon from "@meteocons/svg/fill/humidity.svg?raw";
import barometerIcon from "@meteocons/svg/fill/barometer.svg?raw";
import sunriseIcon from "@meteocons/svg/fill/sunrise.svg?raw";
import sunsetIcon from "@meteocons/svg/fill/sunset.svg?raw";

const ICONS: Record<string, string> = {
  "01d": clearDay,
  "01n": clearNight,
  "02d": mostlyClearDay,
  "02n": mostlyClearNight,
  "03d": partlyCloudyDay,
  "03n": partlyCloudyNight,
  "04d": overcastDay,
  "04n": overcastNight,
  "09d": overcastDayRain,
  "09n": overcastNightRain,
  "10d": partlyCloudyDayRain,
  "10n": partlyCloudyNightRain,
  "11d": thunderstormsDay,
  "11n": thunderstormsNight,
  "13d": overcastDaySnow,
  "13n": overcastNightSnow,
  "50d": fogDay,
  "50n": fogNight,
};

const SVG_TAG = /^<svg[^>]*>/;
const SVG_END = /<\/svg>$/;

function prepare(raw: string): string {
  return raw.replace(SVG_TAG, "").replace(SVG_END, "");
}

function prepareMono(raw: string): string {
  return prepare(raw).replace(/="black"/g, '="currentColor"');
}

export function weatherIconBody(code: string): string | undefined {
  const raw = ICONS[code];
  return raw ? prepare(raw) : undefined;
}

const SLUGS: Record<string, string> = {
  "compass-ne": prepare(compassNe),
  thermometer: prepare(thermometer),
  wind: prepareMono(windIcon),
  humidity: prepare(humidityIcon),
  barometer: prepare(barometerIcon),
  sunrise: prepare(sunriseIcon),
  sunset: prepare(sunsetIcon),
};

export function meteoconBody(slug: string): string | undefined {
  return SLUGS[slug];
}
