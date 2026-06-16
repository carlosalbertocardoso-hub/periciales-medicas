"use client";

import { GraduationCap, Award, Briefcase, UserCheck, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

const formacion = [
  "Licenciado en Medicina y Cirugía — Universidad de Navarra",
  "Especialista en Medicina Familiar y Comunitaria",
  "Especialista en Urgencias y Emergencias",
  "Médico Puericultor",
  "Máster en Valoración del Daño Corporal — Universidad de Barcelona",
];

const credentials = [
  {
    icon: UserCheck,
    label: "Médico colegiado",
    value: "Nº 14/07919 – Colegio de Médicos de Córdoba",
  },
  {
    icon: Briefcase,
    label: "Experiencia",
    value: "Más de 10 años como perito judicial",
  },
  {
    icon: Award,
    label: "Ámbito",
    value: "Toda España · Ratificación judicial",
  },
];

const checklist = [
  "Independencia total respecto a aseguradoras y abogados",
  "Informes con plena validez ante cualquier tribunal español",
  "Atención directa con el perito, sin intermediarios",
  "Atención telemática en toda España",
];

export function SobrePablo() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="sobre-pablo"
      className="py-16 sm:py-24 bg-[#F7F8FA]"
      aria-label="Sobre Pablo"
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div className="fade-up stagger-1 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-[#1A9E6B]/25"
                aria-hidden="true"
              />
              <div className="relative w-64 h-80 sm:w-80 sm:h-104 rounded-2xl shadow-xl overflow-hidden">
                <Image
                  src="/img/pablo-rodriguez-de-tembleque.webp"
                  alt="Dr. Pablo Rodríguez de Tembleque Relaño, médico perito especialista en negligencias médicas"
                  fill
                  sizes="(min-width: 640px) 320px, 256px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-[#1A9E6B] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg">
                +10 años de experiencia
              </div>
            </div>
          </div>

          <div className="fade-up stagger-2 order-1 lg:order-2">
            <div className="section-rule text-[#C8993A] text-xs font-semibold tracking-[0.18em] uppercase mb-4">
              Acerca de mí
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 leading-tight" style={{ fontFamily: "var(--font-heading), Georgia, serif", letterSpacing: "-0.02em" }}>
              Soy el Dr. Pablo
              <br />
              <span className="text-[#1A1A2E]/40 font-light">Rodríguez de Tembleque</span>
            </h2>
            <p className="text-[#374151] text-lg leading-relaxed mb-4">
              Médico especialista en mala praxis médica asistencial y peritaje
              médico-legal. Analizo si la atención que recibiste se ajustó a lo que
              exige la lex artis y emito informes independientes con validez judicial.
            </p>
            <p className="text-[#6B7280] leading-relaxed mb-8">
              Actividad desarrollada en el ámbito civil, social y
              contencioso-administrativo. No tengo relación de dependencia con
              hospitales, clínicas ni aseguradoras. Trabajo únicamente para el
              paciente. Atiendo casos en toda España por videoconsulta.
            </p>

            <ul className="space-y-3 mb-8">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#374151] text-sm sm:text-base">
                  <CheckCircle2 size={18} className="text-[#1A9E6B] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Formación */}
            <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm mb-3">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-8 rounded-lg bg-[#1B3A6B]/8 flex items-center justify-center text-[#1B3A6B] shrink-0">
                  <GraduationCap size={17} />
                </span>
                <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">Formación</p>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {formacion.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#374151] leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8993A] shrink-0 mt-1.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Otras credenciales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.label}
                    className="flex gap-3 items-start bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm hover:border-[#1A9E6B]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1B3A6B]/8 flex items-center justify-center text-[#1B3A6B] shrink-0">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280] font-medium mb-0.5">{c.label}</p>
                      <p className="text-sm text-[#1A1A2E] font-semibold leading-snug">{c.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
