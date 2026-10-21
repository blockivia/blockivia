import Image from "next/image";
import Arrow from "./arrow";
import Link from "next/link";
import Navigation from "./navigation";
import TunnelScene from "./tunnel-scene";
import Academy from "./academy";
import Reveal from "./reveal";
import {
  approvedContent as content,
  copy,
  safeExternalUrl,
  siteLinks,
  type Locale,
} from "@/content/site";

function SolidObject({
  variant = "cube",
}: {
  variant?: "cube" | "rings" | "stack";
}) {
  return (
    <div className={`solid-object solid-${variant}`} aria-hidden="true">
      <div className="object-halo" />
      <div className="object-assembly">
        {variant === "cube" ? (
          <>
            <div className="cube-face face-front" />
            <div className="cube-face face-back" />
            <div className="cube-face face-left" />
            <div className="cube-face face-right" />
            <div className="cube-face face-top" />
            <div className="cube-face face-bottom" />
            <div className="cube-inner" />
          </>
        ) : (
          <>
            <i />
            <i />
            <i />
            <i />
            <i />
          </>
        )}
      </div>
      <div className="object-shadow" />
    </div>
  );
}

export default function Landing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const whatsapp = safeExternalUrl(siteLinks.whatsapp);
  const certificates = locale === "es" ? "/certificados/" : "/en/certificates/";
  return (
    <>
      <Navigation locale={locale} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title" data-block="1">
          <div className="hero-glow" />
          <TunnelScene />
          <div className="hero-content">
            <div className="hero-logo">
              <Image
                src="/logo.png"
                alt="BlockivIA"
                width={1000}
                height={1000}
                priority
              />
            </div>
            <h1 id="hero-title">{t.tagline}</h1>
            <p className="hero-subtitle">
              {locale === "es" ? (
                <>
                  <span className="subtitle-line">Soluciones, </span>
                  <span className="subtitle-line">Investigación </span>
                  <span>y Capacitación</span>
                </>
              ) : (
                <>
                  <span className="subtitle-line">Solutions, </span>
                  <span className="subtitle-line">Research </span>
                  <span>and Training</span>
                </>
              )}
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#presentation">
                {t.explore}
                <Arrow down />
              </a>
              <a
                className="button button-outline"
                href="mailto:info@blockivia.xyz"
              >
                {t.contact}
                <Arrow />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="coordinate">
              <span className="status-dot" />
              BlockivIA
            </span>
            <a href="#presentation" aria-label={t.explore}>
              <span className="scroll-line" />
              <span aria-hidden="true">↓</span>
            </a>
            <span className="hero-index">01 — 08</span>
          </div>
        </section>
        <div className="identity-strip" aria-hidden="true">
          <span>BLOCKCHAIN</span>
          <span className="strip-symbol">✳</span>
          <span>
            {locale === "es"
              ? "INTELIGENCIA ARTIFICIAL"
              : "ARTIFICIAL INTELLIGENCE"}
          </span>
          <span className="strip-symbol">✳</span>
          <span>BOLIVIA</span>
          <span className="strip-symbol">✳</span>
        </div>

        <section
          id="presentation"
          className="section split-section"
          data-block="2"
          aria-labelledby="presentation-title"
          data-reveal
        >
          <div className="section-heading">
            <span className="eyebrow">02 / {t.presentation}</span>
            <h2 id="presentation-title" className="presentation-statement">
              {content.presentation[locale]}
            </h2>
          </div>
          <div className="object-panel">
            <span className="panel-cross cross-top">+</span>
            <SolidObject />
            <span className="panel-cross cross-bottom">+</span>
          </div>
        </section>

        <section
          id="pillars"
          className="section pillars-section"
          data-block="3"
          aria-labelledby="pillars-title"
          data-reveal
        >
          <div className="section-top">
            <span className="eyebrow">03 / {t.pillars}</span>
            <h2 id="pillars-title">
              {t.pillars}
              <span className="heading-dot" aria-hidden="true">
                .
              </span>
            </h2>
          </div>
          <div className="pillars-grid">
            {content.pillars.map((pillar, i) => (
              <article className="pillar-card" key={i}>
                <div className="pillar-art">
                  <SolidObject
                    variant={i === 0 ? "cube" : i === 1 ? "rings" : "stack"}
                  />
                </div>
                <span className="pillar-number">0{i + 1}</span>
                <h3>{pillar.title[locale]}</h3>
                <p>{pillar.description[locale]}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="capabilities"
          className="section capabilities-section"
          data-block="4"
          aria-labelledby="capabilities-title"
          data-reveal
        >
          <div className="section-top">
            <span className="eyebrow">04 / {t.capabilities}</span>
            <h2 id="capabilities-title">
              {t.capabilities}
              <span className="heading-dot" aria-hidden="true">
                .
              </span>
            </h2>
          </div>
          <div className="capabilities-grid">
            {content.capabilities.map((capability, i) => (
              <article className="capability" key={i}>
                <span className="capability-number">0{i + 1}</span>
                <div className="capability-mini" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{capability[locale]}</h3>
              </article>
            ))}
          </div>
        </section>

        <section
          id="institutions"
          className="section institutions-section"
          data-block="5"
          aria-labelledby="institutions-title"
          data-reveal
        >
          <div className="research-art">
            <SolidObject variant="rings" />
            <span className="orbit-line orbit-one" />
            <span className="orbit-line orbit-two" />
            <span className="orbit-point point-red" />
            <span className="orbit-point point-yellow" />
          </div>
          <div className="section-heading">
            <span className="eyebrow">05 / {t.institutions}</span>
            <h2 id="institutions-title">
              {t.institutions}
              <span className="heading-dot" aria-hidden="true">
                .
              </span>
            </h2>
            <p className="section-copy">{content.institutions[locale]}</p>
          </div>
        </section>

        <section
          id="academy"
          className="section academy-section"
          data-block="6"
          aria-labelledby="academy-title"
          data-reveal
        >
          <div className="section-heading">
            <span className="eyebrow">06 / {t.academy}</span>
            <h2 id="academy-title">
              {t.academy}
              <span className="heading-dot" aria-hidden="true">
                .
              </span>
            </h2>
            <h3 className="academy-subtitle">{t.freeCourses}</h3>
            <p className="section-copy">{content.academy[locale]}</p>
            <Link className="text-link" href={certificates}>
              {t.certificates}
              <Arrow />
            </Link>
          </div>
          <Academy locale={locale} />
        </section>

        <section
          id="track-record"
          className="section trajectory-section"
          data-block="7"
          aria-labelledby="track-record-title"
          data-reveal
        >
          <span className="eyebrow">07 / {t.trackRecord}</span>
          <div className="trajectory-inner">
            <h2 id="track-record-title">
              {t.trackRecord}
              <span className="heading-dot" aria-hidden="true">
                .
              </span>
            </h2>
            <p className="trajectory-copy">{content.trackRecord[locale]}</p>
          </div>
          <div className="bolivia-line" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
          data-block="8"
          aria-labelledby="contact-title"
          data-reveal
        >
          <span className="eyebrow">08 / {t.contact}</span>
          <div className="contact-inner">
            <div>
              <h2 id="contact-title">
                {t.contact}
                <span className="heading-dot" aria-hidden="true">
                  .
                </span>
              </h2>
              <a className="contact-email" href="mailto:info@blockivia.xyz">
                info@blockivia.xyz
                <Arrow />
              </a>
              <div className="contact-buttons">
                <a
                  className="button button-primary"
                  href="mailto:info@blockivia.xyz"
                >
                  {t.contactAction}
                  <Arrow />
                </a>
                {whatsapp ? (
                  <a
                    className="button button-outline"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.channel}
                    <Arrow />
                  </a>
                ) : (
                  <button
                    className="button button-outline"
                    disabled
                    title={t.unavailable}
                  >
                    {t.channel}
                  </button>
                )}
              </div>
            </div>
            <SolidObject variant="stack" />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <Link href={locale === "es" ? "/" : "/en/"} className="footer-logo">
            <span className="brand-crop">
              <Image
                src="/logo.png"
                alt="BlockivIA"
                width={1000}
                height={1000}
              />
            </span>
          </Link>
          <nav aria-label={t.networks}>
            {siteLinks.socials.map((social) => {
              const url = safeExternalUrl(social.url);
              return url ? (
                <a
                  key={social.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name} <Arrow />
                </a>
              ) : (
                <button key={social.name} disabled title={t.unavailable}>
                  {social.name} <Arrow />
                </button>
              );
            })}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} BlockivIA</span>
          <Link href={certificates}>
            {t.certificates} <Arrow />
          </Link>
          <span>
            Bolivia{" "}
            <span className="footer-colors" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>
      </footer>
      <Reveal />
    </>
  );
}
