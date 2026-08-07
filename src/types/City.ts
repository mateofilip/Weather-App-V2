export type City = {
  id: number;
  name: string;
  lat?: number;
  lon?: number;
  temperature: number;
  min: number;
  max: number;
  feelsLike: number;
  weather: string;
  icon: string;
  sunrise: number;
  sunset: number;
  humidity: number;
  pressure: number;
  wind: number;
};
