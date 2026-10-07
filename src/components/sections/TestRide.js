import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";
import TestRideForm from "./TestRideForm";

export default function TestRide() {
  return (
    <section
      id="test-ride"
      aria-labelledby="test-ride-titulo"
      className="py-20 md:py-36"
    >
      <Container className="grid gap-12 md:grid-cols-[1fr_minmax(0,35rem)] md:gap-6">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <SectionLabel number="06">Test ride</SectionLabel>
          </Reveal>
          <h2 id="test-ride-titulo" className="text-h2 font-medium md:text-h1">
            <SplitWords text="Pedale antes de decidir." />
          </h2>
          <Reveal delay={0.2} className="flex flex-col gap-6">
            <p className="max-w-md text-body-lg text-concreto">
              Agende um test ride gratuito de 30 minutos na loja mais próxima.
            </p>
            <p className="mt-6 flex flex-col gap-1">
              <span className="font-mono text-label font-medium uppercase text-concreto">
                A partir de
              </span>
              <span className="text-h3 font-medium md:text-h2">R$ 14.900</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <TestRideForm />
        </Reveal>
      </Container>
    </section>
  );
}
