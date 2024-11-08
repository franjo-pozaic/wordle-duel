import { Letter as LetterModel } from './models'
import React from "react";
import { Status } from "./models";


type LetterProps = {
    char: string;
    status: Status;
}

export const Letter: React.FC<LetterProps> = ({ char, status }) => {
    const classByStatus: Record<Status, string> = {
        CORRECT: 'correct',
        PARTIAL: 'partial',
        INITIAL: 'initial',
        WRONG: 'wrong'
    }
    return (
        <>
            <div role="letter" className={`letter ${classByStatus[status]}`}>
                {char}
            </div>
        </>
    )
}

const Guess: React.FC<{ word: LetterModel[] }> = ({ word }) => {
    return (
        <>
            {word.map((letter, index) => <Letter key={`${letter.char}${index}`} char={letter.char} status={letter.status} />)}
        </>
    )
}

export const Board: React.FC<{ boardData: LetterModel[][] }> = ({ boardData }) => {
    return (
        <>
            <div className='wordle-grid item'>
                {boardData.map((word, index) =>
                    <Guess
                        key={word.map(l => l.char).join('') + index.toString()}
                        word={word} />)}
            </div>
        </>
    )
}