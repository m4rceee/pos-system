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
import ButtonWidget from '../widgets/button';

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
            <Stack direction="row" justifyContent={"right"} spacing={2} >
                <IconButton onClick={handleLogout}>
                    <LogoutRounded  style={{ color: colors.secondary, fontSize: '2rem'}} />
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
                    <ButtonWidget onClick={() => handleClose(false)} label={"No"}/>
                    <ButtonWidget onClick={() => handleClose(true)} label={"Yes"}/>
                </DialogActions>
            </Dialog>
        </>
        
    );
}
