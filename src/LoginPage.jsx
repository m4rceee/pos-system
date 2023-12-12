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
  backgroundColor: '#1F2937',
  borderRadius: '20px',
  padding: '35px',
  width: '35%',
  dropShadow: '0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1)',
};

export default function Login() {

  const navigate = useNavigate();

  //const [formData, setFormData] = useState({});

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
                        <p className="mb-3 text-xl" style={{color:'#F5F5F5'}}>Username *</p>
                        <TextField
                        name="username" 
                        id="username"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <AccountCircle sx={{color: '#F5F5F5'}}/>
                            </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3, width: '100%',
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#FFFFFF',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F5F5F5',
                            },
                            },
                            '& .MuiInputLabel-root': {
                            color: '',
                            '&.Mui-focused': {
                                color: '#F5F5F5',
                            },
                            },
                        }}
                        />

                        {/*PASSWORD*/}
                        <p className="mb-3 text-xl" style={{color:'#F5F5F5'}}>Password *</p>
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
                                {showPassword ? <VisibilityOff sx={{color: '#F5F5F5'}}/> : <Visibility sx={{color: '#F5F5F5'}}/>}
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                            sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#FFFFFF',
                              },
                                '&.Mui-focused fieldset': {
                                borderColor: '#F5F5F5',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '',
                                '&.Mui-focused': {
                                color: '#F5F5F5',
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
                  backgroundColor: '#849E87',
                  '&:hover': { backgroundColor: '#5C725A' }
                  }}>
                    <Typography sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '500'}}>Log In</Typography>
                </Button>
                
                {/*REALTIME DISPLAY OF DATE & TIME*/}
                <div className='mt-3 text-center' style={{color:'#F5F5F5'}}>
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