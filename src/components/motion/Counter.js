"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Número que conta de zero até o valor quando entra na tela, uma única vez.
 * O HTML já vem com o valor final (bom para SEO e para quem está sem
 * JavaScript); a contagem é um aprimoramento por cima.
 */
export default function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  // Zera o número antes de ele aparecer na tela.
  useEffect(() => {
    if (!reduceMotion) ref.current.textContent = "0";
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const node = ref.current;

    // Escreve direto no DOM: evita re-renderizar o React a cada quadro.
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        node.textContent = Math.round(latest);
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <>
      {/* tabular-nums: dígitos de mesma largura, o número não "treme". */}
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
      {/* Leitores de tela recebem só o valor final. */}
      <span className="sr-only">{value}</span>
    </>
  );
}
