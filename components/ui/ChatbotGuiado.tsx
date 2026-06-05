"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, ArrowRight, ChevronLeft, FileText, Send } from "lucide-react";

// ── Árbol de conversación ─────────────────────────────────────────────────────

type NodeId = string;

interface OptionNode {
  label: string;
  next: NodeId;
}

interface BotNode {
  message: string;
  options?: OptionNode[];
  cta?: { label: string; href: string };
  isEnd?: boolean;
}

const FLOW: Record<NodeId, BotNode> = {
  start: {
    message: "Hola. Estoy aquí para ayudarte a entender si necesitas un informe pericial médico y qué documentación hace falta. ¿En qué situación te encuentras?",
    options: [
      { label: "Accidente de tráfico", next: "trafico" },
      { label: "Posible negligencia médica", next: "negligencia" },
      { label: "Accidente laboral", next: "laboral" },
      { label: "Valoración de secuelas", next: "secuelas" },
      { label: "Otra situación", next: "otro" },
    ],
  },

  // ── Tráfico ───────────────────────────────────────────────────────────────
  trafico: {
    message: "En los accidentes de tráfico, el perito médico independiente evalúa tus lesiones y secuelas aplicando el Baremo oficial. Esto puede marcar una diferencia importante frente a lo que ofrece la aseguradora. ¿Cuál es tu situación actual?",
    options: [
      { label: "La aseguradora me ha hecho una oferta", next: "trafico_oferta" },
      { label: "Estoy en tratamiento, todavía no tengo alta", next: "trafico_tratamiento" },
      { label: "Ya tengo el alta médica", next: "trafico_alta" },
    ],
  },
  trafico_oferta: {
    message: "Si ya tienes una oferta de la aseguradora, un informe pericial independiente puede rebatirla técnicamente. Para valorar tu caso necesito:",
    options: [
      { label: "Ver qué documentación necesito", next: "docs_trafico" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  trafico_tratamiento: {
    message: "Si aún estás en tratamiento, lo ideal es esperar al alta médica antes de encargur el informe pericial, para poder valorar todas las secuelas. Sin embargo, podemos hablar de tu caso ya. ¿Qué quieres hacer?",
    options: [
      { label: "Ver qué documentación necesito", next: "docs_trafico" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  trafico_alta: {
    message: "El momento ideal. Con el alta médica podemos valorar el período de incapacidad y las secuelas definitivas. ¿Quieres ver qué documentación necesitas para abrir el caso?",
    options: [
      { label: "Sí, ver documentación", next: "docs_trafico" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  docs_trafico: {
    message: "Para un caso de accidente de tráfico la documentación útil es:\n\n• Informe médico del servicio de urgencias\n• Informes de seguimiento médico y alta\n• Partes del accidente y atestado policial\n• Resolución de la aseguradora (si la tienes)\n\nNo es imprescindible tenerlo todo. Con lo que dispongas ya podemos hacer una valoración inicial.",
    options: [
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },

  // ── Negligencia ───────────────────────────────────────────────────────────
  negligencia: {
    message: "Sospechar una negligencia médica es difícil. El perito analiza si la actuación del médico o centro sanitario se ajustó a la lex artis. ¿Qué tipo de situación describes?",
    options: [
      { label: "Error de diagnóstico", next: "neg_diagnostico" },
      { label: "Error en la intervención o tratamiento", next: "neg_tratamiento" },
      { label: "No me informaron correctamente", next: "neg_consentimiento" },
      { label: "Otra situación", next: "neg_otro" },
    ],
  },
  neg_diagnostico: {
    message: "Los errores de diagnóstico son de los más frecuentes. Un diagnóstico tardío o erróneo que agravó tu situación puede ser reclamable. Para estudiarlo necesito analizar la historia clínica completa. ¿Quieres ver qué documentación necesitas?",
    options: [
      { label: "Sí, ver documentación", next: "docs_negligencia" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  neg_tratamiento: {
    message: "Los errores en intervenciones o tratamientos son la base de muchas reclamaciones. El informe pericial compara lo realizado con los protocolos médicos aceptados. ¿Quieres ver qué documentación necesitas?",
    options: [
      { label: "Sí, ver documentación", next: "docs_negligencia" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  neg_consentimiento: {
    message: "La falta de consentimiento informado es un motivo de reclamación independiente. Si no te explicaron los riesgos de una intervención y sufriste un daño derivado, existe base legal. ¿Quieres ver qué documentación necesitas?",
    options: [
      { label: "Sí, ver documentación", next: "docs_negligencia" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  neg_otro: {
    message: "Cada caso es distinto. Lo mejor es que me envíes los detalles y la documentación disponible para hacer una valoración inicial. ¿Quieres ver qué documentación suele ser útil?",
    options: [
      { label: "Sí, ver documentación", next: "docs_negligencia" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  docs_negligencia: {
    message: "Para un caso de posible negligencia médica la documentación clave es:\n\n• Historia clínica completa del centro implicado\n• Informes de alta y de seguimiento\n• Documentación de consentimiento informado (si existe)\n• Pruebas diagnósticas (analíticas, radiologías, etc.)\n• Escritos de reclamación previos (si los hay)\n\nTen en cuenta que tienes derecho a solicitar tu historia clínica al centro sanitario.",
    options: [
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },

  // ── Laboral ───────────────────────────────────────────────────────────────
  laboral: {
    message: "En accidentes laborales el perito evalúa las lesiones, el grado de incapacidad y las secuelas frente a lo reconocido por la mutua o la empresa. ¿En qué punto estás?",
    options: [
      { label: "La mutua me ha dado el alta antes de tiempo", next: "laboral_alta" },
      { label: "Me han reconocido menos incapacidad de la que tengo", next: "laboral_incapacidad" },
      { label: "Quiero documentar mis lesiones para reclamar", next: "laboral_reclamar" },
    ],
  },
  laboral_alta: {
    message: "El alta prematura por parte de la mutua es uno de los motivos más frecuentes de reclamación. Un informe pericial independiente puede impugnarla técnicamente ante el INSS o en sede judicial. ¿Quieres ver qué documentación necesitas?",
    options: [
      { label: "Sí, ver documentación", next: "docs_laboral" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  laboral_incapacidad: {
    message: "El grado de incapacidad reconocido determina la indemnización. Si crees que no refleja tu situación real, un informe pericial puede sustentar la reclamación. ¿Quieres ver qué documentación necesitas?",
    options: [
      { label: "Sí, ver documentación", next: "docs_laboral" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  laboral_reclamar: {
    message: "Documentar bien las lesiones desde el principio es clave para cualquier reclamación posterior. Podemos empezar con la documentación disponible. ¿Quieres ver qué necesitas aportar?",
    options: [
      { label: "Sí, ver documentación", next: "docs_laboral" },
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },
  docs_laboral: {
    message: "Para un accidente laboral la documentación útil es:\n\n• Parte de accidente de trabajo (PAT)\n• Informes médicos de urgencias y seguimiento\n• Resoluciones de la mutua (altas, contingencias)\n• Resoluciones del INSS si las hay\n• Certificado de empresa o descripción del puesto\n\nCon lo que tengas disponible ya podemos empezar.",
    options: [
      { label: "Enviar mi caso ahora", next: "enviar" },
    ],
  },

  // ── Secuelas ──────────────────────────────────────────────────────────────
  secuelas: {
    message: "La valoración de secuelas sirve para cuantificar de forma objetiva y con validez legal el daño permanente sufrido, tanto para reclamaciones judiciales como extrajudiciales. ¿Cuál es el origen de las secuelas?",
    options: [
      { label: "Accidente de tráfico", next: "docs_trafico" },
      { label: "Accidente laboral", next: "docs_laboral" },
      { label: "Intervención médica", next: "docs_negligencia" },
      { label: "Otro origen", next: "enviar" },
    ],
  },

  // ── Otro ─────────────────────────────────────────────────────────────────
  otro: {
    message: "Cuéntame tu situación a través del formulario y valoraré si el peritaje médico puede ayudarte. Puedes adjuntar la documentación que tengas disponible.",
    options: [
      { label: "Ir al formulario", next: "enviar" },
    ],
  },

  // ── Fin: enviar caso ─────────────────────────────────────────────────────
  enviar: {
    message: "Perfecto. Rellena el formulario de contacto y adjunta la documentación que tengas. Te responderé por email en menos de 24 horas con una valoración inicial.",
    cta: { label: "Ir al formulario", href: "#contacto" },
    isEnd: true,
  },
};

// ── Historia de mensajes ──────────────────────────────────────────────────────

interface Message {
  role: "bot" | "user";
  text: string;
}

// ── Componente ───────────────────────────────────────────────────────────────

export function ChatbotGuiado() {
  const [open, setOpen] = useState(false);
  const [nodeId, setNodeId] = useState<NodeId>("start");
  const [history, setHistory] = useState<Message[]>([]);
  const [stack, setStack] = useState<NodeId[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const node = FLOW[nodeId];

  useEffect(() => {
    if (open && history.length === 0) {
      setHistory([{ role: "bot", text: FLOW.start.message }]);
      setNodeId("start");
      setStack([]);
    }
  }, [open, history.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("open-chatbot", handleOpenEvent);
    return () => window.removeEventListener("open-chatbot", handleOpenEvent);
  }, []);

  function choose(option: OptionNode) {
    setStack((s) => [...s, nodeId]);
    const next = FLOW[option.next];
    setHistory((h) => [
      ...h,
      { role: "user", text: option.label },
      { role: "bot", text: next.message },
    ]);
    setNodeId(option.next);
  }

  function goBack() {
    if (stack.length === 0) return;
    const prev = stack[stack.length - 1];
    setStack((s) => s.slice(0, -1));
    setHistory((h) => h.slice(0, -2));
    setNodeId(prev);
  }

  function restart() {
    setHistory([{ role: "bot", text: FLOW.start.message }]);
    setNodeId("start");
    setStack([]);
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#1B3A6B] hover:bg-[#2D5AA0] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.97] ${open ? "hidden" : "flex"}`}
        aria-label="Abrir asistente"
      >
        <MessageSquare size={20} />
        <span className="text-sm font-semibold pr-1">¿Necesito un perito?</span>
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Asistente de peritaje médico"
        >
          {/* Cabecera */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{ background: "linear-gradient(135deg, #0F2347 0%, #1B3A6B 100%)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A9E6B]/20 flex items-center justify-center">
                <FileText size={15} className="text-[#1A9E6B]" />
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-tight">Asistente de peritaje</p>
                <p className="text-white/50 text-xs">Te guío paso a paso</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar asistente"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {history.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#1B3A6B] text-white rounded-br-sm"
                      : "bg-[#F7F8FA] text-[#1A1A2E] rounded-bl-sm border border-[#E5E7EB]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Opciones / CTA */}
          <div className="px-4 pb-4 pt-2 shrink-0 border-t border-[#E5E7EB] space-y-2">
            {!node.isEnd && node.options && (
              <>
                {node.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => choose(opt)}
                    className="w-full flex items-center justify-between gap-2 text-left px-4 py-2.5 rounded-xl border border-[#E5E7EB] hover:border-[#1A9E6B] hover:bg-[#F0F9F5] text-sm text-[#1A1A2E] font-medium transition-all duration-150 cursor-pointer group"
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={13} className="shrink-0 text-[#9CA3AF] group-hover:text-[#1A9E6B] transition-colors" />
                  </button>
                ))}
                {stack.length > 0 && (
                  <button
                    onClick={goBack}
                    className="w-full flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#1B3A6B] transition-colors cursor-pointer pt-1"
                  >
                    <ChevronLeft size={12} />
                    Volver atrás
                  </button>
                )}
              </>
            )}

            {node.isEnd && node.cta && (
              <div className="space-y-2">
                <a
                  href={node.cta.href}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1A9E6B] hover:bg-[#158A5C] text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors"
                >
                  <Send size={14} />
                  {node.cta.label}
                </a>
                <button
                  onClick={restart}
                  className="w-full text-xs text-[#9CA3AF] hover:text-[#1B3A6B] transition-colors cursor-pointer"
                >
                  Empezar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
