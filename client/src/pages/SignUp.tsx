import { useState } from 'react';
import { Box, Typography, TextField, Button, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserAuth } from '../contexts/UserContext';
import GameBox from '../components/GameBox';

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signUp } = UserAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signUp(email, password);
    };

    const paperSx = {
        alignItems: 'stretch',
    };

    return (
        <GameBox paperSx={paperSx} boxComponent={'form'} handleSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
                Register
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
                Sign up
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <Typography variant="caption">
                    Already registered? <Link to={'/signin'}>Sign In</Link>
                </Typography>
            </Box>
        </GameBox>
    );
};

export default SignUp;
