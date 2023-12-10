import React, { useState, useEffect } from 'react';
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
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '35px',
  width: '35%',
  dropShadow: '0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1)',
};

export default function Login() {

  const [formData, setFormData] = useState({});

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
  }

  return(
        <>
          <Card sx={{ minWidth: 275 }} style={containerStyle}>
    
            <CardContent sx={{ width: '100%' }}>
    
              {/*LOGO*/}
              <div className='text-center text-gray-700' style={{ marginBottom: '10%' }}>
                <BlockRounded style={{ fontSize: 100 }}/>
                <p>No Logo Yet</p>
              </div>
    
              {/*FORM*/}
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
        
                        {/*USERNAME*/}
                        <p className="mb-3 text-gray-700 text-xl">Username</p>
                        <TextField
                        name="username" 
                        id="username" 
                        label={
                            <Typography variant="body" sx={{fontFamily: 'Poppins, sans-serif'}}>
                            Required
                            </Typography>
                        } 
                        variant="outlined"
                        required 
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <AccountCircle />
                            </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3, width: '100%',
                            '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#374151',
                            },
                            },
                            '& .MuiInputLabel-root': {
                            color: '',
                            '&.Mui-focused': {
                                color: '#374151',
                            },
                            },
                        }}
                        />

                        {/*PASSWORD*/}
                        <p className="mb-3 text-gray-700 text-xl">Password</p>
                        <TextField
                        name="password" 
                        id="password" 
                        type={showPassword ? 'text' : 'password'}
                        label={
                            <Typography variant="body" sx={{fontFamily: 'Poppins, sans-serif'}}>
                            Required
                            </Typography>
                        }  
                        variant="outlined"
                        required 
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                            sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                borderColor: '#374151',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '',
                                '&.Mui-focused': {
                                color: '#374151',
                                },
                            },
                        }}/>
                </FormControl>

                {/*LOG IN BUTTON*/}
                <Button 
                variant="contained"
                type="submit" 
                sx={{
                  width: '100%', 
                  marginTop: 5, 
                  marginBottom: 1, 
                  padding: 2, 
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: '#374151',
                  '&:hover': { backgroundColor: '#222933' }
                  }}>
                    Log In
                </Button>
                
                {/*REALTIME DISPLAY OF DATE & TIME*/}
                <div className='mt-3 text-center text-gray-700'>
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