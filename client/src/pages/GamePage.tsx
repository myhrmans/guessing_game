import { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { startNewGame, makeGuess, getGame } from '../functions/gameUtils';
import { UserAuth } from '../contexts/UserContext';
import GameControls from '../components/GameControls';
import Cookies from 'js-cookie';

const GamePage = () => {
    const [numberInput, setNumberInput] = useState<string>('');
    const [result, setResult] = useState<string | null>(null);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [gameId, setGameId] = useState<string | null>(null);
    const { user, logout, token } = UserAuth();

    useEffect(() => {
        const activeGameId = Cookies.get('activeGame');
        if (activeGameId) {
            setGameId(activeGameId);
            getGame(token, gameId, setRandomNumber)
        }
    }, [gameId]);

    const handleClear = () => {
        setNumberInput('');
        setResult(null);
    };

    const handleStartNewGame = async () => {
        startNewGame(token, setGameId, setRandomNumber, setResult, setNumberInput);
    };

    const handleGuess = async () => {
        makeGuess(token, gameId, numberInput, setRandomNumber, setResult);
    };

    //For cheating :)
    console.log('randomNumber: ', randomNumber);

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
                    Welcome {user?.email}
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
                    <GameControls
                        numberInput={numberInput}
                        setNumberInput={setNumberInput}
                        handleGuess={handleGuess}
                        handleClear={handleClear}
                    />
                )}
                {!randomNumber && (
                    <Button onClick={handleStartNewGame} variant="contained" sx={{ marginTop: '1rem' }}>
                        Start a new game
                    </Button>
                )}
                <Button onClick={logout}>Logout</Button>
            </Paper>
        </Box>
    );
};

export default GamePage;
