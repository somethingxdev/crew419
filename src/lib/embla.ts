import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';

/** Shared Embla options; `reduced` disables the slide animation and drag for prefers-reduced-motion. */
export const emblaOptions = (reduced: boolean, overrides: EmblaOptionsType = {}): EmblaOptionsType => ({
  align: 'start',
  containScroll: 'trimSnaps',
  duration: reduced ? 0 : 25,
  watchDrag: !reduced,
  ...overrides,
});

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Wire prev/next buttons to an Embla instance and keep them disabled at the edges. */
export const bindArrows = (embla: EmblaCarouselType, prev: HTMLButtonElement, next: HTMLButtonElement) => {
  const toggle = () => {
    prev.disabled = !embla.canScrollPrev();
    next.disabled = !embla.canScrollNext();
  };

  prev.addEventListener('click', () => embla.scrollPrev());
  next.addEventListener('click', () => embla.scrollNext());
  embla.on('select', toggle);
  embla.on('reInit', toggle);
  toggle();
};
