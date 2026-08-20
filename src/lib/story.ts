import type { CollectionEntry } from 'astro:content';

type StoryData = CollectionEntry<'stories'>['data'];

/** Labels of the `type` dropdown in Directus. */
export const STORY_TYPE_LABELS: Record<StoryData['type'], string> = {
  'trip-recap': 'Trip Recap',
  testimony: 'Testimony',
  'ministry-update': 'Ministry Update',
};

/** `January 2025` — Directus dates are plain `YYYY-MM-DD`, so format them as UTC. */
export function storyDate(published_on: string): string {
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(`${published_on}T00:00:00Z`));
}
