import { Status } from "../models";

export function getStatus(letter: string, index: number, word: string): Status {
    const upperCaseLetter = letter.toUpperCase();
    if (word[index] === upperCaseLetter) {
      return 'CORRECT'
    } else if (word.includes(upperCaseLetter)) {
      return 'PARTIAL'
    } else {
      return 'WRONG'
    }
  }