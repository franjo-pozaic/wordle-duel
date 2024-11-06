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