"use client";

import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Entrada padrão de blocos: sobe alguns pixels e aparece,
 * uma única vez, quando entra na tela.
 */
export default function Reveal({ delay = 0, y = 24, className, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
