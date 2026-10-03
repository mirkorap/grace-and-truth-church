import { PlayableRecording } from '@/types/Recording';

export interface RecordingSeriesHero {
  title: string;
  description: string;
}

export interface RecordingListSection {
  recordings: PlayableRecording[];
}
