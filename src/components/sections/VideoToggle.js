"use client";

import { useEffect, useState } from "react";

/**
 * Botão de pausar/reproduzir um <video> identificado pelo id.
 * Exigência de acessibilidade para conteúdo que se move sozinho
 * por mais de 5 segundos (WCAG 2.2.2).
 * O botão não guarda o estado por conta própria: ele escuta os eventos
 * play/pause do vídeo, então sempre reflete o que está acontecendo.
 */
export default function VideoToggle({ videoId }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = document.getElementById(videoId);
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, [videoId]);

  function toggle() {
    const video = document.getElementById(videoId);
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"
      }
      className="flex size-11 shrink-0 items-center justify-center rounded-full border border-concreto text-nevoa transition-colors duration-300 ease-out-expo hover:border-nevoa hover:bg-nevoa hover:text-asfalto"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 fill-current"
      >
        {playing ? (
          <path d="M4 3h3v10H4zM9 3h3v10H9z" />
        ) : (
          <path d="M5 3l8 5-8 5z" />
        )}
      </svg>
    </button>
  );
}
