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
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
];

const classByStatus: Record<Status, string> = {
    CORRECT: 'correct',
    PARTIAL: 'partial',
    INITIAL: '',
    WRONG: 'wrong'
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
                {qwertyKeyboard.map((row, index) =>
                    <div key={index} className="keyboard-row">
                        {row.map(letter =>
                            <div
                                role="keyboard-letter"
                                key={letter}
                                onClick={() => handleKeyPress(letter)}
                                className={`keyboard-letter ${getClass(letter)}`}>
                                {letter}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}