import { ChevronDown, ArrowRight } from "lucide-react";
import { faqs } from "@/lib/faq-data";

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-[#E5E7EB] rounded-xl overflow-hidden bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 hover:bg-[#F7F8FA] sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-semibold text-[#1A1A2E] text-sm sm:text-base leading-snug">
          {q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-[#1B3A6B] transition-transform duration-300 ease-out group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="border-t border-[#F0F4F8] px-5 pb-5 pt-4 text-sm leading-relaxed text-[#6B7280] sm:px-6 sm:text-base">
        {a}
      </p>
    </details>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Preguntas frecuentes"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <a
            href="/consulta"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-transparent border-2 border-[#1A9E6B] text-[#1A9E6B] hover:bg-[#1A9E6B] hover:text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 active:scale-[0.98]"
          >
            Escríbeme directamente
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
