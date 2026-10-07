import { SITE_URL } from "@/lib/site";

// Gera /sitemap.xml. O site tem uma única página.
export default function sitemap() {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
