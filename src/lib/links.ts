/** Buttons that are identical on every trip, story and region page, so they are not editable in Directus. */
export const SITE_LINKS = {
  call: { label: 'Book a 30–minute call', href: '/contact' },
  guide: { label: 'Download Travel Guide', href: '/resources/travel-guides' },
  destinations: { label: 'Find Your Destination', href: '/mission-trips#destinations' },
} as const;

/** The mission trips hub. */
export const MISSION_TRIPS = '/mission-trips';

/** `/mission-trips/caribbean` — a region landing page. */
export const regionPath = (regionSlug: string) => `${MISSION_TRIPS}/${regionSlug}`;

/** `/mission-trips/caribbean/dominican-republic-girls-basketball` — a trip detail page. */
export const tripPath = (regionSlug: string, tripSlug: string) => `${MISSION_TRIPS}/${regionSlug}/${tripSlug}`;
