import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { UserAuth } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(email, password);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
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
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    aria-label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    aria-label="Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button type="submit">Sign In</Button>
                <p>
                    Not registered yet?{' '}
                    <button
                        onClick={() => {
                            navigate('/signup');
                        }}
                    >
                        Sign Up
                    </button>
                </p>
            </Paper>
        </Box>
    );
};

export default SignIn;
