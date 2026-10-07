"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Efeito magnético: o conteúdo é puxado na direção do cursor enquanto
 * ele está por cima, e volta ao lugar com uma mola quando sai.
 * strength: fração da distância do cursor ao centro que vira deslocamento.
 */
export default function Magnetic({ strength = 0.3, className = "", children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 180, damping: 14, mass: 0.4 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  function handleMove(event) {
    if (event.pointerType !== "mouse") return; // sem efeito no toque
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: smoothX, y: smoothY }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
