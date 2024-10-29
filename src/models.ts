export type Status = 'INITIAL' | 'WRONG' | 'PARTIAL' | 'CORRECT'

export type Letter = {
  char: string;
  status: Status;
}