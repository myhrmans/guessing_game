import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/UserContext';

const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { signUp } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signUp(email, password);
    };

    return (
        <Box
            component="form"
            noValidate
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
                    Register
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
                <Button type="submit">Register</Button>
                <p>
                    Already registered?{' '}
                    <button
                        onClick={() => {
                            navigate('/signin');
                        }}
                    >
                        Sign Up
                    </button>
                </p>
            </Paper>
        </Box>
    );
};

export default SignUp;
