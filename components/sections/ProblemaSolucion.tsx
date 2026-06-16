"use client";

import Link from "next/link";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const problems = [
  "El hospital o médico que te atendió maneja su propia documentación. Tú llegas sin herramientas para cuestionarla.",
  "Las aseguradoras sanitarias tienen peritos médicos propios. Su informe defiende a la compañía, no a ti.",
  "Probar una negligencia médica requiere demostrar qué debió hacerse y qué se hizo mal. Eso solo lo puede hacer otro médico.",
  "Los plazos para reclamar son cortos. Actuar sin un informe técnico puede hacer que pierdas tu caso aunque tengas razón.",
];

const solutions = [
  "Analizo tu historia clínica y toda la documentación médica con criterio médico-legal independiente.",
  "Evalúo si la atención recibida se ajustó a la lex artis y determino el daño causado por el error.",
  "Emito un informe pericial con validez ante tribunales, sin ningún vínculo con hospitales, clínicas ni aseguradoras.",
  "Ratifico el informe en sede judicial si el proceso lo requiere. Estás acompañado hasta el final.",
];

export function ProblemaSolucion() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="problema-solucion"
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Problema y solución"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-up text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#1A9E6B] font-semibold text-sm uppercase tracking-wider mb-3">
            Por qué te ayudo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A2E] mb-4">
            Cuando sospechas una negligencia médica, el sistema no está de tu lado
          </h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">
            El hospital tiene su documentación. La aseguradora tiene su perito. Tú
            necesitas alguien que analice el caso sin ningún conflicto de intereses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="fade-up stagger-1 bg-white rounded-2xl p-6 sm:p-8 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <XCircle size={20} className="text-red-500" />
              </div>
              <h3 className="font-bold text-[#1A1A2E] text-lg">A lo que te enfrentas</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 items-start text-[#374151] text-sm sm:text-base leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up stagger-2 bg-white rounded-2xl p-6 sm:p-8 border border-[#1A9E6B]/20 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#E8F7F1] flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} className="text-[#1A9E6B]" />
              </div>
              <h3 className="font-bold text-[#1A1A2E] text-lg">Lo que aporta un perito independiente</h3>
            </div>
            <ul className="space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex gap-3 items-start text-[#374151] text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 size={17} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center fade-up stagger-3">
          <Link
            href="/consulta"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 bg-transparent border-2 border-[#1A9E6B] text-[#1A9E6B] hover:bg-[#1A9E6B] hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base active:scale-[0.98]"
          >
            Enviar mi caso
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
