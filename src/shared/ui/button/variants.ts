import { tv } from 'tailwind-variants';

export const button = tv({
  base: [
    'inline-flex items-center justify-center gap-1.5 rounded-full font-black uppercase whitespace-nowrap',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'transition-all outline-none focus-visible:ring-3',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-disabled:pointer-events-none data-disabled:opacity-50',
    'aria-invalid:border-error aria-invalid:focus-visible:ring-error/40',
  ],
  variants: {
    variant: {
      default: 'bg-foreground text-background hover:bg-foreground/90 focus-visible:ring-outline/50',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/50',
      soft: 'border border-primary/20 bg-primary/45 text-primary-foreground hover:bg-primary/55 focus-visible:ring-primary/50',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-primary focus-visible:ring-secondary/50',
      outline: 'focus-visible:ring-outline/50 bg-white/16 focus-visible:border-outline hover:bg-secondary hover:text-secondary-foreground border shadow-xs hover:border-transparent',
      cream: 'bg-cream text-foreground hover:bg-cream/90 focus-visible:ring-foreground/50',
      glass: 'border border-white/16 bg-white/35 text-cream backdrop-blur-md hover:bg-white/45 focus-visible:ring-white/50',
      ghost: 'hover:bg-muted hover:text-foreground focus-visible:ring-outline/50',
      info: 'bg-info text-info-foreground hover:bg-info/90 focus-visible:ring-info/50',
      success: 'bg-success text-success-foreground hover:bg-success/90 focus-visible:ring-success/50',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:ring-warning/50',
      error: 'bg-error text-error-foreground hover:bg-error/90 focus-visible:ring-error/50',
    },
    size: {
      sm: "h-9 px-4 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-12 px-5 text-base has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-4.5",
      lg: "h-12 md:h-14 px-7.5 text-base has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
      'icon-sm': "size-9 [&_svg:not([class*='size-'])]:size-3.5",
      icon: "size-11 [&_svg:not([class*='size-'])]:size-4.5",
      'icon-lg': "size-12 [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
});
