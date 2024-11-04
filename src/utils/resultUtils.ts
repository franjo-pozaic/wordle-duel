import { Letter } from "../models";

export const getResult = (history: Letter[][], word: string) => {
    if (history.length === 0) {
      return undefined;
    }
    const lastGuess = history[history.length - 1].map(l => l.char).join('');
    
    if (lastGuess === word) {
      return 'WIN'
    } else if (history.length === 6) {
      return 'LOSS';
    } else {
      return undefined;
    }

  }