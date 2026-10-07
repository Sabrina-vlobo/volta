"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import RevealMedia from "@/components/motion/RevealMedia";
import SplitWords from "@/components/motion/SplitWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { bikeColors } from "@/data/site";

const pad = (n) => String(n).padStart(2, "0");

export default function Colors() {
  // Começa na Terracota, a cor de maior impacto visual.
  const [selectedId, setSelectedId] = useState("terracota");

  const index = bikeColors.findIndex((color) => color.id === selectedId);
  const selected = bikeColors[index];

  return (
    <section
      id="cores"
      aria-labelledby="cores-titulo"
      className="relative overflow-hidden bg-asfalto py-20 md:py-36"
    >
      <Container className="relative flex flex-col items-center gap-8 md:gap-12">
        <div className="flex flex-col items-center gap-6">
          <Reveal>
            <SectionLabel number="04">Cores</SectionLabel>
          </Reveal>
          <h2
            id="cores-titulo"
            className="text-balance text-center text-h2 font-medium md:text-h1"
          >
            <SplitWords text="Quatro cores. Uma atitude." />
          </h2>
        </div>

        {/* Uma imagem por cor, empilhadas; só a selecionada fica visível. */}
        <div className="relative w-full max-w-[68rem]">
          {/*
            Brilho atrás da foto: um bloco um pouco maior que ela, desfocado,
            na cor selecionada. Só a borda dele aparece em volta do retângulo.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[3%] rounded-[3rem] opacity-45 blur-[40px] transition-colors duration-700 ease-out-expo md:blur-[70px]"
            style={{ backgroundColor: selected.glow }}
          />
          <RevealMedia className="relative aspect-[11/6] w-full rounded-media ring-1 ring-nevoa/10">
            {bikeColors.map((color) => (
              <Image
                key={color.id}
                src={color.image}
                // Só a foto visível tem descrição; as outras ficam fora da leitura.
                alt={
                  color.id === selectedId
                    ? `Volta One na cor ${color.name}, vista de perfil`
                    : ""
                }
                fill
                sizes="(min-width: 1152px) 1088px, 100vw"
                quality={90}
                className={`object-cover transition-opacity duration-700 ease-out-expo ${
                  color.id === selectedId ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </RevealMedia>
        </div>

        {/* aria-live anuncia a troca de cor para leitores de tela. */}
        <div aria-live="polite" className="flex flex-col items-center gap-2">
          <p className="text-h3 font-medium md:text-h2">{selected.name}</p>
          <p className="font-mono text-label font-medium uppercase text-concreto">
            Cor {pad(index + 1)} de {pad(bikeColors.length)}
          </p>
        </div>

        {/*
          Seletor feito com radios nativos: as setas do teclado trocam a cor
          e só uma opção pode estar marcada. O input fica escondido
          visualmente (sr-only) e o <label> é o que se vê.
        */}
        <fieldset>
          <legend className="sr-only">Cor da bike</legend>
          <div className="flex gap-3">
            {bikeColors.map((color) => (
              <label
                key={color.id}
                className="flex size-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-transparent transition-colors duration-300 hover:border-concreto has-checked:border-nevoa has-focus-visible:outline-2 has-focus-visible:outline-offset-[3px] has-focus-visible:outline-volt"
              >
                <input
                  type="radio"
                  name="cor-da-bike"
                  value={color.id}
                  checked={color.id === selectedId}
                  onChange={() => setSelectedId(color.id)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className="size-9 rounded-full border border-concreto/40"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="sr-only">{color.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </Container>
    </section>
  );
}
