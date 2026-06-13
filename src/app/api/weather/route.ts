import { NextResponse } from "next/server";
import { z } from "zod";
import rateLimit from "@/lib/rate-limit";
import { fetchWeather } from "@/services/weather";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const QuerySchema = z.object({
  city: z.string().min(2, "City name must be at least 2 characters").max(50, "City name is too long"),
});

export async function GET(request: Request) {
  try {
    // 1. Rate Limiting based on IP
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // Limit to 5 requests per minute per IP
    await limiter.check(5, ip);

    // 2. Extract and Validate query parameters
    const { searchParams } = new URL(request.url);
    const cityParam = searchParams.get("city");
    
    const parsedParams = QuerySchema.safeParse({ city: cityParam });
    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Validation Error", details: parsedParams.error.issues },
        { status: 400 }
      );
    }

    // 3. Fetch data from Service
    const weatherData = await fetchWeather(parsedParams.data.city);
    return NextResponse.json(weatherData);

  } catch (error: any) {
    if (error === "Rate limit exceeded") {
      return NextResponse.json(
        { error: "Too Many Requests", message: "Please try again later." },
        { status: 429 }
      );
    }
    
    if (error.message === "City not found") {
      return NextResponse.json(
        { error: "Not Found", message: "Weather data for the requested city could not be found." },
        { status: 404 }
      );
    }

    // Generic error handling
    console.error("[Weather API Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: "Something went wrong." },
      { status: 500 }
    );
  }
}
