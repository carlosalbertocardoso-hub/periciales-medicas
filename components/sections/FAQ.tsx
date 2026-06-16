"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { faqs } from "@/lib/faq-data";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-[#F7F8FA] transition-colors duration-150 cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1A1A2E] text-sm sm:text-base leading-snug">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-[#1B3A6B] transition-transform duration-300 ease-out",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="px-5 sm:px-6 pb-5 text-[#6B7280] text-sm sm:text-base leading-relaxed border-t border-[#F0F4F8] pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Preguntas frecuentes"
    >
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up text-center mb-10 sm:mb-14">
          <span className="inline-block text-[#1A9E6B] font-semibold text-sm uppercase tracking-wider mb-3">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-[#6B7280] text-lg">
            Dudas frecuentes sobre negligencias médicas, plazos y el proceso pericial.
          </p>
        </div>

        <div className="fade-up stagger-1 space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="mt-12 text-center fade-up stagger-2">
          <p className="text-[#6B7280] mb-5">¿No encuentras respuesta a tu duda?</p>
          <Link
            href="/consulta"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-transparent border-2 border-[#1A9E6B] text-[#1A9E6B] hover:bg-[#1A9E6B] hover:text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 active:scale-[0.98]"
          >
            Escríbeme directamente
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
