import { getSingleton } from '@/lib/content';

export type NavLink = { label: string; href: string };

type Location = 'header' | 'footer';
type Group = 'mission_trips' | 'resources' | 'about' | 'simple' | 'connect' | 'legal';

/** Links from `global.navigation` for one location, grouped and sorted. */
export async function getNavigation(location: Location): Promise<Record<Group, NavLink[]>> {
  const { navigation } = await getSingleton('global');
  const groups: Record<Group, NavLink[]> = { mission_trips: [], resources: [], about: [], simple: [], connect: [], legal: [] };
  for (const item of [...navigation].sort((a, b) => a.sort - b.sort)) {
    if (item.location.includes(location)) groups[item.group].push({ label: item.label, href: item.href });
  }
  return groups;
}
