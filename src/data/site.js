// Imagens importadas como módulos: o Next gera uma URL com hash do conteúdo.
// Ao trocar um arquivo (mesmo mantendo o nome), a URL muda e nenhum cache
// antigo é reaproveitado. De quebra, largura e altura vêm automaticamente.
import cidadeCafe from "../../public/images/cidade-cafe.jpg";
import cidadeCasa from "../../public/images/cidade-casa.jpg";
import cidadeCentro from "../../public/images/cidade-centro.jpg";
import cidadeParque from "../../public/images/cidade-parque.jpg";
import cidadePonte from "../../public/images/cidade-ponte.jpg";
import bikeAreia from "../../public/images/bike-areia.jpg";
import bikeGrafite from "../../public/images/bike-grafite.jpg";
import bikeMusgo from "../../public/images/bike-musgo.jpg";
import bikeTerracota from "../../public/images/bike-terracota.jpg";
import detalheBateria from "../../public/images/detalhe-bateria.jpg";
import detalheDisplay from "../../public/images/detalhe-display.jpg";
import detalheLuzes from "../../public/images/detalhe-luzes.jpg";
import detalheMotor from "../../public/images/detalhe-motor.jpg";

// Conteúdo compartilhado entre componentes.
// Manter os textos aqui deixa os componentes focados em estrutura e estilo.

export const navLinks = [
  { label: "Produto", href: "#produto" },
  { label: "Números", href: "#numeros" },
  { label: "Cores", href: "#cores" },
  { label: "Na cidade", href: "#na-cidade" },
  { label: "Test ride", href: "#test-ride" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export const heroSpecs = [
  { value: "120 km", label: "Autonomia" },
  { value: "17 kg", label: "Peso" },
  { value: "3 h", label: "Recarga" },
];

export const productDetails = [
  {
    id: "motor",
    name: "Motor",
    title: "Motor silencioso de 250 W",
    text: "Integrado ao cubo traseiro, entrega a força de forma progressiva. Você sente o impulso, não o motor.",
    spec: "40 Nm · até 25 km/h",
    image: detalheMotor,
    imageAlt:
      "Close do motor no cubo da roda traseira e da correia de transmissão",
    // Ponto da foto que deve ficar visível quando ela é cortada.
    imagePosition: "45% 50%",
  },
  {
    id: "bateria",
    name: "Bateria",
    title: "Bateria removível",
    text: "Sai do quadro com um clique e carrega em qualquer tomada, em casa ou no escritório.",
    spec: "360 Wh · recarga em 3 h",
    image: detalheBateria,
    imageAlt: "Mão retirando a bateria do tubo do quadro",
    // Ponto da foto que deve ficar visível quando ela é cortada.
    imagePosition: "62% 50%",
  },
  {
    id: "display",
    name: "Display",
    title: "Display integrado ao guidão",
    text: "Velocidade, autonomia e navegação à vista, sem suporte nem cabos aparentes.",
    spec: 'OLED 1,3" · Bluetooth',
    image: detalheDisplay,
    imageAlt: "Guidão visto de cima com o display mostrando 24,5 km/h",
    // Ponto da foto que deve ficar visível quando ela é cortada.
    imagePosition: "50% 50%",
  },
  {
    id: "iluminacao",
    name: "Iluminação",
    title: "Luzes embutidas no quadro",
    text: "Farol e lanterna acendem sozinhos ao escurecer e sinalizam a frenagem.",
    spec: "120 lúmens · sensor de luz",
    image: detalheLuzes,
    imageAlt: "Farol em faixa de LED aceso na frente do quadro",
    // Ponto da foto que deve ficar visível quando ela é cortada.
    imagePosition: "50% 50%",
  },
];

// Valor e unidade separados: o contador animado (Etapa 7) anima só o número.
export const stats = [
  { value: 120, unit: "km", label: "Autonomia por carga" },
  { value: 17, unit: "kg", label: "Peso total" },
  { value: 3, unit: "h", label: "Recarga completa" },
  { value: 25, unit: "km/h", label: "Assistência máxima" },
];

export const techSpecs = [
  { name: "Motor", value: "250 W no cubo traseiro, 40 Nm" },
  { name: "Bateria", value: "360 Wh, removível" },
  { name: "Autonomia", value: "Até 120 km" },
  { name: "Recarga", value: "3 h (0 a 100%)" },
  { name: "Velocidade assistida", value: "Até 25 km/h" },
  { name: "Peso", value: "17 kg" },
  { name: "Quadro", value: "Alumínio 6061" },
  { name: "Transmissão", value: "Correia de carbono, marcha única" },
  { name: "Freios", value: "Disco hidráulico" },
  { name: "Pneus", value: "700×38c" },
  { name: "Conectividade", value: "Bluetooth, app para iOS e Android" },
  { name: "Garantia", value: "2 anos" },
];

// hex: cor da amostra. glow: tom usado na mancha de fundo da seção.
export const bikeColors = [
  {
    id: "grafite",
    image: bikeGrafite,
    name: "Grafite",
    hex: "#2a2d2c",
    glow: "#5a5f5c",
  },
  {
    id: "areia",
    image: bikeAreia,
    name: "Areia",
    hex: "#d8d0c0",
    glow: "#d8d0c0",
  },
  {
    id: "musgo",
    image: bikeMusgo,
    name: "Musgo",
    hex: "#47523f",
    glow: "#6b7d5e",
  },
  {
    id: "terracota",
    image: bikeTerracota,
    name: "Terracota",
    hex: "#b4552f",
    glow: "#b4552f",
  },
];

// shape define o formato do card no desktop (ver `shapes` em Gallery.js).
// position é o ponto da foto que fica visível quando ela é cortada.
export const cityMoments = [
  {
    time: "06:40",
    place: "Ponte",
    image: cidadePonte,
    alt: "Ciclista atravessando uma ponte ao amanhecer, com névoa sobre o rio",
    shape: "wide",
    position: "50% 50%",
  },
  {
    time: "08:15",
    place: "Café",
    image: cidadeCafe,
    alt: "Volta One encostada na fachada de azulejos de um café, com um cliente sentado à mesa",
    shape: "tall",
    position: "35% 60%",
  },
  {
    time: "12:30",
    place: "Centro",
    image: cidadeCentro,
    alt: "Ciclista na ciclovia de uma avenida entre prédios altos, sob sol de meio-dia",
    shape: "tallLarge",
    position: "50% 70%",
  },
  {
    time: "18:05",
    place: "Parque",
    image: cidadeParque,
    alt: "Ciclista visto de costas em uma alameda arborizada de parque, contra o sol do fim da tarde",
    shape: "wide",
    position: "50% 50%",
  },
  {
    time: "21:10",
    place: "Volta para casa",
    image: cidadeCasa,
    alt: "Ciclista de costas em uma rua de paralelepípedos à noite, sob a luz dos postes",
    shape: "tall",
    position: "60% 65%",
  },
];
