import {render, screen, } from '@testing-library/react'
import { Letter } from './Letter'

describe('Letter component', () => {
    test('Displays the correct letter', async () => {
        render(<Letter char='A' status='CORRECT' key={1} />);
  
        expect(screen.getByText('A')).toBeTruthy();
      });

      test('sets the correct "CORRECT" class', async () => {
        render(<Letter char='A' status='CORRECT' key={1} />);
        const letterElement = screen.getByText('A'); 
        expect(letterElement.className).toContain('correct');
      });

      test('sets the correct "PARTIAL" class', async () => {
        render(<Letter char='A' status='PARTIAL' key={1} />);
        const letterElement = screen.getByText('A'); 
        expect(letterElement.className).toContain('partial');
      });

      test('sets the correct "WRONG" class', async () => {
        render(<Letter char='A' status='WRONG' key={1} />);
        const letterElement = screen.getByText('A'); 
        expect(letterElement.className).toContain('wrong');
      });
      
      test('sets the correct "INITIAL" class', async () => {
        render(<Letter char='A' status='INITIAL' key={1} />);
        const letterElement = screen.getByText('A'); 
        expect(letterElement.className).toContain('letter');
        expect(letterElement.className).not.toContain('correct');
        expect(letterElement.className).not.toContain('partial');
        expect(letterElement.className).not.toContain('wrong');
      });
});
