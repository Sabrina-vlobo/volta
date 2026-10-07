import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import { productDetails } from "@/data/site";
import DetailsScroller from "./DetailsScroller";

export default function Details() {
  return (
    <section
      id="produto"
      aria-labelledby="produto-titulo"
      className="py-20 md:py-36"
    >
      <Container className="flex flex-col gap-10 md:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionLabel number="02">Engenharia</SectionLabel>
          </Reveal>
          <h2
            id="produto-titulo"
            className="max-w-[52rem] text-h2 font-medium md:text-h1"
          >
            <SplitWords text="Cada detalhe, pensado para a cidade." />
          </h2>
        </div>

        <DetailsScroller items={productDetails} />
      </Container>
    </section>
  );
}
