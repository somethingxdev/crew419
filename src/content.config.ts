import { defineCollection } from 'astro:content';
import { schemas, singletons } from '@/content/directus.schema';
import { directusLoader } from '@/lib/directus-loader';

type Name = keyof typeof schemas;
type Query = { filter?: Record<string, unknown>; sort?: string[] };


const query: Partial<Record<Name, Query>> = {
  trips: { filter: { status: { _eq: 'published' } }, sort: ['start_date'] },
  resources: { filter: { status: { _eq: 'published' } }, sort: ['title'] },
  stories: { sort: ['-published_on'] },
  faqs: { sort: ['sort'] },
  life_in_mission: { sort: ['sort'] },
  partners: { sort: ['sort'] },
  regions: { sort: ['sort'] },
  testimonials: { sort: ['sort'] },
  trip_categories: { sort: ['sort'] },
};

const loader = (name: Name) =>  directusLoader({ collection: name, singleton: (singletons as readonly string[]).includes(name), query: query[name] });


export const collections = {
  faqs: defineCollection({ loader: loader('faqs'), schema: schemas.faqs }),
  global: defineCollection({ loader: loader('global'), schema: schemas.global }),
  impact: defineCollection({ loader: loader('impact'), schema: schemas.impact }),
  life_in_mission: defineCollection({ loader: loader('life_in_mission'), schema: schemas.life_in_mission }),
  mission_paths: defineCollection({ loader: loader('mission_paths'), schema: schemas.mission_paths }),
  partners: defineCollection({ loader: loader('partners'), schema: schemas.partners }),
  regions: defineCollection({ loader: loader('regions'), schema: schemas.regions }),
  resources: defineCollection({ loader: loader('resources'), schema: schemas.resources }),
  stories: defineCollection({ loader: loader('stories'), schema: schemas.stories }),
  testimonials: defineCollection({ loader: loader('testimonials'), schema: schemas.testimonials }),
  trip_categories: defineCollection({ loader: loader('trip_categories'), schema: schemas.trip_categories }),
  trips: defineCollection({ loader: loader('trips'), schema: schemas.trips }),
  website_content: defineCollection({ loader: loader('website_content'), schema: schemas.website_content }),
};
