import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
    AccountCircleRounded,
    MenuRounded,
    SearchRounded,
    LogoutRounded,
} from "@mui/icons-material";

import { 
    TextField,
    InputAdornment,
    Stack,
    Button,
    Popper,
    MenuItem,
    MenuList,
    Paper,
    ClickAwayListener,
    Grow,
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
        navigate('/');
        handleClose();
    };

    return(

        <>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded sx={{color: colors.secondary}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: `2px solid ${colors.secondary}`,
                            },
                            '&.Mui-focused fieldset': {
                                border: `4px solid ${colors.secondary}`,
                            },
                        },
                        '& input': {
                            color: colors.secondary,
                        },
                    }}
                    />
                    <AccountCircleRounded style={{ cursor: 'pointer', color: colors.secondary, fontSize: '2rem' }} />
                    <Button>
                        <LogoutRounded onClick={handleLogout} style={{ color: colors.secondary, fontSize: '2rem' }} />
                    </Button>
                </Stack>
        </>
        
    );
}
