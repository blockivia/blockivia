"use client";

import Image from "next/image";
import Arrow from "./arrow";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { copy, type Locale } from "@/content/site";

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export default function Navigation({ locale }: { locale: Locale }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );
  const t = copy[locale];
  const home = locale === "es" ? "/" : "/en/";
  const ids = ["pillars", "academy", "track-record", "contact"];
  const languages = (
    <div className="language-switch" aria-label={t.language}>
      <Link
        prefetch={false}
        href={"/" + hash}
        hrefLang="es"
        lang="es"
        aria-current={locale === "es" ? "page" : undefined}
      >
        <span aria-hidden="true">🇧🇴</span> SPA
      </Link>
      <Link
        prefetch={false}
        href={"/en/" + hash}
        hrefLang="en"
        lang="en"
        aria-current={locale === "en" ? "page" : undefined}
      >
        <span aria-hidden="true">🇬🇧</span> ENG
      </Link>
    </div>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <Link
          className="brand"
          href={home}
          aria-label={`BlockivIA — ${t.home}`}
        >
          <span className="brand-crop">
            <Image
              src="/logo.png"
              alt="BlockivIA"
              width={1000}
              height={1000}
              priority
            />
          </span>
        </Link>
        <nav className="desktop-nav" aria-label={t.navigation}>
          {t.nav.map((label, i) => (
            <a key={label} href={`#${ids[i]}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          {languages}
          <button
            className="menu-toggle"
            aria-label={t.openMenu}
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.classList.add("menu-open");
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-dialog"
        ref={dialog}
        aria-label={t.navigation}
        onClose={() => document.body.classList.remove("menu-open")}
      >
        <form method="dialog">
          <button className="menu-close" aria-label={t.closeMenu}>
            ×
          </button>
        </form>
        <nav>
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={`#${ids[i]}`}
              onClick={() => dialog.current?.close()}
            >
              <span>0{i + 1}</span>
              {label}
              <Arrow />
            </a>
          ))}
        </nav>
        {languages}
        <a className="mobile-mail" href="mailto:info@blockivia.xyz">
          info@blockivia.xyz <Arrow />
        </a>
      </dialog>
    </>
  );
}
