"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left bg-white hover:bg-[#F7F8FA] transition-colors cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#1A1A2E] text-sm sm:text-base leading-snug">{q}</span>
        <ChevronDown
          size={18}
          className={cn("shrink-0 text-[#1B3A6B] transition-transform duration-300 ease-out", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300 ease-out", open ? "max-h-96" : "max-h-0")}>
        <p className="px-5 sm:px-6 pb-5 pt-4 text-[#6B7280] text-sm sm:text-base leading-relaxed border-t border-[#F0F4F8]">
          {a}
        </p>
      </div>
    </div>
  );
}

export function ServiceFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="py-14 sm:py-20 bg-white" aria-label="Preguntas frecuentes">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-[#1A9E6B] font-semibold text-sm uppercase tracking-wider mb-3">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E]">Preguntas frecuentes</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}
