import { Sermon } from '@/types/Sermon';

export interface LastSermons {
  featured: Sermon;
  others: Sermon[];
}