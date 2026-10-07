// Guarda a instância do Lenis para que outros componentes possam
// pedir um scroll suave até um elemento (ver SmoothScroll.js).
let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

/** Rola até um elemento. Sem Lenis (ex.: movimento reduzido), usa o nativo. */
export function scrollToElement(element, { center = false } = {}) {
  if (!element) return;

  if (instance) {
    const offset = center
      ? -(window.innerHeight - element.offsetHeight) / 2
      : 0;
    instance.scrollTo(element, { offset });
  } else {
    element.scrollIntoView({ block: center ? "center" : "start" });
  }
}
