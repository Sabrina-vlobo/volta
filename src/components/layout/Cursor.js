"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const INTERACTIVE = "a, button, label, summary, input";

const sizes = { default: 14, hover: 56, label: 96 };

/**
 * Cursor personalizado: um círculo que segue o mouse com leve atraso.
 * - Cresce sobre links e botões.
 * - Sobre elementos com data-cursor="Texto", cresce mais e mostra o texto.
 * O cursor nativo continua visível; este é um complemento visual.
 * Só existe em dispositivos com mouse e sem "reduzir movimento".
 */
export default function Cursor() {
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 500, damping: 40, mass: 0.5 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  const [mode, setMode] = useState("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    function onMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    }

    // Um único listener no documento decide o estado pelo elemento sob o mouse.
    function onOver(event) {
      const withLabel = event.target.closest("[data-cursor]");
      if (withLabel) {
        setLabel(withLabel.dataset.cursor);
        setMode("label");
      } else if (event.target.closest(INTERACTIVE)) {
        setMode("hover");
      } else {
        setMode("default");
      }
    }

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference"
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        // -translate centraliza o círculo na ponta do cursor.
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-nevoa font-mono text-label font-medium uppercase text-asfalto"
        animate={{
          width: sizes[mode],
          height: sizes[mode],
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {mode === "label" && label}
      </motion.div>
    </motion.div>
  );
}
