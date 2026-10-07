"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Devolve true/false para uma media query e atualiza quando ela muda.
 * useSyncExternalStore é a forma do React de ler um valor que vive fora
 * dele (aqui, o navegador). No servidor o valor é sempre false.
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
