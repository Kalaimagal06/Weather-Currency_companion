import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Travel Weather & Currency Companion",
  description:
    "Your all-in-one travel assistant. Get real-time weather forecasts and live currency exchange rates for your destination city.",
  keywords: ["travel", "weather", "currency", "exchange rate", "forecast"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
