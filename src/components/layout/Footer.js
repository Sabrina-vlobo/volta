import RevealText from "@/components/motion/RevealText";
import Container from "@/components/ui/Container";
import { socialLinks } from "@/data/site";
import Clock from "./Clock";
import FooterGlow from "./FooterGlow";

const linkClass =
  "transition-colors duration-300 ease-out-expo hover:text-volt";

export default function Footer() {
  return (
    <footer className="relative flex min-h-[42rem] flex-col justify-between overflow-hidden bg-asfalto md:min-h-[54rem]">
      <FooterGlow />

      <Container className="relative pt-6 md:pt-10">
        <div className="flex justify-between gap-6 border-b border-linha pb-6 font-mono text-label font-medium uppercase">
          <ul className="flex gap-5">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="mailto:ola@volta.bike"
            className={`hidden text-concreto md:block ${linkClass}`}
          >
            ola@volta.bike
          </a>
        </div>
      </Container>

      {/* A frase gigante é o CTA final: um link para o formulário. */}
      <Container className="relative flex flex-col gap-4">
        <p
          aria-hidden="true"
          className="font-mono text-label font-medium uppercase text-concreto"
        >
          Agendar test ride →
        </p>
        <a
          href="#test-ride"
          aria-label="Dê uma volta: agendar test ride"
          data-cursor="Agendar"
          className="block text-display-xl font-medium transition-opacity duration-500 ease-out-expo hover:opacity-80"
        >
          <RevealText lines={["Dê uma volta."]} />
        </a>
      </Container>

      {/* Texto escuro: esta faixa fica sempre sobre a mancha Volt. */}
      <Container className="relative flex justify-between gap-6 pb-6 font-mono text-label font-medium uppercase text-asfalto md:pb-10">
        <p>Volta © 2026 · Projeto fictício</p>
        <p>
          São Paulo <Clock />
        </p>
      </Container>
    </footer>
  );
}
