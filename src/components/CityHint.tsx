"use client";

import { MapPin, ChevronUp } from "lucide-react";

const CITY_INFO = [
  {
    city: "London",
    countryCode: "gb",
    currency: "GBP",
    currencyName: "British Pound",
    temp: "15°C",
    condition: "Cloudy",
    weatherEmoji: "⛅",
    trend: "0.45%",
  },
  {
    city: "Paris",
    countryCode: "fr",
    currency: "EUR",
    currencyName: "Euro",
    temp: "18°C",
    condition: "Sunny",
    weatherEmoji: "☀️",
    trend: "0.32%",
  },
  {
    city: "New York",
    countryCode: "us",
    currency: "USD",
    currencyName: "US Dollar",
    temp: "22°C",
    condition: "Clear",
    weatherEmoji: "🌙",
    trend: "0.28%",
  },
  {
    city: "Tokyo",
    countryCode: "jp",
    currency: "JPY",
    currencyName: "Japanese Yen",
    temp: "25°C",
    condition: "Rainy",
    weatherEmoji: "🌧️",
    trend: "0.12%",
  },
  {
    city: "Sydney",
    countryCode: "au",
    currency: "AUD",
    currencyName: "Australian Dollar",
    temp: "20°C",
    condition: "Sunny",
    weatherEmoji: "☀️",
    trend: "0.36%",
  },
  {
    city: "Delhi",
    countryCode: "in",
    currency: "INR",
    currencyName: "Indian Rupee",
    temp: "35°C",
    condition: "Hot",
    weatherEmoji: "☀️",
    trend: "0.44%",
  },
];

export default function CityHint() {
  return (
    <div className="mt-16 flex flex-col items-center gap-6 animate-[fadeIn_0.8s_ease_both] w-full">
      <div className="flex items-center gap-2 text-slate-700 text-sm font-semibold">
        <MapPin className="w-4 h-4 text-blue-500" />
        <span>Featured destinations</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl w-full">
        {CITY_INFO.map((info) => (
          <div
            key={info.city}
            className="flex flex-col p-5 rounded-[24px]
              border border-slate-100 bg-white shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]
              transition-all duration-300 cursor-default group"
          >
            {/* Top section: Flag + City + Currency */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-slate-50 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://flagcdn.com/w80/${info.countryCode}.png`}
                  alt={`${info.city} flag`}
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div>
                <p className="text-slate-800 font-bold text-base leading-tight group-hover:text-blue-600 transition-colors">
                  {info.city}
                </p>
                <p className="text-slate-400 text-[13px] mt-0.5">
                  {info.currency} • {info.currencyName}
                </p>
              </div>
            </div>

            {/* Bottom section: Weather + Trend */}
            <div className="flex items-end justify-between mt-auto">
              <div className="flex items-center gap-3.5">
                <span className="text-[32px] leading-none drop-shadow-sm">{info.weatherEmoji}</span>
                <div>
                  <p className="text-slate-800 font-bold text-lg leading-tight">
                    {info.temp}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5 font-medium">
                    {info.condition}
                  </p>
                </div>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1 bg-[#E8F8F0] text-[#10B981] px-2.5 py-1.5 rounded-full text-xs font-bold tracking-tight">
                <ChevronUp className="w-3.5 h-3.5 stroke-[3]" />
                <span>{info.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
