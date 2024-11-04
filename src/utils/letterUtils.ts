import { Letter } from "../models";
import { getStatus } from "./letterStatus";

export const getUsedLetters = (history: Letter[][]) => {
    const usedLetters = history.flatMap(x => x);
    return [...new Set(usedLetters)];
}

export const getLetterModel = (currentWord: string, word: string) => {
    return currentWord
    .split('')
    .map((letter, index) => ({
      char: letter,
      status: getStatus(letter, index, word)
    } as Letter));
}