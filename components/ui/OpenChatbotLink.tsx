"use client";

export function OpenChatbotLink() {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("open-chatbot"));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white/65 hover:text-white text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white/70 transition-all duration-200 cursor-pointer"
    >
      ¿Necesito un perito?
    </button>
  );
}
