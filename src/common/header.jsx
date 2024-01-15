import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

import { 
    AccountCircleRounded,
    SearchRounded,
    LogoutRounded,
} from "@mui/icons-material";

import { 
    TextField,
    InputAdornment,
    Stack,
    Button,
    IconButton,
} from "@mui/material";

const colors = {
    primary: '#1D1D2C',
    secondary: '#F7F4E9',
    accentRed: '#E40C2B',
    accentBlue: '#3CBCC3',
    accentYellow: '#EBA63F',
    accentGreen: '#438945',
    fontColor: '#181818',
  };

export default function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {
        const isConfirmed = window.confirm("Are you sure you want to logout?");

        if (isConfirmed) {
            navigate('/');
        }
    };

    return(

        <>
                <Stack direction="row" spacing={2}>
                    <TextField
                    variant="outlined"
                    fullWidth
                    placeholder='Search here...'
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded sx={{fontSize: '2rem', color: colors.secondary}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#27273b',
                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                            '& fieldset': {
                                border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                                border: 'none',
                            },
                            '&:hover': {
                                cursor: 'text'
                            },
                        },
                        '& input': {
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '300',
                            color: colors.secondary,
                        },
                        '& input::placeholder': {
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: '300',
                        }
                    }}
                    />
                    <IconButton>
                        <AccountCircleRounded style={{ cursor: 'pointer', color: colors.secondary, fontSize: '2rem' }} />
                    </IconButton>
                    <IconButton onClick={handleLogout}>
                        <LogoutRounded  style={{ color: colors.secondary, fontSize: '2rem' }} />
                    </IconButton>
                </Stack>
        </>
        
    );
}
