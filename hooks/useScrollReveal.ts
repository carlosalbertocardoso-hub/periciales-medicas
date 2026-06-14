"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.08) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      el.querySelectorAll<HTMLElement>(".fade-up, .fade-in").forEach((child) => {
        child.classList.add("visible");
      });
      if (el.classList.contains("fade-up") || el.classList.contains("fade-in")) {
        el.classList.add("visible");
      }
    };

    // Fallback: sin IntersectionObserver, mostrar contenido directamente.
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    // Si la sección ya está (parcialmente) en pantalla al montar, revelar ya.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
