import { SITE_URL } from "@/lib/site";

// Gera /robots.txt: libera o site para buscadores e aponta o sitemap.
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
