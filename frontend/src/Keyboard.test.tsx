import { render, screen, } from '@testing-library/react'
import { Keyboard } from './Keyboard';
import { Letter } from './models';

const mockHandlerFunction = () => {};

describe('Keyboard component', () => {
    test('Displays the correct initial letters with correct style', async () => {
        render(<Keyboard 
            usedLetters={[]} 
            disable={false} 
            onDelete={mockHandlerFunction}
            onEnter={mockHandlerFunction}
            onKeyPress={mockHandlerFunction}/>
        );

        const letters = await screen.findAllByRole('keyboard-letter');

        letters.forEach(letter => expect(letter.className).toBe('keyboard-letter '));
     });

    const letter = 'Q';
    describe.each([
            ['correct letter', { char: letter, status: 'CORRECT' } as Letter, 'correct'],
            ['partial letter', { char: letter, status: 'PARTIAL' } as Letter, 'partial'],
            ['wrong letter', { char: letter, status: 'WRONG' } as Letter, 'wrong'],
        ]
    )('%s', (testCase, letterData, expectedCSSClass) => {
        beforeEach(async () => {
            render(<Keyboard
                disable={false} 
                usedLetters={[letterData]}
                onDelete={mockHandlerFunction}
                onEnter={mockHandlerFunction}
                onKeyPress={mockHandlerFunction}/>
            );
        });

        test(`${testCase} has the correct class`, async () => {
            const letters = await screen.findAllByRole('keyboard-letter');
            const usedLetter = await screen.findByText(letter);
    
            expect(usedLetter.className).toContain(expectedCSSClass);
            letters.filter(x => !x.innerHTML.includes(letter)).forEach(letter => expect(letter.className).toBe('keyboard-letter '));
        });
    });
});