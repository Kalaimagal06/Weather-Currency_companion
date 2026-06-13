"use client";

import { useState, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import CurrencyCard from "@/components/CurrencyCard";
import HeroHeader from "@/components/HeroHeader";
import CityHint from "@/components/CityHint";
import type { WeatherData } from "@/services/weather";
import type { CurrencyData } from "@/services/currency";

const CITY_CURRENCIES: Record<string, string> = {
  london: "GBP",
  paris: "EUR",
  "new york": "USD",
  tokyo: "JPY",
  sydney: "AUD",
  delhi: "INR",
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; weather: WeatherData; currency: CurrencyData }
  | { status: "error"; message: string };

export default function HomePage() {
  const [state, setState] = useState<State>({ status: "idle" });

  const handleSearch = useCallback(async (city: string) => {
    setState({ status: "loading" });

    try {
      const weatherRes = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

      if (weatherRes.status === 429) {
        setState({
          status: "error",
          message: "⚡ Rate limit reached. Please wait a moment and try again.",
        });
        return;
      }

      if (!weatherRes.ok) {
        const body = await weatherRes.json();
        setState({
          status: "error",
          message: body.message ?? "Could not fetch weather data.",
        });
        return;
      }

      const weather = await weatherRes.json();
      const baseCurrency = weather.currencyCode || "USD";

      const currencyRes = await fetch(`/api/currency?base=${baseCurrency}`);
      if (!currencyRes.ok) {
        setState({
          status: "error",
          message: "Could not fetch currency data.",
        });
        return;
      }

      const currency = await currencyRes.json();

      setState({ status: "success", weather, currency });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection.",
      });
    }
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/60 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-200/60 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-10 md:py-16 flex-1">
        <HeroHeader />

        <div className="w-full max-w-2xl mt-10">
          <SearchBar onSearch={handleSearch} loading={state.status === "loading"} />
        </div>

        {state.status === "idle" && <CityHint />}

        {state.status === "loading" && (
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm">Fetching travel data…</p>
          </div>
        )}

        {state.status === "error" && (
          <div className="mt-12 max-w-lg w-full">
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-md p-6 text-center">
              <p className="text-2xl mb-2">⚠️</p>
              <p className="text-red-300 font-medium">{state.message}</p>
            </div>
          </div>
        )}

        {state.status === "success" && (
          <div className="mt-12 w-full max-w-5xl grid gap-6 md:grid-cols-2">
            <WeatherCard data={state.weather} />
            <CurrencyCard data={state.currency} />
          </div>
        )}
      </div>
    </main>
  );
}
