"use client";

import type { WeatherData } from "@/services/weather";
import {
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  MapPin,
} from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
}

function getWeatherIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes("rain")) return <CloudRain className="w-16 h-16 text-blue-400" />;
  if (c.includes("cloud")) return <Cloud className="w-16 h-16 text-slate-300" />;
  if (c.includes("thunder") || c.includes("lightning"))
    return <CloudLightning className="w-16 h-16 text-yellow-400" />;
  return <Sun className="w-16 h-16 text-amber-400" />;
}

function getTemperatureColor(temp: number) {
  if (temp <= 5) return "from-blue-400 to-cyan-300";
  if (temp <= 15) return "from-cyan-400 to-teal-300";
  if (temp <= 25) return "from-green-400 to-emerald-300";
  if (temp <= 35) return "from-orange-400 to-amber-300";
  return "from-red-500 to-orange-400";
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const tempGradient = getTemperatureColor(data.temperature);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden
      transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)]
      animate-[fadeInUp_0.5s_ease_both]">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Weather</span>
          </div>
          <h2 className="text-3xl font-bold text-white">{data.city}</h2>
          <span className="text-slate-400 text-sm mt-0.5 block">{data.condition}</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
          {getWeatherIcon(data.condition)}
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-6">
        <span
          className={`text-7xl font-black bg-gradient-to-r ${tempGradient} bg-clip-text text-transparent`}
        >
          {data.temperature}°C
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatPill
          icon={<Thermometer className="w-4 h-4 text-orange-400" />}
          label="Feels Like"
          value={`${data.temperature - 2}°C`}
        />
        <StatPill
          icon={<Droplets className="w-4 h-4 text-blue-400" />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <StatPill
          icon={<Wind className="w-4 h-4 text-teal-400" />}
          label="Wind"
          value={`${data.windSpeed} km/h`}
          className="col-span-2"
        />
      </div>
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 ${className}`}
    >
      {icon}
      <div>
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  );
}
