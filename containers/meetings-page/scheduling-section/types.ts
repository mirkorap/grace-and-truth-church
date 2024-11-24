export type ScheduleItemOpts = Omit<ScheduleItem, 'id'>;

export interface ScheduleItem {
  id: number;
  title: string;
  description: string;
  time: string;
  imgSrc: string;
  imgAlt: string;
}
