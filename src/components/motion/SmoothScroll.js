"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { setLenis } from "@/lib/lenis";

/**
 * Scroll suave com inércia (Lenis), só onde ele faz diferença.
 * O Lenis intercepta a roda do mouse e interpola a posição do scroll a cada
 * quadro. O scroll continua sendo o nativo da página, então `position: sticky`
 * e as animações ligadas ao scroll seguem funcionando.
 *
 * - Só carrega em dispositivos com mouse ou trackpad. No toque o scroll
 *   nativo já tem inércia, então o celular nem baixa a biblioteca
 *   (import dinâmico).
 * - Não liga se o usuário pediu "reduzir movimento".
 * - Onde o Lenis não roda, os links âncora usam o scroll suave do CSS
 *   (ver globals.css).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const wanted = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!wanted) return;

    let lenis;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        autoRaf: true, // o Lenis cuida do próprio requestAnimationFrame
        anchors: true, // links #secao rolam suavemente
        lerp: 0.1, // quanto menor, mais "pesado" e suave o scroll
      });
      setLenis(lenis);
    });

    return () => {
      cancelled = true;
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
