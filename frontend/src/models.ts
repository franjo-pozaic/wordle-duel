export type Status = 'INITIAL' | 'WRONG' | 'PARTIAL' | 'CORRECT'

export type Letter = {
  char: string;
  status: Status;
}


export type GameSummary = Status[][]

export type GameData = {
    word: string;
    id: string;
}
