import { Roboto_Mono } from "next/font/google";
import type { CSSProperties } from "react";

// Chosen interface typeface; this is not a claim about the logo's original font.
export const robotoMono = Roboto_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-roboto-mono",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

// Keep the actual next/font family while excluding any automatic proportional fallback.
export const interfaceFontStyle = {
  "--font-interface": `${robotoMono.style.fontFamily.split(",")[0]}, monospace`,
} as CSSProperties;
