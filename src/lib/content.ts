import { getEntry, type CollectionEntry } from 'astro:content';
import { SINGLETON_ID } from '@/lib/directus-loader';
import type { singletons } from '@/content/directus.schema';

type Singleton = (typeof singletons)[number];

/** Data of a Directus singleton (`global`, `website_content`, ...). */
export async function getSingleton<C extends Singleton>(collection: C): Promise<CollectionEntry<C>['data']> {
  const entry = await getEntry(collection, SINGLETON_ID);
  if (!entry) throw new Error(`Directus singleton "${collection}" is not loaded`);
  return entry.data;
}
