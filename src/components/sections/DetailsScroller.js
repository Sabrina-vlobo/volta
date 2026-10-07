"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import RevealMedia from "@/components/motion/RevealMedia";
import { scrollToElement } from "@/lib/lenis";

// "01", "02"...
const pad = (n) => String(n + 1).padStart(2, "0");

/**
 * Desktop: imagem fixa (sticky) à esquerda enquanto os textos rolam à direita.
 * O texto que cruza o meio da tela vira o item ativo e troca a imagem.
 * Mobile: cada item mostra a própria imagem acima do texto, sem sticky.
 */
export default function DetailsScroller({ items }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Entrada: a imagem cresce de 85% a 100% enquanto a seção sobe na tela.
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "start 0.2"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  useEffect(() => {
    // rootMargin de -50% em cima e embaixo reduz a área observada a uma
    // linha no meio da tela: só um item cruza essa linha por vez.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(index) {
    scrollToElement(itemRefs.current[index], { center: true });
  }

  return (
    <div
      ref={rootRef}
      className="md:grid md:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10"
    >
      {/* Imagens empilhadas; só a ativa fica visível (crossfade por opacidade). */}
      <motion.div
        aria-hidden="true"
        className="sticky top-24 hidden h-[min(45rem,calc(100svh-8rem))] origin-top overflow-hidden rounded-media bg-grafite md:block"
        style={reduceMotion ? undefined : { scale }}
      >
        {/* `absolute`: o next/image com `fill` precisa de um pai posicionado
            que não seja `sticky`. */}
        <div className="absolute inset-0">
          {items.map((item, index) => (
            <Image
              key={item.id}
              src={item.image}
              alt=""
              fill
              // A foto é mais larga que o painel e é cortada nas laterais
              // (object-cover), então precisa de mais pixels do que a largura
              // do painel sugere. Por isso pedimos a largura da tela inteira.
              sizes="(min-width: 768px) 100vw, 0px"
              quality={90}
              style={{ objectPosition: item.imagePosition }}
              // A foto ativa aparece e desfaz um leve zoom; as outras somem.
              className={`object-cover transition-[opacity,scale] duration-1000 ease-out-expo ${
                index === active
                  ? "scale-100 opacity-100"
                  : "scale-110 opacity-0"
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Indicador 01–04: mostra o progresso e permite pular para um item. */}
      <nav
        aria-label="Detalhes do produto"
        className="sticky top-24 hidden h-fit md:block"
      >
        <ol className="flex flex-col gap-1">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === active ? "true" : undefined}
                aria-label={`${pad(index)}, ${item.name}`}
                className={`px-2 py-1.5 font-mono text-label font-medium transition-colors duration-300 hover:text-nevoa ${
                  index === active ? "text-nevoa" : "text-concreto"
                }`}
              >
                {pad(index)}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex flex-col gap-16 md:gap-0">
        {items.map((item, index) => (
          <article
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
            className="flex flex-col gap-5 md:min-h-[80svh] md:justify-center"
          >
            <RevealMedia className="relative aspect-[35/26] md:hidden">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 768px) 0px, 140vw"
                quality={90}
                style={{ objectPosition: item.imagePosition }}
                className="object-cover"
              />
            </RevealMedia>
            <div className="flex flex-col gap-3">
              <p className="font-mono text-label font-medium uppercase text-concreto">
                {pad(index)} — {item.name}
              </p>
              {/*
                Item inativo (desktop): o título e a spec perdem o destaque,
                mas continuam em cinza legível. Baixar a opacidade do bloco
                todo deixaria o texto abaixo do contraste mínimo.
              */}
              <h3
                className={`text-h3 font-medium transition-colors duration-500 ease-out-expo md:text-h2 ${
                  index === active ? "" : "md:text-concreto"
                }`}
              >
                {item.title}
              </h3>
              <p className="max-w-md text-concreto">{item.text}</p>
              <p
                className={`font-mono text-spec text-volt transition-colors duration-500 ease-out-expo ${
                  index === active ? "" : "md:text-concreto"
                }`}
              >
                {item.spec}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
