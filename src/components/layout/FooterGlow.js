"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Manchas de cor do footer.
 * Três camadas:
 * 1. uma faixa fixa na base (garante contraste do texto escuro do rodapé);
 * 2. duas manchas que flutuam devagar em loop (animação CSS);
 * 3. as mesmas manchas seguem o cursor com atraso (mola do Motion).
 */
export default function FooterGlow() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  // Posição do cursor dentro do footer, de -0.5 a 0.5 em cada eixo.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // A mola suaviza o movimento: a mancha "persegue" o cursor.
  const spring = { stiffness: 40, damping: 18, mass: 1.2 };
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);

  const x1 = useTransform(smoothX, [-0.5, 0.5], [-140, 140]);
  const y1 = useTransform(smoothY, [-0.5, 0.5], [-50, 50]);
  // A segunda mancha se move no sentido oposto e menos.
  const x2 = useTransform(smoothX, [-0.5, 0.5], [90, -90]);
  const y2 = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    const footer = ref.current?.parentElement;
    if (!footer || reduceMotion) return;

    function onMove(event) {
      if (event.pointerType !== "mouse") return; // ignora toque
      const rect = footer.getBoundingClientRect();
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    }

    footer.addEventListener("pointermove", onMove);
    return () => footer.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute inset-x-0 -bottom-24 h-56 bg-volt blur-[70px]" />

      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -bottom-[22%] -left-[10%] h-[60%] w-[80%]"
      >
        <div className="size-full animate-drift-a rounded-full bg-volt/60 blur-[80px] md:blur-[150px]" />
      </motion.div>

      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute -bottom-[26%] -right-[12%] h-[50%] w-[60%]"
      >
        <div className="size-full animate-drift-b rounded-full bg-volt/45 blur-[80px] md:blur-[150px]" />
      </motion.div>
    </div>
  );
}
