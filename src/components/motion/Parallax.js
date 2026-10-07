"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

/**
 * Desloca o conteúdo na vertical conforme ele atravessa a tela.
 * speed (em px) define o quanto se move; valores diferentes entre
 * elementos vizinhos criam a sensação de profundidade.
 */
export default function Parallax({ speed = 40, className, children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // progresso 0 → elemento entrando por baixo; 1 → saindo por cima
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: reduceMotion ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}
