import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { 
    AccountCircleRounded,
    MenuRounded,
    SearchRounded 
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

    const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    navigate('/');
    handleClose();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
                    <Button
                        ref={anchorRef}
                        id="composition-button"
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                        <MenuRounded style={{ cursor: 'pointer', color: '#1F2937', fontSize: '2rem' }} />
                    </Button>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        >
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}

                                >
                                    <MenuItem onClick={handleClose} sx={{fontFamily: 'Poppins, sans-serif'}}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose} sx={{fontFamily: 'Poppins, sans-serif'}}>My account</MenuItem>
                                    <MenuItem onClick={handleLogout} sx={{fontFamily: 'Poppins, sans-serif'}}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Stack>
        </>
        
    );
}
