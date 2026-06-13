import countryToCurrency from 'country-to-currency';

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  countryCode?: string;
  currencyCode?: string;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
  if (!geoRes.ok) throw new Error("Geocoding failed");
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found");
  }

  const location = geoData.results[0];
  const { latitude, longitude, name, country_code } = location;

  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
  if (!weatherRes.ok) throw new Error("Weather fetch failed");
  const weatherData = await weatherRes.json();

  const current = weatherData.current;
  const temp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const windSpeed = current.wind_speed_10m;
  const weatherCode = current.weather_code;

  let condition = "Clear";
  if (weatherCode > 0 && weatherCode <= 3) condition = "Cloudy";
  else if (weatherCode >= 45 && weatherCode <= 48) condition = "Fog";
  else if (weatherCode >= 51 && weatherCode <= 57) condition = "Drizzle";
  else if (weatherCode >= 61 && weatherCode <= 67) condition = "Rainy";
  else if (weatherCode >= 71 && weatherCode <= 77) condition = "Snow";
  else if (weatherCode >= 80 && weatherCode <= 82) condition = "Showers";
  else if (weatherCode >= 85 && weatherCode <= 86) condition = "Snow Showers";
  else if (weatherCode >= 95) condition = "Thunderstorm";

  const currencyCode = country_code ? (countryToCurrency as Record<string, string>)[country_code] || "USD" : "USD";

  return {
    city: name,
    temperature: temp,
    condition,
    humidity,
    windSpeed,
    countryCode: country_code,
    currencyCode,
  };
}
