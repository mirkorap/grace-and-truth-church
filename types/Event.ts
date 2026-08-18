import { Block } from './Sanity';

export interface ProgramSlot {
  _key: string;
  day: string;
  time: string;
  title: string;
  speaker: string;
}

export interface ProgramGroup {
  day: string;
  slots: ProgramSlot[];
}

export interface Venue {
  name: string;
  street: string;
  city: string;
}

export interface Event {
  title: string;
  slug: string;
  startDate: string;
  endDate: string;
  image: string;
  description: Block[];
  program: ProgramSlot[];
  speaker: string;
  venue: Venue;
  phone: string;
}

export type EventCard = Pick<
  Event,
  'title' | 'slug' | 'startDate' | 'endDate' | 'image' | 'description' | 'venue'
>;

export type EventProgram = Pick<Event, 'program' | 'startDate' | 'endDate'>;

export const emptyVenue: Venue = {
  name: '',
  street: '',
  city: '',
};

export const emptyEvent: Event = {
  title: '',
  slug: '',
  startDate: '',
  endDate: '',
  image: '',
  description: [],
  program: [],
  speaker: '',
  venue: emptyVenue,
  phone: '',
};
