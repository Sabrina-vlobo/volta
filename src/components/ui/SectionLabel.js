const tones = {
  dark: "text-concreto", // sobre fundo escuro
  light: "text-concreto-escuro", // sobre fundo claro
};

/**
 * Rótulo numerado de seção: "01 — Manifesto".
 * A linha é decorativa, por isso fica escondida de leitores de tela.
 */
export default function SectionLabel({
  number,
  tone = "dark",
  className = "",
  children,
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-label font-medium uppercase ${tones[tone]} ${className}`}
    >
      <span>{number}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      <span>{children}</span>
    </p>
  );
}
