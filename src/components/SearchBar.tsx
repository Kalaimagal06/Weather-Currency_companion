"use client";

import { useState, type FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

const SUGGESTIONS = ["London", "Paris", "New York", "Tokyo", "Sydney", "Delhi"];

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) {
      onSearch(value.trim());
    }
  };

  const handleSuggestion = (city: string) => {
    setValue(city);
    onSearch(city);
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="relative group">
        <div
          className={`
            flex items-center gap-3 rounded-2xl border px-5 py-4
            bg-white shadow-sm transition-all duration-300
            ${focused
              ? "border-blue-400 shadow-[0_4px_30px_rgba(59,130,246,0.15)]"
              : "border-slate-200 hover:border-slate-300 hover:shadow-md"
            }
          `}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
          )}
          <input
            id="city-search"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search a city, e.g. Tokyo…"
            disabled={loading}
            className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-lg outline-none disabled:opacity-60"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={loading || !value.trim()}
            className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm
              transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
              shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]"
          >
            Search
          </button>
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map((city) => (
          <button
            key={city}
            onClick={() => handleSuggestion(city)}
            disabled={loading}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-600 border border-slate-200
              bg-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm
              transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
