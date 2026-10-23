import Link from "next/link";
import { Providers } from "@/app/providers";
import CertificateClient from "./certificate-client";
import { copy, type Locale } from "@/content/site";

export default function CertificatePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <a href="#certificate" className="skip-link">
        {t.skip}
      </a>
      <header className="certificate-header">
        <Link href={locale === "es" ? "/" : "/en/"}>↖ {t.back}</Link>
        <Link
          href={locale === "es" ? "/en/certificates/" : "/certificados/"}
          hrefLang={locale === "es" ? "en" : "es"}
        >
          {locale === "es" ? "🇬🇧 ENG" : "🇧🇴 SPA"}
        </Link>
      </header>
      <div id="certificate">
        <Providers>
          <CertificateClient locale={locale} />
        </Providers>
      </div>
      <p className="certificate-note">{t.web3Note}</p>
    </>
  );
}
