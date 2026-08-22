import type { CollectionEntry } from 'astro:content';

type TripData = CollectionEntry<'trips'>['data'];

/**
 * `zambia-sports-outreach` — trips have no slug field in the CMS, the URL is built
 * from the country they run in plus the trip title.
 */
export function tripSlug(countryName: string, title: string): string {
  return `${countryName} ${title}`
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const DAY = 24 * 60 * 60 * 1000;

// Directus date fields are plain `YYYY-MM-DD`, so parse them as UTC to keep the day stable in every timezone.
const utc = (date: string) => new Date(`${date}T00:00:00Z`);
const month = (date: Date) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long' }).format(date);
const monthDay = (date: Date) => `${month(date)} ${date.getUTCDate()}`;

/** `July 8–17, 2027` — collapsed to the parts the two dates do not share. */
export function tripDates({ start_date, end_date }: Pick<TripData, 'start_date' | 'end_date'>): string {
  const start = utc(start_date);
  const end = utc(end_date);
  const year = end.getUTCFullYear();

  if (start_date === end_date) return `${monthDay(start)}, ${year}`;
  if (start.getUTCFullYear() !== year) return `${monthDay(start)}, ${start.getUTCFullYear()} – ${monthDay(end)}, ${year}`;
  if (start.getUTCMonth() !== end.getUTCMonth()) return `${monthDay(start)} – ${monthDay(end)}, ${year}`;
  return `${monthDay(start)}–${end.getUTCDate()}, ${year}`;
}

/** `10 Days` — both dates are inclusive. */
export function tripDuration({ start_date, end_date }: Pick<TripData, 'start_date' | 'end_date'>): string {
  const days = Math.round((utc(end_date).getTime() - utc(start_date).getTime()) / DAY) + 1;
  return `${days} ${days === 1 ? 'Day' : 'Days'}`;
}

/** The fact strip under the trip hero. */
export function tripFacts(trip: TripData, categoryName: string): string[] {
  return [tripDates(trip), trip.short_name, tripDuration(trip), categoryName, trip.price];
}
