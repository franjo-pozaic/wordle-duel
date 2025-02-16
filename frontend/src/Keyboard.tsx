import "./Keyboard.css"
import { Letter, Status } from "./models";

type KeyboardProps = {
    usedLetters: Letter[];
    onKeyPress: (key: string) => void,
    onEnter: () => void,
    onDelete: () => void,
    disable: boolean
}

const qwertyKeyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const classByStatus: Record<Status, string> = {
    CORRECT: 'correct',
    PARTIAL: 'partial',
    INITIAL: '',
    WRONG: 'wrong'
}

const DeleteIcon = () => {
    return <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="game-icon" data-testid="icon-backspace"><path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>
}

export const Keyboard: React.FC<KeyboardProps> = ({ disable, usedLetters, onKeyPress, onEnter, onDelete }) => {
    const getClass = (letter: string) => {
        if (letter === 'DELETE' || letter === 'ENTER') {
            return 'special-letter';
        }
        const usedLetter = usedLetters.find(x => x.char === letter);
        if (!usedLetter) {
            return '';
        }
        return classByStatus[usedLetter.status];
    }
    const handleKeyPress = (key: string) => {
        if (disable) {
            return;
        }
        if (key === 'ENTER') {
            onEnter();
        } else if (key === 'DELETE') {
            onDelete();
        } else {
            onKeyPress(key);
        }
    }
    return (
        <>
            <div className="keyboard-wrapper">
                <div className="keyboard-row">
                    {qwertyKeyboard[0].map(letter =>
                        <button
                            role="keyboard-letter"
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`keyboard-letter ${getClass(letter)}`}>
                            {letter}
                        </button>
                    )}
                </div>
                <div className="keyboard-row">
                    <div className="letter-spacer"></div>
                    {qwertyKeyboard[1].map(letter =>
                        <button
                            role="keyboard-letter"
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`keyboard-letter ${getClass(letter)}`}>
                            {letter}
                        </button>
                    )}
                    <div className="letter-spacer"></div>
                </div>
                <div className="keyboard-row">
                    <button
                        className="keyboard-letter special-letter">
                        ENTER
                    </button>
                    {qwertyKeyboard[2].map(letter =>
                        <button
                            role="keyboard-letter"
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={`keyboard-letter ${getClass(letter)}`}>
                            {letter}
                        </button>
                    )}
                    <button className="keyboard-letter special-letter">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </>
    )
}