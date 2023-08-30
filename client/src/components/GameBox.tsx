import { FC } from 'react';
import { Box, Paper } from '@mui/material';

interface IGameBox {
    paperSx: Record<string, any>;
    children: React.ReactNode;
    boxComponent?: React.ElementType<any> | undefined;
    handleSubmit?: (e: React.FormEvent) => void;
}
const GameBox: FC<IGameBox> = ({ children, paperSx, boxComponent, handleSubmit }) => {
    return (
        <Box
            component={boxComponent}
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: 360,
                    height: 300,
                    padding: '3rem 5rem',
                    background: 'rgba(212,226,235, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: 10,
                    ...paperSx,
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default GameBox;
