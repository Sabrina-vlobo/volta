"use client";

import { MotionConfig } from "motion/react";

/**
 * reducedMotion="user": se a pessoa ativou "reduzir movimento" no sistema,
 * o Motion desliga animações de posição e escala e mantém só as de opacidade.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
