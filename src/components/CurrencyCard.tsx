"use client";

import type { CurrencyData } from "@/services/currency";
import { DollarSign, TrendingUp, ArrowRight } from "lucide-react";

interface CurrencyCardProps {
  data: CurrencyData;
}

const CURRENCY_FLAGS: Record<string, string> = {
  USD: "🇺🇸",
  EUR: "🇪🇺",
  GBP: "🇬🇧",
  JPY: "🇯🇵",
  AUD: "🇦🇺",
  INR: "🇮🇳",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  INR: "Indian Rupee",
};

export default function CurrencyCard({ data }: CurrencyCardProps) {
  const otherCurrencies = Object.entries(data.rates).filter(
    ([code]) => code !== data.base
  );

  return (
    <div
      className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 overflow-hidden
        transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]
        animate-[fadeInUp_0.5s_ease_0.1s_both]"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Exchange Rates</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            {CURRENCY_FLAGS[data.base]} {data.base}
          </h2>
          <span className="text-slate-400 text-sm mt-0.5 block">
            {CURRENCY_NAMES[data.base] ?? "Local Currency"}
          </span>
        </div>
        <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20">
          <DollarSign className="w-10 h-10 text-violet-400" />
        </div>
      </div>

      {/* Rate: 1 base = X */}
      <div className="mb-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20">
        <p className="text-slate-400 text-xs mb-0.5">Base Currency</p>
        <p className="text-white font-bold text-lg">
          1 {data.base} = …
        </p>
      </div>

      {/* Rates list */}
      <div className="flex flex-col gap-2">
        {otherCurrencies.map(([code, rate]) => (
          <div
            key={code}
            className="flex items-center justify-between px-4 py-3 rounded-xl
              bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20
              transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{CURRENCY_FLAGS[code] ?? "🏳️"}</span>
              <div>
                <p className="text-white font-semibold text-sm">{code}</p>
                <p className="text-slate-500 text-xs">{CURRENCY_NAMES[code] ?? code}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-violet-400 transition-colors" />
              <span className="text-violet-300 font-bold text-base tabular-nums">
                {rate.toFixed(4)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
