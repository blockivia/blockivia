import type { Metadata } from "next";
import "../globals.css";
import { robotoMono, interfaceFontStyle } from "../fonts";

export const metadata: Metadata = {
  title: "BlockivIA — Blockchain + IA en Bolivia",
  description: "Soluciones, Investigación y Capacitación.",
  icons: { icon: "/logo.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={robotoMono.variable} style={interfaceFontStyle}>
      <body>{children}</body>
    </html>
  );
}
