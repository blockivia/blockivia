"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const hasAsset = Boolean(imageSrc || videoSrc);

  useEffect(() => {
    const element = container.current;
    const player = video.current;
    if (!element || !player) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const updatePlayback = () => {
      if (motion.matches || !inView || document.hidden) {
        player.pause();
      } else {
        player.muted = true;
        void player.play().catch(() => {
          // The poster remains available when autoplay is blocked.
        });
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    motion.addEventListener("change", updatePlayback);
    player.addEventListener("canplay", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updatePlayback);
      player.removeEventListener("canplay", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      player.pause();
    };
  }, [videoSrc]);

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
      {videoSrc && (
        <video
          ref={video}
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nofullscreen nodownload noremoteplayback"
          preload="auto"
          tabIndex={-1}
        />
      )}
    </div>
  );
}
