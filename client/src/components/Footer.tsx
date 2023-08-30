import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IFooter {}
const Footer: FC<IFooter> = (props) => {
    return (
        <Box>
            <Typography
                sx={{
                    position: 'fixed',
                    left: 10,
                    bottom: 0,
                    textAlign: 'center',
                    padding: '10px 0',
                    color: 'rgba(212,226,235, 0.8)',
                }}
            >
                Image by{' '}
                <a style={{color: 'rgba(212,226,235, 0.8)'}} href="https://www.freepik.com/free-vector/gradient-numerology-background_36304235.htm#query=background%20math&position=26&from_view=search&track=ais">
                    Freepik
                </a>
            </Typography>
        </Box>
    );
};

export default Footer;
