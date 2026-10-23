"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function PrerenderedMedia({
  imageSrc,
  videoSrc,
  mobileVideoSrc,
  slot,
}: {
  imageSrc?: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  slot: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const hasAsset = Boolean(imageSrc || videoSrc || mobileVideoSrc);

  useEffect(() => {
    const element = container.current;
    const player = video.current;
    if (!element || !player) return;

    let inView = true;
    const updatePlayback = () => {
      if (!inView || document.hidden) {
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
    player.addEventListener("canplay", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    updatePlayback();
    return () => {
      observer.disconnect();
      player.removeEventListener("canplay", updatePlayback);
      document.removeEventListener("visibilitychange", updatePlayback);
      player.pause();
    };
  }, [videoSrc, mobileVideoSrc]);

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
      {(videoSrc || mobileVideoSrc) && (
        <video
          ref={video}
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
        >
          {mobileVideoSrc && (
            <source src={mobileVideoSrc} type="video/mp4" media="(max-width: 900px)" />
          )}
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
