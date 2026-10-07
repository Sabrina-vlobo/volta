import Magnetic from "@/components/motion/Magnetic";
import RevealText from "@/components/motion/RevealText";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { heroSpecs } from "@/data/site";
import HeroScroll from "./HeroScroll";
import HeroVideo from "./HeroVideo";
import VideoToggle from "./VideoToggle";

const VIDEO_ID = "hero-video";

export default function Hero() {
  return (
    <HeroScroll
      background={
        <>
          {/*
            Poster: primeiro quadro do vídeo como imagem comum. Aparece antes
            de o vídeo carregar e é o que fica quando ele não toca.
            <picture> entrega o arquivo certo para cada largura de tela, e
            fetchPriority="high" faz o navegador baixá-lo antes do resto.
            É um <img> simples (e não o next/image) porque o arquivo já está
            no tamanho e formato finais.
          */}
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="/videos/hero-desktop-poster.jpg"
            />
            <img
              src="/videos/hero-mobile-poster.jpg"
              alt=""
              fetchPriority="high"
              className="absolute inset-0 size-full object-cover"
            />
          </picture>
          <HeroVideo id={VIDEO_ID} />
          {/* Camadas que garantem contraste do texto sobre qualquer quadro:
              um véu escuro geral, mais degradês na base (título) e no topo
              (header), já que o céu do vídeo é claro. */}
          <div aria-hidden="true" className="absolute inset-0 bg-asfalto/45" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-asfalto/70 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-asfalto via-asfalto/60 to-transparent"
          />
        </>
      }
    >
      <Container className="pb-5 pt-32 md:pb-10">
        <h1
          id="hero-titulo"
          // No mobile o tamanho acompanha a largura (12.3vw) para o título
          // caber em duas linhas mesmo em telas de 360px.
          className="text-[clamp(2.5rem,12.3vw,3rem)] font-medium leading-[0.95] tracking-[-0.04em] md:text-display"
        >
          {/* A quebra de linha muda entre mobile e desktop, por isso há duas
              versões; `hidden` tira a outra da tela e dos leitores de tela. */}
          <span className="md:hidden">
            <RevealText
              trigger="mount"
              delay={0.1}
              lines={["A cidade, de", "volta para você."]}
            />
          </span>
          <span className="hidden md:block">
            <RevealText
              trigger="mount"
              delay={0.1}
              lines={["A cidade, de volta", "para você."]}
            />
          </span>
        </h1>

        {/* Entrada por CSS (animate-fade-up), pelo mesmo motivo do título. */}
        <div className="mt-6 flex animate-fade-up flex-col gap-8 [animation-delay:0.4s] md:mt-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-start gap-6">
            <p className="max-w-md text-body-lg">
              A Volta One é a e-bike urbana que torna o trajeto a melhor parte
              do dia.
            </p>
            <Magnetic>
              <Button href="#test-ride">Agendar test ride</Button>
            </Magnetic>
          </div>

          <div className="flex items-end justify-between gap-6 md:justify-start md:gap-14">
            <dl className="flex flex-1 justify-between md:flex-none md:justify-start md:gap-14">
              {heroSpecs.map((spec) => (
                // dt (rótulo) vem antes no HTML; flex-col-reverse mostra o valor em cima.
                <div key={spec.label} className="flex flex-col-reverse gap-1">
                  <dt className="font-mono text-label font-medium uppercase text-concreto">
                    {spec.label}
                  </dt>
                  <dd className="text-h3 font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <Magnetic strength={0.4}>
              <VideoToggle videoId={VIDEO_ID} />
            </Magnetic>
          </div>
        </div>
      </Container>
    </HeroScroll>
  );
}
