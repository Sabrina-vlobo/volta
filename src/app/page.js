import Colors from "@/components/sections/Colors";
import Details from "@/components/sections/Details";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Numbers from "@/components/sections/Numbers";
import TestRide from "@/components/sections/TestRide";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Manifesto />
      <Details />
      <Numbers />
      <Colors />
      <Gallery />
      <TestRide />
    </main>
  );
}
