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
  CAD: "🇨🇦",
  CHF: "🇨🇭",
  CNY: "🇨🇳",
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  INR: "Indian Rupee",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
};

export default function CurrencyCard({ data }: CurrencyCardProps) {
  const otherCurrencies = Object.entries(data.rates).filter(
    ([code]) => code !== data.base
  );

  return (
      <div
        className="relative rounded-3xl border border-slate-100 bg-white shadow-sm p-6 overflow-hidden
          transition-all duration-300 hover:border-slate-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          animate-[fadeInUp_0.5s_ease_0.1s_both]"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Exchange Rates</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">
              {CURRENCY_FLAGS[data.base]} {data.base}
            </h2>
            <span className="text-slate-500 text-sm mt-0.5 block">
              {CURRENCY_NAMES[data.base] ?? "Local Currency"}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-violet-50 border border-violet-100">
            <DollarSign className="w-10 h-10 text-violet-500" />
          </div>
        </div>

        {/* Rate: 1 base = X */}
        <div className="mb-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-100">
          <p className="text-slate-500 text-xs mb-0.5">Base Currency</p>
          <p className="text-slate-800 font-bold text-lg">
            1 {data.base} = …
          </p>
        </div>

        {/* Rates list */}
        <div className="flex flex-col gap-2">
          {otherCurrencies.map(([code, rate]) => (
            <div
              key={code}
              className="flex items-center justify-between px-4 py-3 rounded-xl
                bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200
                transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{CURRENCY_FLAGS[code] ?? "🏳️"}</span>
                <div>
                  <p className="text-slate-700 font-semibold text-sm">{code}</p>
                  <p className="text-slate-500 text-xs">{CURRENCY_NAMES[code] ?? code}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-500 transition-colors" />
                <span className="text-violet-600 font-bold text-base tabular-nums">
                  {rate.toFixed(4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
