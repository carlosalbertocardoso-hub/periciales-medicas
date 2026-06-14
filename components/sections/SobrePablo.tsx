"use client";

import { GraduationCap, Award, Briefcase, UserCheck, CheckCircle2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const credentials = [
  {
    icon: UserCheck,
    label: "Médico colegiado",
    value: "Nº [PENDIENTE] – Colegio de Médicos de Córdoba",
  },
  {
    icon: GraduationCap,
    label: "Formación",
    value: "Especialista en Urgencias y Emergencias · Médico puericultor · Máster en Valoración del Daño Corporal (Universidad de Barcelona)",
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
              <div className="relative w-64 h-80 sm:w-80 sm:h-104 bg-linear-to-br from-[#1B3A6B] to-[#2D5AA0] rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                  aria-hidden="true"
                />
                <div className="text-center text-white/60 p-8 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-white/15 mx-auto mb-5 flex items-center justify-center">
                    <UserCheck size={44} className="text-white/80" />
                  </div>
                  <p className="text-sm font-medium text-white/60 leading-snug">
                    Pablo Rodríguez<br />de Tembleque Relaño<br />[Foto profesional]
                  </p>
                </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
