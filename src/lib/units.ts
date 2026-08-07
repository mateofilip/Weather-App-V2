export type Unit = "celsius" | "fahrenheit";

export function toFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function inUnit(celsius: number, unit: Unit): number {
  return unit === "fahrenheit" ? toFahrenheit(celsius) : celsius;
}

export function unitLabel(unit: Unit): string {
  return unit === "fahrenheit" ? "°F" : "°C";
}
