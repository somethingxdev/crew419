import { MISSION_TRIPS, SITE_LINKS } from '@/lib/links';

export type CtaBackground = 'bg-1' | 'bg-2' | 'bg-3' | 'bg-4';

export interface CtaLink {
  label: string;
  href: string;
}

export interface CtaCopy {
  title: string;
  /** Body copy; blank lines split paragraphs, single newlines are kept. */
  text: string;
  /** Emphasized lead-in shown right above the buttons. */
  lead?: string;
  primary: CtaLink;
  secondary?: CtaLink;
  bg: CtaBackground;
}

const exploreTrips: CtaLink = { label: 'Explore Mission Trips', href: MISSION_TRIPS };
const contactTeam: CtaLink = { label: 'Contact our team', href: '/contact' };

/** Static closing CTAs — the same on every visit, so they are not editable in the CMS. */
export const CTA = {
  home: {
    title: "Don't Stay on the Bench. Step Into God's Mission.",
    text: "Whether you're leading a church, bringing students on their first mission trip, or answering God's call yourself, we're here to help you take the next step.",
    lead: "Let's build a mission experience that changes lives – and strengthens your faith.",
    primary: SITE_LINKS.call,
    secondary: exploreTrips,
    bg: 'bg-1',
  },
  about: {
    title: 'Ready to Be Part of Something Bigger?',
    text: 'Whether you’re joining your first mission trip or leading an entire team, we’re here to help you take the next step in God’s mission.',
    primary: SITE_LINKS.call,
    bg: 'bg-2',
  },
  donate: {
    title: 'Ready to Be Part of Something Bigger?',
    text: 'Whether you’re joining your first mission trip or leading an entire team, we’re here to help you take the next step in God’s mission.',
    primary: SITE_LINKS.call,
    bg: 'bg-2',
  },
  churches: {
    title: 'Let’s Plan Your Church’s Next Mission',
    text: 'We’ll help you build a mission experience that strengthens your church and impacts communities around the world.',
    primary: SITE_LINKS.call,
    secondary: contactTeam,
    bg: 'bg-3',
  },
  school: {
    title: 'Give Your Students an Experience They’ll Never Forget',
    text: 'Help your students grow in faith, leadership, and compassion through a mission trip designed specifically for your school.',
    primary: SITE_LINKS.call,
    secondary: contactTeam,
    bg: 'bg-2',
  },
  sports: {
    title: 'Ready to Lead Your Team on Mission?',
    text: 'Your team can make an impact beyond the field. Let Crew419 help you create a meaningful mission experience where sports open doors, relationships are built, and lives are changed.',
    primary: SITE_LINKS.call,
    secondary: contactTeam,
    bg: 'bg-2',
  },
  individuals: {
    title: 'Find the Mission That’s Right for You',
    text: 'Your next adventure can be more than a trip – it can be an opportunity to serve, grow, and make an eternal impact. Explore upcoming Crew419 missions and find where you belong.',
    primary: SITE_LINKS.call,
    secondary: { label: 'Explore Trips', href: MISSION_TRIPS },
    bg: 'bg-2',
  },
  custom: {
    title: 'Let’s Build a Mission That Fits Your Calling',
    text: 'Your church or school doesn’t need to fit into someone else’s itinerary.\n\nLet’s create a mission experience designed specifically for your people, your goals, and the community you’re called to serve.',
    primary: SITE_LINKS.call,
    secondary: exploreTrips,
    bg: 'bg-3',
  },
  stories: {
    title: 'Where Will God Send You Next?',
    text: 'The next story we share could be yours. Join an upcoming mission trip and become part of what God is doing around the world.',
    primary: SITE_LINKS.call,
    secondary: { label: 'Find your trip', href: MISSION_TRIPS },
    bg: 'bg-2',
  },
  story: {
    title: 'Inspired by This Story?',
    text: 'Your next step could be joining a future mission team, serving alongside local churches, and becoming part of the next story God is writing.',
    primary: SITE_LINKS.call,
    bg: 'bg-2',
  },
  resources: {
    title: 'Your Mission Starts With One Step',
    text: "God is already moving around the world.\nLet's discover where He's inviting you to serve.",
    primary: SITE_LINKS.call,
    secondary: exploreTrips,
    bg: 'bg-2',
  },
  trip: {
    title: 'Your Mission Starts With One Step',
    text: 'God is already moving around the world. Let’s discover where He’s inviting you to serve.',
    primary: SITE_LINKS.call,
    secondary: SITE_LINKS.destinations,
    bg: 'bg-4',
  },
} satisfies Record<string, CtaCopy>;

/** Region landing page — only the region name changes. */
export const regionCta = (regionName: string): CtaCopy => ({
  title: `Ready to Serve in ${regionName}?`,
  text: 'Explore upcoming trips or talk with our team to find the mission that’s right for you.',
  primary: SITE_LINKS.call,
  secondary: SITE_LINKS.destinations,
  bg: 'bg-3',
});
