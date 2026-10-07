import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { stats, techSpecs } from "@/data/site";

export default function Numbers() {
  return (
    <section
      id="numeros"
      aria-labelledby="numeros-titulo"
      // data-theme="light" troca a cor do foco para escuro (ver globals.css).
      data-theme="light"
      className="bg-nevoa py-20 text-asfalto md:py-36"
    >
      <Container className="flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionLabel number="03" tone="light">
              Números
            </SectionLabel>
          </Reveal>
          <h2 id="numeros-titulo" className="text-h2 font-medium md:text-h1">
            <SplitWords text="Feita para o trajeto inteiro." />
          </h2>
        </div>

        <div>
          <dl className="grid md:grid-cols-2 md:gap-x-6">
            {stats.map((stat) => (
              // dt vem antes no HTML; flex-col-reverse mostra o número em cima.
              <div
                key={stat.label}
                className="flex flex-col-reverse gap-2 border-t border-linha-clara pb-8 pt-6 md:pb-14 md:pt-10"
              >
                <dt className="font-mono text-label font-medium uppercase text-concreto-escuro">
                  {stat.label}
                </dt>
                <dd className="text-[clamp(4.5rem,7.8vw,7rem)] font-medium leading-[0.95] tracking-[-0.04em]">
                  <Counter value={stat.value} /> {stat.unit}
                </dd>
              </div>
            ))}
          </dl>

          {/*
            <details> é o acordeão nativo do HTML: abre e fecha por clique,
            Enter ou Espaço, e já informa o estado a leitores de tela.
            `group` permite estilizar filhos quando ele está aberto (group-open).
          */}
          <details className="group border-y border-linha-clara">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-h3 font-medium [&::-webkit-details-marker]:hidden">
              Ficha técnica completa
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-6 shrink-0 stroke-current transition-transform duration-500 ease-out-expo group-open:rotate-45"
                fill="none"
                strokeWidth="1.5"
              >
                <path d="M12 4v16M4 12h16" />
              </svg>
            </summary>

            <dl className="grid gap-x-6 pb-8 md:grid-cols-2">
              {techSpecs.map((spec) => (
                <div
                  key={spec.name}
                  className="flex justify-between gap-6 border-t border-linha-clara py-4"
                >
                  <dt className="font-mono text-label font-medium uppercase text-concreto-escuro">
                    {spec.name}
                  </dt>
                  <dd className="text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </details>
        </div>
      </Container>
    </section>
  );
}
