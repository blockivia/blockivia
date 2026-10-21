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
  return null;
}
