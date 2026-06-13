export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const MOCK_CITIES: Record<string, Omit<WeatherData, "city">> = {
  london: { temperature: 15, condition: "Cloudy", humidity: 70, windSpeed: 10 },
  paris: { temperature: 18, condition: "Sunny", humidity: 60, windSpeed: 8 },
  "new york": { temperature: 22, condition: "Clear", humidity: 50, windSpeed: 12 },
  tokyo: { temperature: 25, condition: "Rainy", humidity: 80, windSpeed: 5 },
  sydney: { temperature: 20, condition: "Sunny", humidity: 55, windSpeed: 15 },
  delhi: { temperature: 35, condition: "Hot", humidity: 40, windSpeed: 6 },
};

export async function fetchWeather(city: string): Promise<WeatherData> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  const normalizedCity = city.toLowerCase().trim();
  const data = MOCK_CITIES[normalizedCity];

  if (!data) {
    throw new Error("City not found");
  }

  return {
    city: normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1),
    ...data,
  };
}
