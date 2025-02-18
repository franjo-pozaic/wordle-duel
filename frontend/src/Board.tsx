import { Letter as LetterModel } from './models'
import React, { useContext } from "react";
import { Status } from "./models";
import { OpponentContext } from './OpponentContext';


type LetterProps = {
    char: string;
    status: Status;
}

const classByStatus: Record<Status, string> = {
    CORRECT: 'correct',
    PARTIAL: 'partial',
    INITIAL: 'initial',
    WRONG: 'wrong'
}

export const Letter: React.FC<LetterProps> = ({ char, status }) => {
    return (
        <>
            <div role="letter" className={`letter ${classByStatus[status]}`}>
                {char}
            </div>  
        </>
    )
}

const Guess: React.FC<{ word: LetterModel[], opponentGuess: Status[] }> = ({ word, opponentGuess }) => {
    return (
        <>
            {
                word.map(
                    (letter, index) => 
                        <div key={`${letter.char}${index}`}>
                            <Letter char={letter.char} status={letter.status} />
                            {index === 4 && <div className='row-dots'>
                                <div className="horizontal-dots">
                                    {opponentGuess && opponentGuess.map(
                                        x => 
                                            <span key={index} className={classByStatus[x]}>
                                            </span>
                                    )}
                                </div>
                            </div>}
                        </div>
                )
            }
        </>
    )
}

export const Board: React.FC<{ boardData: LetterModel[][] }> = ({ boardData }) => {
    const gameSummary = useContext(OpponentContext);

    return (
        <>
            <div className='wordle-grid item'>
                {
                    boardData.map((word, index) =>
                        <Guess
                            key={word.map(l => l.char).join('') + index.toString()}
                            word={word} 
                            opponentGuess={gameSummary[index]}
                            />)
                }
            </div>
        </>
    )
}