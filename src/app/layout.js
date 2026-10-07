import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Cursor from "@/components/layout/Cursor";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MotionProvider from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// O pacote `geist` traz os arquivos da fonte e usa o next/font por baixo:
// as fontes são servidas pelo próprio site, sem requisição externa
// e sem salto de layout no carregamento.

export const metadata = {
  // Base para transformar caminhos relativos (imagem de compartilhamento,
  // link canônico) em URLs absolutas.
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  // A imagem vem do arquivo opengraph-image.jpg, nesta mesma pasta.
  openGraph: {
    title: SITE_TITLE,
    description: "A e-bike urbana que torna o trajeto a melhor parte do dia.",
    url: "/",
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#0e0f0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      // Avisa o Next que o scroll suave do CSS (globals.css) é intencional.
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body>
        {/* Primeiro elemento focável: leva quem navega por teclado direto ao conteúdo. */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-volt focus:px-5 focus:py-3 focus:text-asfalto"
        >
          Pular para o conteúdo
        </a>
        <SmoothScroll />
        <MotionProvider>
          <Header />
          {children}
          <Footer />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
