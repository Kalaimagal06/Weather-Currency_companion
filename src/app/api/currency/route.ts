import { NextResponse } from "next/server";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";
import { fetchCurrencyRates } from "@/services/currency";

const limiter = rateLimit({
  interval: 60 * 1000, 
  uniqueTokenPerInterval: 500, 
});

const QuerySchema = z.object({
  base: z.string().length(3, "Base currency must be a 3-letter code"),
});

export async function GET(request: Request) {
  try {
    // 1. Rate Limiting based on IP
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // Limit to 10 requests per minute per IP for currency
    await limiter.check(10, ip);

    // 2. Extract and Validate query parameters
    const { searchParams } = new URL(request.url);
    const baseParam = searchParams.get("base") || "USD";
    
    const parsedParams = QuerySchema.safeParse({ base: baseParam });
    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Validation Error", details: parsedParams.error.issues },
        { status: 400 }
      );
    }

    // 3. Fetch data from Service
    const currencyData = await fetchCurrencyRates(parsedParams.data.base);
    return NextResponse.json(currencyData);

  } catch (error: any) {
    if (error === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Too Many Requests", message: "Please try again later." },
        { status: 429 }
      );
    }
    
    if (error.message?.includes("Unsupported base currency")) {
      return NextResponse.json(
        { error: "Bad Request", message: error.message },
        { status: 400 }
      );
    }

    // Generic error handling
    console.error("[Currency API Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Something went wrong." },
      { status: 500 }
    );
  }
}
