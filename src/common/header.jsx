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
                            <SearchRounded sx={{color: '#1F2937'}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#1F2937',
                                borderWidth: '2px'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#1F2937',
                            },
                        },
                        '& input': {
                            color: '#1F2937',
                        },
                    }}
                    />
                    <AccountCircleRounded style={{ cursor: 'pointer', color: '#1F2937', fontSize: '2rem' }} />
                    <Button>
                        <LogoutRounded onClick={handleLogout} style={{ color: '#1F2937', fontSize: '2rem' }} />
                    </Button>
                </Stack>
        </>
        
    );
}
