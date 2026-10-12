export interface RecordingSeries {
  title: string;
  slug: string;
  description: string;
  image: string;
  externalUrl: string;
  count: number;
}

export interface Recording {
  title: string;
  slug: string;
  recordedAt: string;
  audioKey: string;
  duration: number;
  order: number;
}

export type PlayableRecording = Omit<Recording, 'audioKey'> & {
  src: string;
};
