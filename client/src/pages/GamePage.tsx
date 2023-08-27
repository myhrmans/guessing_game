import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAccessToken } from '../auth/useAccessToken';
import { startNewGame, makeGuess } from '../functions/gameUtils';

interface IGamePage {
    userName?: string;
}

const GamePage: React.FC<IGamePage> = ({ userName }) => {
    const [numberInput, setNumberInput] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);

    const accessToken = useAccessToken();

    const handleClear = () => {
        setNumberInput('');
        setResult(null);
    };

    const handleStartNewGame = async () => {
        startNewGame(accessToken, setGameId, setRandomNumber, setResult, setNumberInput);
    };

    const handleGuess = async () => {
        makeGuess(accessToken, gameId, numberInput, setRandomNumber, setResult);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: 500,
                    height: 300,
                    padding: '1rem',
                    background: 'rgba(212,226,235, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                    Welcome {userName}
                </Typography>
                <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
                    Guess the number
                </Typography>
                {result && (
                    <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                        {result}
                    </Typography>
                )}
                {randomNumber && (
                    <>
                        <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                            Random Number: {randomNumber}
                        </Typography>
                        <TextField
                            value={numberInput}
                            onChange={(e) => setNumberInput(e.target.value)}
                            sx={{ backgroundColor: 'white', marginBottom: '1rem' }}
                        />
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleGuess} variant="contained">
                                Guess
                            </Button>
                            <Button onClick={handleClear} variant="contained" color="secondary">
                                Clear
                            </Button>
                        </Stack>
                    </>
                )}
                {!randomNumber && (
                    <Button onClick={handleStartNewGame} variant="contained" sx={{ marginTop: '1rem' }}>
                        Start a new game
                    </Button>
                )}
            </Paper>
        </Box>
    );
};

export default GamePage;
