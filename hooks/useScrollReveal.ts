"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll<HTMLElement>(".fade-up, .fade-in").forEach((child) => {
            child.classList.add("visible");
          });
          if (el.classList.contains("fade-up") || el.classList.contains("fade-in")) {
            el.classList.add("visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
