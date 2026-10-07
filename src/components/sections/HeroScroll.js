"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Efeito de saída do hero: conforme a página rola, o fundo (vídeo) encolhe
 * e ganha cantos arredondados, e o texto sobe e some.
 * Faz a passagem visual do vídeo em tela cheia para o resto da página.
 */
export default function HeroScroll({ background, children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // 0 → topo do hero no topo da tela; 1 → fim do hero no topo da tela
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 24]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titulo"
      className="relative flex min-h-svh flex-col justify-end"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-asfalto"
        style={reduceMotion ? undefined : { scale, borderRadius }}
      >
        {background}
      </motion.div>

      <motion.div
        className="relative"
        style={reduceMotion ? undefined : { opacity, y }}
      >
        {children}
      </motion.div>
    </section>
  );
}
