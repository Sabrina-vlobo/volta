"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo de fundo do hero.
 * - Não usa o atributo autoplay: só toca por código, depois de checar
 *   se o usuário não pediu "reduzir movimento" no sistema.
 * - Pausa sozinho quando sai da tela e volta quando reaparece, para não
 *   gastar bateria e processamento com algo que ninguém está vendo.
 */
export default function HeroVideo({ id }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const video = videoRef.current;
    video.muted = true; // navegadores só permitem autoplay sem som

    // Guarda se foi o código (e não a pessoa) que pausou, para só retomar
    // nesse caso: quem pausou no botão continua com o vídeo parado.
    let pausedByScroll = false;

    const play = () =>
      video.play().catch(() => {
        // Autoplay bloqueado (ex.: modo economia de energia): fica o poster.
      });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (pausedByScroll) {
          pausedByScroll = false;
          play();
        }
      } else if (!video.paused) {
        pausedByScroll = true;
        video.pause();
      }
    });

    play();
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      id={id}
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover"
    >
      {/* O navegador usa a primeira fonte compatível, de cima para baixo. */}
      <source
        src="/videos/hero-desktop.webm"
        type="video/webm"
        media="(min-width: 768px)"
      />
      <source
        src="/videos/hero-desktop.mp4"
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <source src="/videos/hero-mobile.webm" type="video/webm" />
      <source src="/videos/hero-mobile.mp4" type="video/mp4" />
    </video>
  );
}
