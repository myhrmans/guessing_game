import { FC } from 'react';
import { TextField, Stack, Button } from '@mui/material';

interface IGameControls {
    numberInput: string,
    setNumberInput: (value: React.SetStateAction<string>) => void,
    handleGuess: () => Promise<void>,
    handleClear: () => void

}

const GameControls: FC<IGameControls> = ({numberInput, setNumberInput, handleGuess, handleClear}) => {
    return (
        <>
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
    );
};

export default GameControls;
