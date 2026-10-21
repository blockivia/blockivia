"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export default function PrerenderedMedia({
  imageSrc,
  videoSrc,
  slot,
}: {
  imageSrc?: string;
  videoSrc?: string;
  slot: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const hasAsset = Boolean(imageSrc || videoSrc);

  useEffect(() => {
    const element = container.current;
    const player = video.current;
    if (!element || !player || reduced) return;
    let inView = false;
    const syncPlayback = () => {
      const active = inView && !document.hidden;
      player.autoplay = active;
      if (active) {
        player.muted = true;
        void player.play().catch(() => {
          /* A blocked autoplay leaves the real poster visible. */
        });
      } else player.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        syncPlayback();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      player.pause();
    };
  }, [videoSrc, reduced]);

  return (
    <div
      ref={container}
      className="media-slot"
      data-media={slot}
      data-asset-state={hasAsset ? "available" : "pending"}
      data-media-reveal={hasAsset ? "" : undefined}
      aria-hidden="true"
    >
      {imageSrc && (
        <Image
          className="media-poster"
          src={imageSrc}
          alt=""
          fill
          unoptimized
          sizes="(max-width: 900px) 100vw, 56vw"
        />
      )}
      {videoSrc && !reduced && (
        <video
          ref={video}
          src={videoSrc}
          poster={imageSrc}
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nofullscreen nodownload noremoteplayback"
          preload="none"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
