"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Entrada de imagens: uma máscara abre de baixo para cima enquanto
 * o conteúdo desfaz um leve zoom. As duas coisas juntas dão a sensação
 * de a imagem "assentar" no lugar.
 */
export default function RevealMedia({ className = "", delay = 0, children }) {
  const reduceMotion = useReducedMotion();
  const viewport = { once: true, margin: "0px 0px -10% 0px" };

  return (
    <motion.div
      // overflow-hidden: o zoom inicial não pode vazar e criar scroll lateral.
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      viewport={viewport}
      transition={{
        duration: reduceMotion ? 0 : 1.3,
        ease: EASE_OUT_EXPO,
        delay,
      }}
    >
      <motion.div
        // `relative`: o next/image com `fill` se posiciona em relação a este bloco.
        className="relative size-full"
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
