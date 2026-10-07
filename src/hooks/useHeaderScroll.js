"use client";

import { useEffect, useState } from "react";

/**
 * Observa o scroll da página e devolve dois estados para o header:
 * - hidden: true ao rolar para baixo, false ao rolar para cima
 * - pastHero: true depois que o usuário passou da primeira tela
 */
export function useHeaderScroll(threshold = 8) {
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const delta = y - lastY;

      // Ignora movimentos muito pequenos para o header não ficar piscando.
      if (Math.abs(delta) > threshold) {
        setHidden(delta > 0 && y > 80);
        lastY = y;
      }

      setPastHero(y > window.innerHeight * 0.8);
      ticking = false;
    }

    // O evento de scroll dispara muitas vezes por segundo.
    // requestAnimationFrame limita o trabalho a uma vez por quadro.
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Checagem inicial: se a página já carrega rolada (ex.: após recarregar
    // no meio dela), o header precisa do fundo antes do primeiro scroll.
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { hidden, pastHero };
}
