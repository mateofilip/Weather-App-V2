import thermometer from "@meteocons/svg/fill/thermometer.svg?raw";
import windIcon from "@meteocons/svg/monochrome/wind.svg?raw";
import humidityIcon from "@meteocons/svg/fill/humidity.svg?raw";
import barometerIcon from "@meteocons/svg/fill/barometer.svg?raw";
import sunriseIcon from "@meteocons/svg/fill/sunrise.svg?raw";
import sunsetIcon from "@meteocons/svg/fill/sunset.svg?raw";

const SVG_TAG = /^<svg[^>]*>/;
const SVG_END = /<\/svg>$/;

function prepare(raw: string): string {
  return raw.replace(SVG_TAG, "").replace(SVG_END, "");
}

function prepareMono(raw: string): string {
  return prepare(raw).replace(/="black"/g, '="currentColor"');
}

const SLUGS: Record<string, string> = {
  thermometer: prepare(thermometer),
  wind: prepareMono(windIcon),
  humidity: prepare(humidityIcon),
  barometer: prepare(barometerIcon),
  sunrise: prepare(sunriseIcon),
  sunset: prepare(sunsetIcon),
};

export function detailIconBody(slug: string): string | undefined {
  return SLUGS[slug];
}
