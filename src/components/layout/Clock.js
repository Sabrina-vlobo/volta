"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/**
 * Hora atual de São Paulo, atualizada a cada segundo.
 * Começa vazio e só preenche no navegador: se o servidor renderizasse
 * a hora, ela seria diferente da hora no cliente (erro de hidratação).
 */
export default function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    const first = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  return <time className="tabular-nums">{time ?? "--:--:--"}</time>;
}
