import { FC } from 'react';
import { TextField, Stack, Button, Box, alpha } from '@mui/material';

interface IGameControls {
    numberInput: string;
    setNumberInput: (value: React.SetStateAction<string>) => void;
    handleGuess: () => Promise<void>;
    handleClear: () => void;
}

const GameControls: FC<IGameControls> = ({ numberInput, setNumberInput, handleGuess, handleClear }) => {
    return (
        <>
            <TextField
                fullWidth
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                sx={{ backgroundColor: alpha('#fff', 0.5) }}
            />
            <Box sx={{ width: '100%', marginTop: 3 }}>
                <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleGuess} variant="contained" sx={{ width: '50%' }}>
                        Guess
                    </Button>
                    <Button
                        onClick={handleClear}
                        variant="contained"
                        sx={{ width: '50%', backgroundColor: alpha('#007bff', 0.7) }}
                    >
                        Clear
                    </Button>
                </Stack>
            </Box>
        </>
    );
};

export default GameControls;
