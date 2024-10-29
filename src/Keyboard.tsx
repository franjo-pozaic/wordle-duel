import "./Keyboard.css"
type KeyboardProps = {
    usedLetters: Set<string>;
    onKeyPress: (key: string) => void,
    onEnter: () => void,
    onDelete: () => void
}

const qwertyKeyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENT']
];


export const Keyboard: React.FC<KeyboardProps> = ({ usedLetters, onKeyPress, onEnter, onDelete }) => {
    const handleKeyPress = (key: string) => {
        if (usedLetters.has(key)) {
            return;
        }
        if (key === 'ENT') {
            onEnter();
        } else if (key === 'DEL') {
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
                                className={`keyboard-letter ${usedLetters.has(letter) ? 'used-letter' : ''}`}>
                                {letter}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}