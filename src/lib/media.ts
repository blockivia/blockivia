import "server-only";
import { statSync } from "node:fs";
import path from "node:path";

// Missing files are not requested by browsers or replaced by substitute artwork.
// Rebuild the static export after adding the approved files to public/media/.
export const mediaFiles = {
  heroVideo: "hero-tunnel.mp4",
  heroMobileVideo: "hero-mobile.mp4",
  heroPoster: "hero-tunnel.webp",
  solutions: "soluciones.webp",
  research: "investigacion.webp",
  training: "capacitacion.webp",
} as const;

export function availableMedia() {
  return Object.fromEntries(
    Object.entries(mediaFiles).map(([key, filename]) => {
      try {
        const file = statSync(
          path.join(process.cwd(), "public", "media", filename),
        );
        return [
          key,
          file.isFile() && file.size > 0 ? `/media/${filename}` : undefined,
        ];
      } catch {
        return [key, undefined];
      }
    }),
  ) as Partial<Record<keyof typeof mediaFiles, string>>;
}
