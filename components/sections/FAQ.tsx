"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "¿Cómo sé si lo que me ocurrió fue una negligencia médica?",
    a: "Una negligencia médica ocurre cuando el profesional o centro sanitario no actuó conforme a lo que se espera de un médico en esa situación, según criterios técnicos y científicos aceptados (la lex artis). Para determinarlo, analizo la historia clínica, los informes de alta, las pruebas diagnósticas y comparo el tratamiento recibido con lo que debería haberse hecho. Puedes enviarme tu documentación a través del formulario para que pueda hacer una valoración inicial.",
  },
  {
    q: "¿Qué tipo de negligencias médicas puedo reclamar?",
    a: "Los casos más frecuentes son: retraso diagnóstico que agravó el estado del paciente, error quirúrgico o de tratamiento, falta de consentimiento informado, alta médica prematura, infección nosocomial evitable, y error de medicación. Tanto en sanidad pública como privada.",
  },
  {
    q: "¿Cuánto tiempo tengo para reclamar una negligencia médica?",
    a: "En la sanidad privada, el plazo de prescripción habitual es de 3 años desde que se conoce el daño. En la pública (Administración), el plazo es de 1 año. Estos plazos son cortos y empiezan a correr desde el momento en que el paciente conoce o debería conocer el daño. No esperes: si sospechas una negligencia, consulta cuanto antes.",
  },
  {
    q: "¿Qué diferencia hay entre el médico del hospital y un perito médico independiente?",
    a: "El médico que te atendió trabaja para el hospital o la clínica. Tiene un interés claro en que la actuación médica no se cuestione. Un perito médico independiente no tiene ningún vínculo con el centro ni con las aseguradoras, y emite un informe objetivo cuyo único criterio es la lex artis médica.",
  },
  {
    q: "¿Qué contiene el informe pericial de negligencia médica?",
    a: "El informe recoge los antecedentes del caso, el análisis detallado de la documentación clínica, la descripción de la actuación médica que se cuestiona, la comparación con la práctica médica estándar, la determinación del daño causado por el error y las conclusiones técnicas. Está redactado para ser comprensible y defendible ante cualquier tribunal.",
  },
  {
    q: "¿Necesito abogado para reclamar una negligencia médica?",
    a: "Para presentar una demanda judicial, sí necesitas abogado. El informe pericial es la base técnica sobre la que el abogado construye la argumentación legal. Trabajo habitualmente con abogados especializados en responsabilidad médica, pero también puedo aportarte el informe si ya tienes el tuyo.",
  },
  {
    q: "¿Cuánto tarda en elaborarse el informe?",
    a: "El plazo depende de la complejidad del caso y de la documentación disponible. Te lo comunico con precisión al inicio del proceso, una vez revisada tu documentación, y respeto siempre el plazo acordado.",
  },
  {
    q: "¿Atiendes casos de toda España?",
    a: "Sí. Atiendo casos en toda España. La valoración se realiza íntegramente por videoconsulta, sin que tengas que desplazarte. Escríbeme por email o a través del formulario con tu situación y te respondo en menos de 24 horas laborables.",
  },
];

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
