
import axios from 'axios';

export async function startNewGame(
    accessToken: string | undefined,
    setGameId: React.Dispatch<React.SetStateAction<string | null>>,
    setRandomNumber: React.Dispatch<React.SetStateAction<number | null>>,
    setResult: React.Dispatch<React.SetStateAction<string | null>>,
    setNumberInput: React.Dispatch<React.SetStateAction<string>>
) {
    try {
        const response = await axios.post('/start-game', null, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        setGameId(response.data.gameId);
        setRandomNumber(response.data.randomNumber);
        setResult(null);
        setNumberInput('');
    } catch (error) {
        console.error(error);
    }
}

export async function makeGuess(
    accessToken: string | undefined,
    gameId: string | null,
    numberInput: string,
    setRandomNumber: React.Dispatch<React.SetStateAction<number | null>>,
    setResult: React.Dispatch<React.SetStateAction<string | null>>
) {
    try {
        const response = await axios.post(
            '/make-guess',
            {
                gameId: gameId,
                guess: parseInt(numberInput),
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (response.data.correct) {
            setResult('Congratulations! You guessed the correct number.');
            setRandomNumber(null); // Set random number to null to ask for a new game

            await axios.post(
                '/delete-game',
                {
                    gameId: gameId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
        } else if (response.data.guessIsSmaller) {
            setResult('Try again. Your guess is smaller than the secret number.');
        } else {
            setResult('Try again. Your guess is larger than the secret number.');
        }
    } catch (error) {
        console.error(error);
    }
}
