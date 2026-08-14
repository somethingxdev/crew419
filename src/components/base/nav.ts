export type NavLink = {
  label: string;
  href: string;
};

export const missionTripItems: NavLink[] = [
  { label: 'All Trips', href: '/trips' },
  { label: 'USA', href: '/trips/usa' },
  { label: 'Canada', href: '/trips/canada' },
  { label: 'Caribbean', href: '/trips/caribbean' },
  { label: 'Central America', href: '/trips/central-america' },
  { label: 'South America', href: '/trips/south-america' },
  { label: 'Africa', href: '/trips/africa' },
  { label: 'Europe', href: '/trips/europe' },
  { label: 'Middle East', href: '/trips/middle-east' },
  { label: 'Asia', href: '/trips/asia' },
  { label: 'Custom Trips', href: '/trips/custom' },
];

export const resourceItems: NavLink[] = [
  { label: 'Discipleship Guide', href: '/resources/discipleship-guide' },
  { label: 'Travel Guides', href: '/resources/travel-guides' },
  { label: 'Fundraising Guide', href: '/resources/fundraising-guide' },
];

export const aboutItems: NavLink[] = [
  { label: 'Our Mission', href: '/about/mission' },
  { label: 'Leadership Team', href: '/about/leadership' },
  { label: 'Statement of Faith', href: '/about/statement-of-faith' },
];

export const simpleLinks: NavLink[] = [
  { label: 'Stories', href: '/stories' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact', href: '/contact' },
];
