"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

const word = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1, ease: EASE_OUT_EXPO } },
};

/**
 * Título revelado palavra por palavra ao entrar na tela.
 * Cada palavra sobe por trás de uma máscara, com um pequeno atraso
 * em relação à anterior.
 * Leitores de tela recebem o texto inteiro de uma vez (sr-only);
 * a versão animada fica escondida deles (aria-hidden).
 */
export default function SplitWords({ text, delay = 0 }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.06, delayChildren: delay }}
      >
        {text.split(" ").map((item, index) => (
          <Fragment key={index}>
            {/* Máscara: o padding (compensado pela margem) evita cortar acentos. */}
            <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
              <motion.span className="inline-block" variants={word}>
                {item}
              </motion.span>
            </span>{" "}
          </Fragment>
        ))}
      </motion.span>
    </>
  );
}
