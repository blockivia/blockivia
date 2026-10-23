import Link from "next/link";
import "./globals.css";
import { robotoMono, interfaceFontStyle } from "./fonts";
export default function NotFound() {
  return (
    <html lang="es" className={robotoMono.variable} style={interfaceFontStyle}>
      <body>
        <main className="section">
          <span className="eyebrow">404</span>
          <h1>BlockivIA</h1>
          <div className="hero-buttons">
            <Link className="button button-primary" href="/" lang="es">
              🇧🇴 Inicio ↗
            </Link>
            <Link className="button button-outline" href="/en/" lang="en">
              🇬🇧 Home ↗
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
