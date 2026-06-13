"use client";

import { Globe2, Compass } from "lucide-react";

export default function HeroHeader() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {/* Logo badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-blue-600 font-medium">
        <Compass className="w-4 h-4" />
        <span>Travel Companion</span>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Weather &amp;
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Currency
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
        Search any destination to instantly get the local{" "}
        <span className="text-blue-500 font-medium">weather forecast</span> and{" "}
        <span className="text-violet-500 font-medium">live exchange rates</span>.
      </p>

      {/* Supported cities */}
      <div className="flex items-center gap-2 mt-1 text-slate-500 text-sm">
        <Globe2 className="w-4 h-4" />
        <span>London · Paris · New York · Tokyo · Sydney · Delhi</span>
      </div>
    </div>
  );
}
