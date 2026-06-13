"use client";

import { Globe2, Compass } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {/* Logo badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-blue-300 font-medium">
        <Compass className="w-4 h-4" />
        <span>Travel Companion</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
          Weather &amp;
        </span>
        <br />
        <span className="bg-gradient-to-r from-violet-400 via-pink-300 to-orange-300 bg-clip-text text-transparent">
          Currency
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
        Search any destination to instantly get the local{" "}
        <span className="text-blue-400 font-medium">weather forecast</span> and{" "}
        <span className="text-violet-400 font-medium">live exchange rates</span>.
      </p>

      {/* Supported cities */}
      <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
        <Globe2 className="w-4 h-4" />
        <span>London · Paris · New York · Tokyo · Sydney · Delhi</span>
      </div>
    </div>
  );
}
