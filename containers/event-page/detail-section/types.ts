import { Event } from '@/types/Event';

export type DetailSection = Omit<Event, 'slug'>;

export type Program = Pick<Event, 'program'>;

export type Info = Pick<Event, 'speaker' | 'venue' | 'phone'>;
