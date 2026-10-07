"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import SplitWords from "@/components/motion/SplitWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { cityMoments } from "@/data/site";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Formatos dos cards no desktop. As alturas são relativas à tela (svh)
// para a faixa caber em notebooks baixos; a largura sai da proporção.
const shapes = {
  tall: "md:h-[min(30rem,44svh)] md:aspect-[4/5]",
  tallLarge: "md:h-[min(36rem,54svh)] md:aspect-[4/5]",
  wide: "md:h-[min(27rem,40svh)] md:aspect-[16/9]",
};

/**
 * Card da galeria.
 * Quando a faixa é movida pelo scroll (`progress`), a foto desliza um pouco
 * dentro da moldura no sentido contrário: parallax interno. Para ter
 * "sobra" para deslizar, a foto é 16% mais larga que a moldura.
 */
function Card({ moment, progress, pinned }) {
  const x = useTransform(progress, [0, 1], ["0%", "-13.8%"]);

  return (
    <figure className="flex flex-col gap-3">
      <RevealMedia
        className={`relative aspect-[13/17] w-[16.25rem] md:w-auto ${shapes[moment.shape]}`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-[116%]"
          // Sem scroll controlando a faixa (mobile), a foto fica centralizada.
          style={{ x: pinned ? x : "-6.9%" }}
        >
          <Image
            src={moment.image}
            alt={moment.alt}
            fill
            sizes="(min-width: 768px) 55vw, 100vw"
            style={{ objectPosition: moment.position }}
            className="object-cover"
          />
        </motion.div>
      </RevealMedia>
      <figcaption className="font-mono text-label font-medium uppercase text-concreto">
        {moment.time} — {moment.place}
      </figcaption>
    </figure>
  );
}

/**
 * Galeria horizontal.
 * Desktop: a seção fica presa na tela (sticky) e o scroll vertical
 * move a faixa de cards para o lado.
 * Mobile ou movimento reduzido: faixa com arraste nativo e scroll-snap.
 */
export default function Gallery() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const pinned = useMediaQuery(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  );

  // Quanto a faixa precisa andar: largura total dela menos a área visível.
  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);

  useEffect(() => {
    if (!pinned) return;

    const measure = () => {
      const value = Math.max(
        0,
        trackRef.current.scrollWidth - viewportRef.current.clientWidth,
      );
      setDistance(value);
      distanceValue.set(value);
    };

    // Recalcula se a janela ou os cards mudarem de tamanho.
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [pinned, distanceValue]);

  // 0 → seção encosta no topo; 1 → fim da seção encosta no fim da tela
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    [scrollYProgress, distanceValue],
    ([progress, total]) => -progress * total,
  );

  return (
    <section
      ref={sectionRef}
      id="na-cidade"
      aria-labelledby="na-cidade-titulo"
      // A altura extra é exatamente a distância horizontal:
      // cada pixel de scroll vertical move a faixa um pixel.
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden"
            : "flex flex-col gap-10 py-20"
        }
      >
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div className="flex flex-col gap-6">
              <Reveal>
                <SectionLabel number="05">Na cidade</SectionLabel>
              </Reveal>
              <h2
                id="na-cidade-titulo"
                className="text-h2 font-medium md:text-h1"
              >
                <SplitWords text="A cidade fica mais perto." />
              </h2>
            </div>
            <p className="hidden shrink-0 font-mono text-label font-medium uppercase text-concreto md:block">
              Role para explorar →
            </p>
          </div>
        </Container>

        <div
          ref={viewportRef}
          // Texto mostrado pelo cursor personalizado sobre a faixa.
          data-cursor={pinned ? "Role" : undefined}
          // Sem o scroll preso, a faixa é uma área rolável: precisa receber
          // foco para ser usada pelo teclado (setas).
          tabIndex={pinned ? undefined : 0}
          role={pinned ? undefined : "group"}
          aria-label={pinned ? undefined : "Fotos na cidade, role para o lado"}
          className={
            pinned ? "" : "no-scrollbar snap-x snap-mandatory overflow-x-auto"
          }
        >
          <motion.ul
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className="flex w-max items-end gap-4 px-5 md:gap-6 md:px-10"
          >
            {cityMoments.map((moment) => (
              <li key={moment.time} className="snap-start scroll-ml-5">
                <Card
                  moment={moment}
                  progress={scrollYProgress}
                  pinned={pinned}
                />
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Barra de progresso: só faz sentido quando o scroll controla a faixa. */}
        {pinned && (
          <Container>
            <div aria-hidden="true" className="h-0.5 bg-linha">
              <motion.div
                className="h-full origin-left bg-nevoa"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}
