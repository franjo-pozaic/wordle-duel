import React from "react";
import { Status } from "./App";



type LetterProps = {
    char: string;
    status: Status;
}


export const Letter: React.FC<LetterProps> = ({ char, status }) => {
    const classByStatus: Record<Status, string> = {
        CORRECT: 'correct',
        PARTIAL: 'partial',
        INITIAL: '',
        WRONG: 'wrong'
    }
    return (
        <>
            <div className={`letter ${classByStatus[status]}`}>
                {char}
            </div>
        </>
    )
} 