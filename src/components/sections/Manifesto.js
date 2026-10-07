import Image from "next/image";
import Parallax from "@/components/motion/Parallax";
import RevealMedia from "@/components/motion/RevealMedia";
import ScrollWords from "@/components/motion/ScrollWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import foto01 from "../../../public/images/manifesto-01.jpg";
import foto02 from "../../../public/images/manifesto-02.jpg";
import foto03 from "../../../public/images/manifesto-03.jpg";
import foto04 from "../../../public/images/manifesto-04.jpg";

const text =
  "Cidades foram feitas para pessoas, não para o trânsito. A Volta devolve o que o caminho tirou: tempo, silêncio e a vontade de ir mais longe.";

/**
 * Card de foto do manifesto: parallax por fora, revelação com máscara
 * por dentro. `className` define tamanho, proporção e posição.
 */
function Photo({ src, alt, speed, sizes, className }) {
  return (
    <Parallax speed={speed} className={className}>
      <RevealMedia className="relative size-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </RevealMedia>
    </Parallax>
  );
}

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      aria-label="Manifesto"
      className="relative overflow-hidden py-20 md:py-0"
    >
      <Container className="flex flex-col items-center gap-10 md:min-h-[61.25rem] md:justify-center">
        {/*
          No mobile as fotos ficam no fluxo: duas em cima, duas embaixo.
          A partir de md, `contents` "dissolve" o wrapper e cada foto passa a
          ser posicionada de forma absoluta nos cantos da seção, em porcentagem.
          Cada foto tem uma velocidade de parallax diferente: é isso que
          dá a sensação de profundidade.
        */}
        <div className="flex w-full items-end gap-4 md:contents">
          <Photo
            src={foto01}
            alt="Mulher de capacete pedalando a Volta One em frente a um prédio de concreto"
            speed={70}
            sizes="(min-width: 768px) 18vw, 52vw"
            className="aspect-[3/4] w-[52%] md:absolute md:left-[5.5%] md:top-[8%] md:w-[18%]"
          />
          <Photo
            src={foto02}
            alt="Guidão visto por quem pedala, com as luzes da cidade desfocadas ao fundo"
            speed={30}
            sizes="(min-width: 768px) 17vw, 38vw"
            className="aspect-[4/3] w-[38%] md:absolute md:right-[5%] md:top-[7%] md:w-[16.5%]"
          />
        </div>

        <SectionLabel number="01">Manifesto</SectionLabel>

        <ScrollWords
          text={text}
          className="max-w-[44rem] text-balance text-center text-h2 font-medium"
        />

        <div className="flex w-full items-start justify-end gap-4 md:contents">
          <Photo
            src={foto04}
            alt="Homem de mochila subindo uma escada com a Volta One na mão, ao entardecer"
            speed={45}
            sizes="(min-width: 768px) 16vw, 36vw"
            className="aspect-[5/6] w-[36%] md:absolute md:bottom-[7%] md:left-[10.5%] md:w-[15.5%]"
          />
          <Photo
            src={foto03}
            alt="Volta One encostada em uma fachada de pedra ao lado de uma vitrine iluminada, ao entardecer"
            speed={90}
            sizes="(min-width: 768px) 19vw, 58vw"
            className="aspect-[5/6] w-[58%] md:absolute md:bottom-[5%] md:right-[4%] md:w-[19%]"
          />
        </div>
      </Container>
    </section>
  );
}
