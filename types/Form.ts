export type InputType = 'text' | 'password';

export interface Input {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: InputType;
}

export interface Textarea {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  cols: number;
  rows: number;
}
