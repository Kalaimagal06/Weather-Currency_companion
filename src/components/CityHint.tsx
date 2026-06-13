"use client";

import { MapPin } from "lucide-react";

const CITY_INFO = [
  { city: "London", emoji: "🇬🇧", tip: "GBP · Cloudy 15°C" },
  { city: "Paris", emoji: "🇫🇷", tip: "EUR · Sunny 18°C" },
  { city: "New York", emoji: "🇺🇸", tip: "USD · Clear 22°C" },
  { city: "Tokyo", emoji: "🇯🇵", tip: "JPY · Rainy 25°C" },
  { city: "Sydney", emoji: "🇦🇺", tip: "AUD · Sunny 20°C" },
  { city: "Delhi", emoji: "🇮🇳", tip: "INR · Hot 35°C" },
];

export default function CityHint() {
  return (
    <div className="mt-16 flex flex-col items-center gap-6 animate-[fadeIn_0.8s_ease_both]">
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <MapPin className="w-4 h-4" />
        <span>Featured destinations</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full">
        {CITY_INFO.map(({ city, emoji, tip }) => (
          <div
            key={city}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl
              border border-white/8 bg-white/3 backdrop-blur-sm
              hover:border-white/15 hover:bg-white/6 transition-all duration-200
              cursor-default group"
          >
            <span className="text-2xl">{emoji}</span>
            <div>
              <p className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                {city}
              </p>
              <p className="text-slate-500 text-xs">{tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
