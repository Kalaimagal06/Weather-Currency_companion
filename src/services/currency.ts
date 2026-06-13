export interface CurrencyData {
  base: string;
  rates: Record<string, number>;
}

const MAJOR_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "AUD", "INR", "CAD", "CHF", "CNY"];

export async function fetchCurrencyRates(base: string): Promise<CurrencyData> {
  const normalizedBase = base.toUpperCase().trim();
  
  const res = await fetch(`https://open.er-api.com/v6/latest/${normalizedBase}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rates for: ${base}`);
  }
  
  const data = await res.json();
  if (data.result !== "success") {
    throw new Error(`Failed to fetch exchange rates for: ${base}`);
  }

  const rates: Record<string, number> = {};
  for (const currency of MAJOR_CURRENCIES) {
    if (currency !== normalizedBase && data.rates[currency]) {
      rates[currency] = data.rates[currency];
    }
  }

  return {
    base: normalizedBase,
    rates,
  };
}
