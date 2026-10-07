"use client";

import { Fragment, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

function Word({ progress, range, reduceMotion, children }) {
  // Cada palavra "acende" no seu trecho do progresso do scroll.
  // 0.4 é o mínimo que mantém contraste de 3:1 (texto grande) no fundo escuro.
  const opacity = useTransform(progress, range, [0.4, 1]);
  return (
    <motion.span style={{ opacity: reduceMotion ? 1 : opacity }}>
      {children}
    </motion.span>
  );
}

/**
 * Parágrafo em que as palavras passam de apagadas a acesas conforme o scroll,
 * guiando o ritmo de leitura.
 */
export default function ScrollWords({ text, className }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // começa quando o topo do texto chega a 85% da tela
    // e termina quando o fim do texto chega ao meio
    offset: ["start 0.85", "end 0.5"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <Word
            progress={scrollYProgress}
            range={[index / words.length, (index + 1) / words.length]}
            reduceMotion={reduceMotion}
          >
            {word}
          </Word>{" "}
        </Fragment>
      ))}
    </p>
  );
}
