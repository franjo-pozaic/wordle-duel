export const getResult = (history: string[], word: string) => {
    if (history.length === 0) {
      return undefined;
    }
    const lastGuess = history[history.length - 1];
    
    if (lastGuess === word) {
      return 'WIN'
    } else if (history.length === 6) {
      return 'LOSS';
    } else {
      return undefined;
    }

  }