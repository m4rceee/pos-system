import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
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
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        setOpen(true);
    };

    const handleClose = (confirmed) => {
        setOpen(false);
    
        if (confirmed) {
            signOut(database).then(val=>{
                navigate('/');
            })
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
                <Dialog open={open} onClose={() => handleClose(false)}>
                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Confirm Log Out</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{fontFamily: 'Poppins, sans-serif'}}>
                                Are you sure you want to logout?
                            </DialogContentText>
                        </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)} color="primary" sx={{fontFamily: 'Poppins, sans-serif'}}>
                            No
                        </Button>
                        <Button onClick={() => handleClose(true)} color="primary" sx={{fontFamily: 'Poppins, sans-serif'}}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
        </>
        
    );
}
