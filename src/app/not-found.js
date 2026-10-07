import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata = { title: "Página não encontrada" };

// Página 404, no mesmo tom do resto do site.
export default function NotFound() {
  return (
    <main id="conteudo">
      <Container className="flex min-h-svh flex-col items-start justify-center gap-6 py-32">
        <SectionLabel number="404">Rota não encontrada</SectionLabel>
        <h1 className="text-h1 font-medium md:text-display">
          Esse caminho não leva a lugar nenhum.
        </h1>
        <p className="max-w-md text-body-lg text-concreto">
          A página que você procura não existe ou mudou de endereço.
        </p>
        <Button href="/">Dar a volta</Button>
      </Container>
    </main>
  );
}
