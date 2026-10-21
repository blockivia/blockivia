import Navigation from "./navigation";
import PrerenderedMedia from "./prerendered-media";
import Academy from "./academy";
import Reveal from "./reveal";
import { availableMedia } from "@/lib/media";
import {
  approvedContent as content,
  copy,
  safeExternalUrl,
  siteLinks,
  type Locale,
} from "@/content/site";

export default function Landing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const media = availableMedia();
  const whatsapp = safeExternalUrl(siteLinks.whatsapp);
  const pillarImages = [media.solutions, media.research, media.training];
  return (
    <>
      <Navigation locale={locale} />
      <main id="main">
        <section
          className="hero container"
          aria-labelledby="hero-title"
          data-block="1"
        >
          <div className="hero-content">
            <h1 id="hero-title">{t.subtitle}</h1>
            <a
              className="button button-primary"
              href="mailto:info@blockivia.xyz"
            >
              {t.contactAction}
            </a>
          </div>
          <PrerenderedMedia
            slot="hero"
            imageSrc={media.heroPoster}
            videoSrc={media.heroVideo}
          />
        </section>
        <section
          id="presentation"
          className="section container presentation-section"
          data-block="2"
          aria-labelledby="presentation-title"
        >
          <h2 id="presentation-title">{t.presentation}</h2>
          <p>{content.presentation[locale]}</p>
        </section>
        <section
          id="pillars"
          className="section container"
          data-block="3"
          aria-labelledby="pillars-title"
        >
          <h2 id="pillars-title">{t.pillars}</h2>
          <div className="pillars-grid">
            {content.pillars.map((pillar, i) => (
              <article className="pillar-card" key={pillar.title.es}>
                <PrerenderedMedia
                  slot={["solutions", "research", "training"][i]}
                  imageSrc={pillarImages[i]}
                />
                <h3>{pillar.title[locale]}</h3>
                <p>{pillar.description[locale]}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="capabilities"
          className="section container"
          data-block="4"
          aria-labelledby="capabilities-title"
        >
          <h2 id="capabilities-title">{t.capabilities}</h2>
          <ul className="capabilities-list">
            {content.capabilities.map((capability) => (
              <li key={capability.es}>{capability[locale]}</li>
            ))}
          </ul>
        </section>
        <section
          id="institutions"
          className="section container editorial-section"
          data-block="5"
          aria-labelledby="institutions-title"
        >
          <h2 id="institutions-title">{t.institutions}</h2>
          <p>{content.institutions[locale]}</p>
        </section>
        <section
          id="academy"
          className="section container"
          data-block="6"
          aria-labelledby="academy-title"
        >
          <h2 id="academy-title">{t.academy}</h2>
          <div className="academy-intro">
            <h3>{t.freeCourses}</h3>
            <p>{content.academy[locale]}</p>
          </div>
          <Academy locale={locale} />
        </section>
        <section
          id="track-record"
          className="section container editorial-section"
          data-block="7"
          aria-labelledby="track-record-title"
        >
          <h2 id="track-record-title">{t.trackRecord}</h2>
          <p>{content.trackRecord[locale]}</p>
        </section>
        <section
          id="contact"
          className="section container contact-section"
          data-block="8"
          aria-labelledby="contact-title"
        >
          <h2 id="contact-title">{t.contact}</h2>
          <a className="contact-email" href="mailto:info@blockivia.xyz">
            info@blockivia.xyz
          </a>
          <div className="contact-buttons">
            <a
              className="button button-primary"
              href="mailto:info@blockivia.xyz"
            >
              {t.contactAction}
            </a>
            {whatsapp && (
              <a
                className="button button-outline"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.channel}
              </a>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer container">
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
                {social.name}
              </a>
            ) : (
              <button key={social.name} disabled title={t.unavailable}>
                {social.name}
              </button>
            );
          })}
        </nav>
        <p>© {new Date().getFullYear()} BlockivIA</p>
      </footer>
      <Reveal />
    </>
  );
}
