import { GameSummary, Letter } from "../models";
import { getWordStatus } from "./letterUtils";

const emptyLetter: Letter = { char: '', status: 'INITIAL' };

export const getBoard = (history: string[], currentGuess: string, word: string) => {
    const guess = currentGuess
        .padEnd(5, ' ')
        .split('')
        .map((letter) => ({
            char: letter,
            status: 'INITIAL'
        } as Letter));

    const historyWithStatus = history.map(guess => getWordStatus(guess, word));

    const filledBoard = [...historyWithStatus, guess];
    const missingRows = 6 - filledBoard.length
    for (let i = 0; i < missingRows; i++) {
        filledBoard.push([emptyLetter, emptyLetter, emptyLetter, emptyLetter, emptyLetter])
    }
    
    return filledBoard;
}


export const getSummary = (boardData: Letter[][]) => {
    const opponentSummary: GameSummary = [];
    for (const guess of boardData) {
        const correctLetters = guess.filter(x => x.status === 'CORRECT').map(x => x.status);
        const partialLetters = guess.filter(x => x.status === 'PARTIAL').map(x => x.status);
        opponentSummary.push([...correctLetters, ...partialLetters]);
    }
    return opponentSummary;
}

