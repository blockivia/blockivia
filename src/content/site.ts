export type Locale = "es" | "en";
export type BilingualText = Record<Locale, string>;

/** Approved Spanish copy, kept verbatim. English translations live alongside it. */
export const approvedContent = {
  presentation: {
    es: "BlockivIA integra inteligencia artificial, blockchain y formación aplicada para desarrollar soluciones, impulsar investigación y expandir capacidades tecnológicas.",
    en: "BlockivIA brings together artificial intelligence, blockchain and applied training to develop solutions, advance research and expand technological capabilities.",
  },
  pillars: [
    {
      title: { es: "Soluciones", en: "Solutions" },
      description: {
        es: "Desarrollo de soluciones y herramientas basadas en IA y Blockchain.",
        en: "Development of solutions and tools based on AI and Blockchain.",
      },
    },
    {
      title: { es: "Investigación", en: "Research" },
      description: {
        es: "Exploración aplicada, prototipos y trabajo con entornos académicos y científicos.",
        en: "Applied exploration, prototypes and work in academic and scientific environments.",
      },
    },
    {
      title: { es: "Capacitación", en: "Training" },
      description: {
        es: "Cursos, talleres y programas formativos en IA y Blockchain.",
        en: "Courses, workshops and training programs in AI and Blockchain.",
      },
    },
  ],
  capabilities: [
    { es: "Automatización y agentes", en: "Automation and agents" },
    { es: "Herramientas digitales", en: "Digital tools" },
    {
      es: "Soluciones basadas en Blockchain",
      en: "Blockchain-based solutions",
    },
    { es: "Capacitación en IA y Blockchain", en: "AI and Blockchain training" },
    {
      es: "Prototipos y aplicaciones para empresas",
      en: "Prototypes and applications for businesses",
    },
  ],
  institutions: {
    es: "Trabajamos con instituciones que requieren actualización e implementación tecnológica, con soluciones adaptadas a su ritmo y a la naturaleza de sus necesidades.",
    en: "We work with institutions that need technological modernization and implementation, with solutions adapted to their pace and the nature of their needs.",
  },
  academy: {
    es: "Cursos, talleres y capacitación en inteligencia artificial y blockchain.",
    en: "Courses, workshops and training in artificial intelligence and blockchain.",
  },
  trackRecord: {
    es: "Nuestra trayectoria incluye colaboración con 7 universidades de Bolivia y trabajo conjunto con Sociedades Científicas y Laboratorios de Investigación de la UMSA y la UAGRM.",
    en: "Our track record includes collaboration with 7 universities in Bolivia and joint work with Scientific Societies and Research Laboratories at UMSA and UAGRM.",
  },
} satisfies {
  presentation: BilingualText;
  pillars: { title: BilingualText; description: BilingualText }[];
  capabilities: BilingualText[];
  institutions: BilingualText;
  academy: BilingualText;
  trackRecord: BilingualText;
};

/** Public destinations only. Never put API keys or credentials here. */
export const siteLinks: {
  whatsapp: string | null;
  socials: { name: string; url: string | null }[];
} = {
  whatsapp: "https://whatsapp.com/channel/0029VbDDJ770rGiGzbR1xd14",
  socials: [
    { name: "LinkedIn", url: null },
    { name: "Instagram", url: null },
    { name: "X", url: null },
    { name: "YouTube", url: null },
  ],
};
export type AcademyVideo = {
  youtubeId: string;
  title: BilingualText;
  description?: BilingualText;
};
/** Add only real, approved videos; no sample courses, thumbnails, or video IDs. */
export const academyVideos: AcademyVideo[] = [];
export function safeExternalUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export const copy = {
  es: {
    lang: "Español",
    nav: ["Soluciones", "Academia", "Trayectoria", "Contacto"],
    tagline: "Blockchain + IA en Bolivia",
    subtitle: "Soluciones, Investigación y Capacitación",
    explore: "Explorar",
    contact: "Contacto",
    contactAction: "Contactar a BlockivIA",
    presentation: "Presentación",
    pillars: "Tres pilares",
    capabilities: "Capacidades",
    institutions: "Instituciones",
    academy: "Academia",
    freeCourses: "Cursos gratuitos",
    trackRecord: "Trayectoria",
    channel: "Canal de WhatsApp",
    certificates: "Certificados Web3",
    openMenu: "Abrir navegación",
    closeMenu: "Cerrar navegación",
    navigation: "Navegación principal",
    language: "Idioma",
    skip: "Saltar al contenido",
    home: "Inicio",
    unavailable: "Enlace pendiente de configurar",
    watch: "Ver video",
    close: "Cerrar video",
    networks: "Redes sociales",
    back: "Volver a BlockivIA",
    web3Note: "Sepolia · Wallet requerida para reclamar",
  },
  en: {
    lang: "English",
    nav: ["Solutions", "Academy", "Track record", "Contact"],
    tagline: "Blockchain + AI in Bolivia",
    subtitle: "Solutions, Research and Training",
    explore: "Explore",
    contact: "Contact",
    contactAction: "Contact BlockivIA",
    presentation: "Introduction",
    pillars: "Three pillars",
    capabilities: "Capabilities",
    institutions: "Institutions",
    academy: "Academy",
    freeCourses: "Free courses",
    trackRecord: "Track record",
    channel: "WhatsApp channel",
    certificates: "Web3 certificates",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    navigation: "Main navigation",
    language: "Language",
    skip: "Skip to content",
    home: "Home",
    unavailable: "Link awaiting configuration",
    watch: "Watch video",
    close: "Close video",
    networks: "Social media",
    back: "Back to BlockivIA",
    web3Note: "Sepolia · Wallet required to claim",
  },
} as const;
