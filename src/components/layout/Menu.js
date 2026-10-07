"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { navLinks, socialLinks } from "@/data/site";

/**
 * Menu em tela cheia.
 * Usa o <dialog> nativo com showModal(): o navegador já prende o foco
 * dentro do menu, fecha com Esc e devolve o foco ao botão que abriu.
 */
export default function Menu({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label="Menu principal"
      // Impede o Lenis de rolar a página enquanto o menu está aberto.
      data-lenis-prevent
      className="menu-dialog h-dvh max-h-none w-screen max-w-none overflow-hidden bg-asfalto text-nevoa open:flex open:flex-col"
    >
      {/* Mancha decorativa, mesma linguagem do footer. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-24 size-[28rem] rounded-full bg-volt/30 blur-[100px] md:size-[44rem] md:blur-[160px]"
      />

      <Container className="relative flex items-center justify-between py-4 md:py-6">
        <span className="text-h3 font-medium">Volta</span>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Container>

      <Container
        as="nav"
        aria-label="Principal"
        className="relative flex flex-1 flex-col justify-center"
      >
        <ul className="flex flex-col gap-2 md:gap-0">
          {navLinks.map((link, index) => (
            // --i é o índice do item: o CSS usa para atrasar a entrada de cada link.
            <li key={link.href} className="menu-item" style={{ "--i": index }}>
              <a
                href={link.href}
                onClick={onClose}
                className="inline-block text-h1 font-medium text-concreto transition-colors duration-300 ease-out-expo hover:text-nevoa focus-visible:text-nevoa md:text-display"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="relative pb-5 md:pb-10">
        <ul className="flex gap-5 font-mono text-label font-medium uppercase">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-volt"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </dialog>
  );
}
