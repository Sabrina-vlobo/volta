"use client";

import { useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/motion/Magnetic";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { useHeaderScroll } from "@/hooks/useHeaderScroll";
import Menu from "./Menu";

export default function Header() {
  const { hidden, pastHero } = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-40",
          "transition-[translate,background-color] duration-500 ease-out-expo",
          // Se algo dentro do header receber foco, ele volta a aparecer.
          "focus-within:translate-y-0",
          hidden ? "-translate-y-full" : "translate-y-0",
          pastHero ? "bg-asfalto/70 backdrop-blur-md" : "bg-transparent",
        ].join(" ")}
      >
        <Container className="flex items-center justify-between py-4 md:py-6">
          <Link
            href="/"
            aria-label="Volta, página inicial"
            className="text-h3 font-medium"
          >
            Volta
          </Link>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Button href="#test-ride">Test ride</Button>
            </Magnetic>
            <Magnetic>
              <Button
                variant="secondary"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                Menu
              </Button>
            </Magnetic>
          </div>
        </Container>
      </header>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
