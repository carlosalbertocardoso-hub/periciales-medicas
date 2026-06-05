import { FileText, Lock, Clock, ArrowRight } from "lucide-react";

const objeciones = [
  {
    icon: FileText,
    text: "No necesitas tener toda la documentación ahora — con lo que tengas es suficiente para empezar.",
  },
  {
    icon: Lock,
    text: "Todo lo que compartes es estrictamente confidencial y no se cede a terceros.",
  },
  {
    icon: Clock,
    text: "Respondo en menos de 24 horas por email. Sin llamadas, sin compromisos.",
  },
];

export function BloquePuente() {
  return (
    <section
      className="py-12 sm:py-16 bg-white border-y border-[#E5E7EB]"
      aria-label="Preguntas frecuentes antes del contacto"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A2E] mb-2">
          ¿No estás seguro de si tu caso tiene base?
        </h2>
        <p className="text-[#6B7280] text-sm mb-8">
          Estas son las dudas más comunes antes de enviar un caso.
        </p>

        <ul className="flex flex-col sm:flex-row gap-6 justify-center mb-10 text-left">
          {objeciones.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex-1 flex gap-3 items-start bg-[#F7F8FA] rounded-xl p-5 border border-[#E5E7EB]"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EEF2F8] flex items-center justify-center shrink-0">
                <Icon size={16} className="text-[#1B3A6B]" />
              </div>
              <p className="text-[#374151] text-sm leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="inline-flex items-center gap-2 text-[#1A9E6B] font-semibold text-sm hover:text-[#158A5C] transition-colors group"
        >
          Enviar mi caso
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </section>
  );
}
