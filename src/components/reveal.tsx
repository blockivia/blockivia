"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-media-reveal]",
    );
    if (motion.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            entry.target.classList.remove("media-waiting");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    elements.forEach((element) => {
      element.classList.add("media-waiting");
      observer.observe(element);
    });
    const stopMotion = () => {
      if (!motion.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("media-waiting"));
    };
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", stopMotion);
      elements.forEach((element) => element.classList.remove("media-waiting"));
    };
  }, []);
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-cinematic="bento"]');
    if (!section || !("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    // Keep an already-visible section stable when navigating directly to its anchor.
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0) return;

    section.classList.add("bento-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("bento-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(section);

    const onMotionChange = () => {
      if (motion.matches) {
        observer.disconnect();
        section.classList.remove("bento-ready", "bento-in");
      }
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      section.classList.remove("bento-ready", "bento-in");
    };
  }, []);

  return null;
}
