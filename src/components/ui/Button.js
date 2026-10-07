import Link from "next/link";

const base =
  "inline-flex items-center justify-center rounded-full px-7 py-4 text-[0.9375rem] font-medium leading-none transition-colors duration-300 ease-out-expo";

const variants = {
  primary:
    "bg-volt text-asfalto hover:bg-nevoa disabled:bg-grafite disabled:text-concreto",
  secondary:
    "border border-concreto text-nevoa hover:border-nevoa hover:bg-nevoa hover:text-asfalto disabled:border-linha disabled:text-concreto",
};

/**
 * Botão do projeto.
 * - Com `href` renderiza um link (navegação); sem `href`, um <button> (ação).
 * - `variant`: "primary" (Volt) ou "secondary" (contorno).
 */
export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} disabled:pointer-events-none ${className}`;

  // Âncoras da própria página (#secao) usam <a> simples: quem rola é o Lenis.
  if (href?.startsWith("#")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
