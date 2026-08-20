/** Buttons that are identical on every trip, story and region page, so they are not editable in Directus. */
export const SITE_LINKS = {
  call: { label: 'Book a 30–minute call', href: '/contact' },
  guide: { label: 'Download Travel Guide', href: '/resources/travel-guides' },
  destinations: { label: 'Find Your Destination', href: '/trips#destinations' },
} as const;
