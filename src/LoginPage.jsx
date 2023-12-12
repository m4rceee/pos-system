import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css"
import 'typeface-poppins';
import {
  Card,
  CardContent,
  Typography,
  Button, 
  FormControl, 
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { 
  AccountCircle, 
  Visibility,
  VisibilityOff,
  BlockRounded,
} from '@mui/icons-material';

const containerStyle = {
  position: 'absolute',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 600,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F7F4E9',
  borderRadius: '20px',
  padding: '35px',
  width: '35%',
  dropShadow: '0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1)',
};

const colors = {
  primary: '#1D1D2C',
  secondary: '#F7F4E9',
  accentRed: '#E40C2B',
  accentBlue: '#3CBCC3',
  accentYellow: '#EBA63F',
  accentGreen: '#438945',
  fontColor: '#181818',
};

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
    
  useEffect(() => {
    const intervalId = setInterval(() => {
    setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 
    
  const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
    
  const formatTime = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = e.target.elements;
    
    const data = {
      username: formElements.username.value,
      password: formElements.password.value,
    };
    
    console.log('Form data submitted:', data);
    navigate('/dashboard');
  
  }

  return(
        <>
          <Card sx={{ minWidth: 275 }} style={containerStyle}>
    
            <CardContent sx={{ width: '100%' }}>
    
              {/*LOGO*/}
              <div className='text-center' style={{ marginBottom: '10%', color: 'lightgray' }}>
                <BlockRounded style={{ fontSize: 100 }}/>
                <p>No Logo Yet</p>
              </div>
    
              {/*FORM*/}
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
        
                        {/*USERNAME*/}
                        <p className="mb-3 text-xl" style={{color: colors.fontColor}}>Username *</p>
                        <TextField
                        name="username" 
                        id="username"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <AccountCircle sx={{color: 'gray'}}/>
                            </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3, width: '100%',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: '2px solid lightgray',
                            },
                            '&.Mui-focused fieldset': {
                                border: '3px solid gray',
                            },
                            },
                        }}
                        />

                        {/*PASSWORD*/}
                        <p className="mb-3 text-xl" style={{color: colors.fontColor}}>Password *</p>
                        <TextField
                        name="password" 
                        id="password" 
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff sx={{color: 'gray'}}/> : <Visibility sx={{color: 'gray'}}/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                            sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                  border: '2px solid lightgray',
                              },
                              '&.Mui-focused fieldset': {
                                  border: '3px solid gray',
                              },
                              },
                        }}/>
                </FormControl>

                {/*LOG IN BUTTON*/}
                <Button 
                variant="contained"
                type="submit" 
                sx={{
                  textTransform: 'none',
                  boxShadow: 'none',
                  width: '100%', 
                  marginTop: 5, 
                  marginBottom: 1, 
                  padding: 2, 
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: colors.accentYellow,
                  '&:hover': { backgroundColor: '#d19035' }
                  }}>
                    <Typography sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '500', fontSize: '20px',}}>Log In</Typography>
                </Button>
                
                {/*REALTIME DISPLAY OF DATE & TIME*/}
                <div className='mt-3 text-center' style={{color: colors.fontColor}}>
                  <div>
                    <strong>Date:</strong> {formatDate(currentDateTime)}
                  </div>
                  <div>
                    <strong>Time:</strong> {formatTime(currentDateTime)}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      );

}