import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '../contexts/UserContext';

const GameBar = () => {
    const { user, logout } = UserAuth();
    const iconImage = '/logo.png';
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <img
                        src={iconImage}
                        alt="App Icon"
                        style={{
                            width: '40px',
                            height: '40px',
                            marginRight: '15px',
                        }}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Guessing Game
                    </Typography>
                    {user && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ marginRight: 2 }}>{user?.email}</Typography>
                            <FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                onClick={logout}
                                style={{
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }}
                            />
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default GameBar;

<link rel="icon" href="../../public/favicon.ico" />;
