"use client";

import { useRef, useState } from "react";
import { academyVideos, copy, type Locale } from "@/content/site";

export default function Academy({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<
    (typeof academyVideos)[number] | null
  >(null);
  const videos = academyVideos.filter((video) =>
    /^[A-Za-z0-9_-]{11}$/.test(video.youtubeId),
  );
  if (!videos.length)
    return (
      <div className="academy-art" aria-hidden="true">
        <div className="academy-slabs">
          <span />
          <span />
          <span />
        </div>
        <span className="art-caption">YouTube</span>
      </div>
    );
  return (
    <>
      <div className="video-grid">
        {videos.map((video) => (
          <button
            className="video-card"
            key={video.youtubeId}
            onClick={() => {
              setSelected(video);
              dialog.current?.showModal();
            }}
          >
            <span className="video-play" aria-hidden="true">
              ▶
            </span>
            <h3>{video.title[locale]}</h3>
            {video.description && <p>{video.description[locale]}</p>}
            <span>{t.watch} ↗</span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-label={selected?.title[locale] ?? t.watch}
        onClose={() => setSelected(null)}
      >
        <form method="dialog">
          <button className="button button-outline">{t.close} ×</button>
        </form>
        {selected && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${selected.youtubeId}?autoplay=1`}
            title={selected.title[locale]}
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </dialog>
    </>
  );
}
