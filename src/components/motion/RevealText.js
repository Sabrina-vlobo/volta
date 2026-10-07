"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const line = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

// A máscara: overflow-hidden esconde a linha enquanto ela está abaixo.
// O padding (compensado pela margem negativa) evita cortar acentos.
const mask = "-my-[0.12em] block overflow-hidden py-[0.12em]";

/**
 * Revela um título linha a linha: cada linha sobe por trás de uma máscara.
 * - lines: array com o texto de cada linha
 * - trigger:
 *   "view"  anima ao entrar na tela (Motion);
 *   "mount" anima ao carregar a página, só com CSS. Como não espera o
 *   JavaScript, o texto aparece mais cedo: importante no topo da página,
 *   onde ele costuma ser o maior elemento visível (métrica LCP).
 */
export default function RevealText({ lines, trigger = "view", delay = 0 }) {
  if (trigger === "mount") {
    return (
      <span className="block">
        {lines.map((text, index) => (
          <span key={text} className={mask}>
            <span
              className="block animate-line-up"
              style={{ animationDelay: `${delay + index * 0.09}s` }}
            >
              {text}
            </span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className="block"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.09, delayChildren: delay }}
    >
      {lines.map((text) => (
        <span key={text} className={mask}>
          <motion.span className="block" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
