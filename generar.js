const fs = require('fs');
const path = require('path');

// 1. Leer tu archivo logo.png real desde la carpeta public
const logoPath = path.join(__dirname, 'public', 'logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('ERROR: No se encontró public/logo.png. Verifica que el archivo esté en la carpeta public.');
  process.exit(1);
}

const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

// 2. Generar el SVG con tu logo.png real incrustado y visible al 100%
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 920" width="100%" height="100%">
  <defs>
    <pattern id="cyberGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#121D2C" stroke-width="0.8"/>
      <circle cx="0" cy="0" r="1" fill="#00FFA3" fill-opacity="0.3"/>
    </pattern>

    <radialGradient id="topTealGlow" cx="50%" cy="12%" r="45%">
      <stop offset="0%" stop-color="#00FFA3" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#00D2FF" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#06090F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00FFA3" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#06090F" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="acrylicBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#111B29" stop-opacity="0.88"/>
      <stop offset="40%" stop-color="#0A121E" stop-opacity="0.94"/>
      <stop offset="100%" stop-color="#060B12" stop-opacity="0.96"/>
    </linearGradient>

    <linearGradient id="acrylicEdge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00FFA3" stop-opacity="0.9"/>
      <stop offset="25%" stop-color="#00D2FF" stop-opacity="0.4"/>
      <stop offset="70%" stop-color="#1E2F46" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00FFA3" stop-opacity="0.8"/>
    </linearGradient>

    <linearGradient id="glassSheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08"/>
      <stop offset="35%" stop-color="#FFFFFF" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>

    <filter id="plateShadow" x="-10%" y="-10%" width="120%" height="125%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.75"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#00FFA3" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Fondo base carbón/slate mate -->
  <rect width="600" height="920" fill="#070A10"/>
  <rect width="600" height="920" fill="url(#cyberGrid)"/>
  <rect width="600" height="920" fill="url(#topTealGlow)"/>
  <rect width="600" height="920" fill="url(#centerGlow)"/>

  <!-- Geometría técnica 3D de fondo -->
  <g transform="translate(38, 55) scale(0.65)" opacity="0.45">
    <polygon points="30,0 60,17 30,34 0,17" fill="#142436" stroke="#00FFA3" stroke-width="1"/>
    <polygon points="0,17 30,34 30,68 0,51" fill="#0A1521" stroke="#00FFA3" stroke-width="1"/>
    <polygon points="30,34 60,17 60,51 30,68" fill="#0E1C2B" stroke="#00FFA3" stroke-width="1"/>
  </g>
  <g transform="translate(522, 55) scale(0.65)" opacity="0.45">
    <polygon points="30,0 60,17 30,34 0,17" fill="#142436" stroke="#00D2FF" stroke-width="1"/>
    <polygon points="0,17 30,34 30,68 0,51" fill="#0A1521" stroke="#00D2FF" stroke-width="1"/>
    <polygon points="30,34 60,17 60,51 30,68" fill="#0E1C2B" stroke="#00D2FF" stroke-width="1"/>
  </g>

  <!-- Marco exterior con esquineros neón -->
  <rect x="20" y="20" width="560" height="880" rx="14" fill="none" stroke="#132030" stroke-width="1.2"/>
  <path d="M 20 55 L 20 20 L 55 20" fill="none" stroke="#00FFA3" stroke-width="2.5"/>
  <path d="M 580 55 L 580 20 L 545 20" fill="none" stroke="#00FFA3" stroke-width="2.5"/>
  <path d="M 20 865 L 20 900 L 55 900" fill="none" stroke="#00FFA3" stroke-width="2.5"/>
  <path d="M 580 865 L 580 900 L 545 900" fill="none" stroke="#00FFA3" stroke-width="2.5"/>

  <!-- TU LOGO REAL DE logo.png (AMPLIADO Y 100% INCRUSTADO) -->
  <image href="${logoDataUri}" x="50" y="20" width="500" height="190" preserveAspectRatio="xMidYMid meet"/>

  <!-- Placa de acrílico translúcido 3D -->
  <rect x="42" y="225" width="516" height="580" rx="18" fill="url(#acrylicBody)" stroke="url(#acrylicEdge)" stroke-width="1.5" filter="url(#plateShadow)"/>
  <rect x="42" y="225" width="516" height="580" rx="18" fill="url(#glassSheen)"/>

  <!-- Insignia hexagonal Web3 -->
  <g transform="translate(300, 282)">
    <polygon points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18" fill="#0A131E" stroke="#16293D" stroke-width="4"/>
    <polygon points="0,-33 28,-16.5 28,16.5 0,33 -28,16.5 -28,-16.5" fill="#060C14" stroke="#00FFA3" stroke-width="1.8"/>
    <circle cx="0" cy="0" r="14" fill="#00FFA3" fill-opacity="0.14"/>
    <path d="M -8 0 L -2 6 L 8 -5" fill="none" stroke="#00FFA3" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <text x="300" y="342" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="700" fill="#00FFA3" letter-spacing="3.5">
    CERTIFICADO OFICIAL ON-CHAIN
  </text>
  <text x="300" y="376" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="23" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
    ACREDITACIÓN DE TALLER
  </text>
  
  <line x1="210" y1="396" x2="390" y2="396" stroke="#00FFA3" stroke-width="1" stroke-opacity="0.45"/>
  <polygon points="300,394 303,396 300,398 297,396" fill="#00FFA3"/>

  <text x="300" y="430" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="600" fill="#889BB0" letter-spacing="1.5">
    OTORGADO A LA BILLETERA
  </text>
  
  <rect x="90" y="444" width="420" height="42" rx="9" fill="#04080F" stroke="#17283C" stroke-width="1.2"/>
  <text x="300" y="471" text-anchor="middle" font-family="'Consolas', 'Courier New', monospace" font-size="15" font-weight="700" fill="#00FFA3" letter-spacing="1">
    0x71C84...d9B29
  </text>

  <text x="300" y="515" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" font-weight="600" fill="#889BB0" letter-spacing="1.5">
    POR COMPLETAR EL PROGRAMA:
  </text>
  
  <!-- TÍTULO COMPLETO Y UNIFICADO -->
  <text x="300" y="540" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14.5" font-weight="700" fill="#FFFFFF">
    IA y el futuro del Trabajo | Introducción y conceptos
  </text>
  <text x="300" y="562" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14.5" font-weight="700" fill="#FFFFFF">
    básicos de Blockchain, Billeteras Descentralizadas,
  </text>
  <text x="300" y="584" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14.5" font-weight="700" fill="#FFFFFF">
    Seguridad y Privacidad Digital
  </text>

  <!-- 3 Bloques técnicos modulares -->
  <g transform="translate(68, 616)">
    <rect x="0" y="0" width="144" height="52" rx="9" fill="#070E17" stroke="#17273A" stroke-width="1.2"/>
    <text x="72" y="21" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="9" fill="#71869E" font-weight="700" letter-spacing="1">RED</text>
    <text x="72" y="40" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0" font-weight="700">Sepolia Testnet</text>

    <rect x="160" y="0" width="144" height="52" rx="9" fill="#070E17" stroke="#00FFA3" stroke-width="1.2" stroke-opacity="0.6"/>
    <text x="232" y="21" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="9" fill="#71869E" font-weight="700" letter-spacing="1">ESTÁNDAR</text>
    <text x="232" y="40" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12" fill="#00FFA3" font-weight="700">ERC-721 NFT</text>

    <rect x="320" y="0" width="144" height="52" rx="9" fill="#070E17" stroke="#17273A" stroke-width="1.2"/>
    <text x="392" y="21" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="9" fill="#71869E" font-weight="700" letter-spacing="1">EMISIÓN</text>
    <text x="392" y="40" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12" fill="#E2E8F0" font-weight="700">Inmutable</text>
  </g>

  <!-- Metadatos al pie -->
  <text x="300" y="722" text-anchor="middle" font-family="'Consolas', monospace" font-size="11" fill="#4B6077" letter-spacing="1.2">
    ID: 0xBK-2026-CERT • REGISTRO INMUTABLE
  </text>
  <text x="300" y="750" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="700" fill="#00FFA3" letter-spacing="1">
    blockivia.xyz
  </text>
</svg>`;

const outputPath = path.join(__dirname, 'public', 'certificado.svg');
fs.writeFileSync(outputPath, svgContent, 'utf8');
console.log('>>> ¡LISTO! Tu archivo logo.png quedó incrustado directamente en el certificado.');