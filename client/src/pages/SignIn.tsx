import { Box, Button, TextField, Typography, alpha } from '@mui/material';
import { useState } from 'react';
import { UserAuth } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import GameBox from '../components/GameBox';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn } = UserAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(email, password);
    };

    const paperSx = {
        alignItems: 'stretch',
    };

    return (
        <GameBox paperSx={paperSx} boxComponent={'form'} handleSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                aria-label="Email"
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
                sx={{ marginY: 1, backgroundColor: alpha('#fff', 0.5) }}
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                aria-label="Password"
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
                sx={{ marginY: 1, backgroundColor: alpha('#fff', 0.5) }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 3 }}>
                Sign In
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <Typography variant="caption">
                    Not registered yet? <Link to={'/signup'}>Sign Up</Link>
                </Typography>
            </Box>
        </GameBox>
    );
};

export default SignIn;
