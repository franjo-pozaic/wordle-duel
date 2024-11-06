import { render, screen, fireEvent } from '@testing-library/react'
import { Wordle } from './Wordle'


const clickLetter = async (letter: string) => {
    const keyboardLetters = await screen.findAllByRole('keyboard-letter');
    const letterDiv = keyboardLetters.find(l => l.textContent === letter);
    // screen.debug();
    fireEvent.click(letterDiv!);
}

const enterWord = async (word: string) => {
    for (const letter of word.split('')) {
        await clickLetter(letter);
    }
}

describe('Wordle component', () => {
    test('displays an empty grid of squares', async () => {
        render(<Wordle word='REACT' key={1} />);
        
        const squares = await screen.findAllByRole('letter');

        squares.forEach(div => {
            expect(div.className).toBe('letter initial');
        });
        expect(squares).toHaveLength(30);
    });

    test('should show a letter in the grid when you click one', async () => {
        render(<Wordle word='REACT' key={1} />);

        const letterA = await screen.findByText('A');

        fireEvent.click(letterA);

        const squares = await screen.findAllByRole('letter');
        
        expect(squares.at(0)?.className).toBe('letter initial');
        expect(squares.at(0)?.innerHTML).toBe('A');
    });

    const word = 'APPLE';
    describe.each([
        ['correct guess', [word], 'You won!'],
        ['failed guess', ['AAAAA', 'BBBBB', 'CCCCC', 'DDDDD', 'EEEEE', 'FFFFF'], 'Try again!']
    ])('%s', (_, guessWords, expectedText) => {
        beforeEach(async () => {
            render(<Wordle word={word} key={1} />);

            for (let word of guessWords) {
                await enterWord(word);
                await clickLetter('ENT');
            }
        });
        
        test('should show the correct message', async () => {
            expect((await screen.findByRole('ending-message')).innerHTML).toBe(expectedText);
        });

        test.skip('should show the word with the correct styling in the grid', async () => {
            const squares = await screen.findAllByRole('letter');
            for (const [index, letter] of word.split('').entries()) {
                expect(squares.at(index)?.className).toBe('letter correct');
                expect(squares.at(index)?.innerHTML).toBe(letter);
            }
        });

        test('should block further text clicks after the game if over', async () => {
            await enterWord('WRONG');
            const squares = await screen.findAllByRole('letter');
            
            'WRONG'.split('').forEach(letter => {
               const square = squares.find(x => x.innerHTML === letter);
               expect(square).toBeUndefined();
            });
        });
    });

    describe('keyboard letter styling', () => {
        const getKeyboardLetterElement = async (letter: string) => {
            const correctLetter = await screen.findAllByRole('keyboard-letter');
            return correctLetter.find(x => x.innerHTML.includes(letter));
        }
        
        beforeEach(async () => {
            const partiallyGoodGuess = 'PADLE';
            render(<Wordle word={'APPLE'} key={1} />);

            await enterWord(partiallyGoodGuess);
            await clickLetter('ENT');
        });
        
        test('should show the correct letter style', async () => {
            const correctLetter = await getKeyboardLetterElement('E');
            expect(correctLetter!.className).toBe('keyboard-letter correct');
        });

        test('should show the partial letter style', async () => {
            const correctLetter = await getKeyboardLetterElement('P');
            expect(correctLetter!.className).toBe('keyboard-letter partial');
        });

        test('should show the wrong letter style', async () => {
            const correctLetter = await getKeyboardLetterElement('D');
            expect(correctLetter!.className).toBe('keyboard-letter wrong');
        });
    });

    test('should delete the last character when you press DEL', async () => {
        render(<Wordle word={word} key={1} />);

        await enterWord('AB');
        
        const squares = await screen.findAllByRole('letter');
        expect(squares.at(0)?.innerHTML).toBe('A');
        expect(squares.at(1)?.innerHTML).toBe('B');
        
        await clickLetter('DEL');

        const squaresAfterDelete = await screen.findAllByRole('letter'); 
        expect(squaresAfterDelete.at(0)?.innerHTML).toBe('A');
        expect(squaresAfterDelete.at(1)?.innerHTML).toBe(' ');
    });
});