import { render, screen, fireEvent } from '@testing-library/react'
import { Wordle } from './Wordle'

describe('Wordle component', () => {
    test('displays an empty grid of squares', async () => {
        render(<Wordle word='REACT' key={1} />);
        
        const squares = await screen.findAllByRole('letter');

        squares.forEach(div => {
            expect(div.className).toBe('letter ');
        });
        expect(squares).toHaveLength(30);
    });

    test('should show a letter in the grid when you click one', async () => {
        render(<Wordle word='REACT' key={1} />);

        const letterA = await screen.findByText('A');

        fireEvent.click(letterA);

        const squares = await screen.findAllByRole('letter');
        
        expect(squares.at(0)?.className).toBe('letter ')
        expect(squares.at(0)?.innerHTML).toBe('A')
    });

    describe('success case', () => {
        const clickLetter = async (letter: string) => {
            const keyboardLetters = await screen.findAllByRole('keyboard-letter');
            const letterDiv = keyboardLetters.find(l => l.textContent === letter);
            fireEvent.click(letterDiv!);
        }

        const word = 'APPLE';
        beforeEach(async () => {
            render(<Wordle word={word} key={1} />);

            for (const letter of word.split('')) {
                await clickLetter(letter);
            }
            
            
            await clickLetter('ENT');
        });
        
        test('should show a victory sign when you guess correct', async () => {
            expect(await screen.findAllByText('You won!')).toBeTruthy();
        });

        test('should show the word with the correct styling in the grid', async () => {
            const squares = await screen.findAllByRole('letter');
            for (const [index, letter] of word.split('').entries()) {
                expect(squares.at(index)?.className).toBe('letter correct');
                expect(squares.at(index)?.innerHTML).toBe(letter);
            }
        });
    });

});