import { Letter } from "../models";

const emptyLetter: Letter = { char: '', status: 'INITIAL' };


export const getBoardData = (history: Letter[][], currentGuess: string) => {
    const guess = currentGuess
        .padEnd(5, ' ')
        .split('')
        .map((letter) => ({
            char: letter,
            status: 'INITIAL'
        } as Letter));

    const filledBoard = [...history, guess];
    const missingRows = 6 - filledBoard.length
    for (let i = 0; i < missingRows; i++) {
        filledBoard.push([emptyLetter, emptyLetter, emptyLetter, emptyLetter, emptyLetter])
    }
    return filledBoard;
}