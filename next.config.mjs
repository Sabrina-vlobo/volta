/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Qualidades de compressão que o next/image pode gerar.
    // 75 é o padrão; 90 é usado nas fotos de produto, onde o detalhe importa.
    qualities: [75, 90],
  },
};

export default nextConfig;
