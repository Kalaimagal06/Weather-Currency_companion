export interface CurrencyData {
  base: string;
  rates: Record<string, number>;
}

const BASE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.5,
  AUD: 1.54,
  INR: 83.2,
};

export async function fetchCurrencyRates(base: string): Promise<CurrencyData> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 400));

  const normalizedBase = base.toUpperCase().trim();
  
  if (!BASE_RATES[normalizedBase]) {
    throw new Error(`Unsupported base currency: ${base}`);
  }

  const baseRate = BASE_RATES[normalizedBase];
  const rates: Record<string, number> = {};

  for (const [currency, rate] of Object.entries(BASE_RATES)) {
    // Convert to the requested base currency
    rates[currency] = parseFloat((rate / baseRate).toFixed(4));
  }

  return {
    base: normalizedBase,
    rates,
  };
}
