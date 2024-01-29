import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import final from './svg pics/final.svg';
import { database } from './firebaseConfig';
import {sendPasswordResetEmail} from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import ButtonWidget from './widgets/button';

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
  IconButton, Container,
  CircularProgress,  Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import { 
  AccountCircle, 
  Visibility,
  VisibilityOff,
  BlockRounded,
} from '@mui/icons-material';
import TextFieldInputWidget from './widgets/textfield-input';

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
  boxShadow: '0 10px 8px rgba(0, 0, 0, 0.04), 0 4px 3px rgba(0, 0, 0, 0.1)',
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
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
    
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
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    //Login Auth
    signInWithEmailAndPassword(database, username, password).then(data =>{
      setLoading(true);
      console.log(data, "authData");
      navigate('/dashboard');
    }).catch(error =>{
      setShowPrompt(true);
    });

    //SignIn Auth
    /*createUserWithEmailAndPassword(database, username, password).then(data =>{
      console.log(data, "authData");
    });


    if(username == "admin" && password == "123456"){
        navigate('/dashboard');
    }else{
        setShowPrompt(true);
    }*/
  }

  const handleForgotPasswordClick = () => {
    setEditDialogOpen(true);
  };

  const [afterSendEmail, setAfterSendEmail] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEditDialogClose = () => {setEditDialogOpen(false);};

  const handleResetPassword = async () => {
      sendPasswordResetEmail(database, email).then(data => {
        setSuccessMessage('Password reset email sent. Check your inbox.');
        setAfterSendEmail(true);
      }).catch (error => {
      setErrorMessage(error.message);
    });
  };

  return(
        <>
          <Container style={containerStyle}>
            <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '500px'}}>
              <CardContent sx={{ width: '85%' }}>
                <div className='text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}>
                  <img src={final} alt="" style={{width: '500px', height: '200px'}} />
                </div>

                <form onSubmit={(e)=> handleSubmit(e)}>
                  <FormControl fullWidth>

                          {/*USERNAME*/}
                          <p className="mb-3 text-s" style={{color: colors.fontColor}}>Username *</p>
                          <TextField
                          name="username" 
                          id="username"
                          variant="outlined"
                          required
                          sx={{
                              height: '40px', mb: 3, width: '100%', 
                              '& .MuiOutlinedInput-root': {
                                height: '40px',
                                fontFamily: 'Poppins, sans-serif',
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
                          <p className="mb-3 text-s" style={{color: colors.fontColor}}>Password *</p>
                          <TextField
                          name="password" 
                          id="password" 
                          type={showPassword ? 'text' : 'password'}
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
                                  {showPassword ? <VisibilityOff sx={{color: 'gray'}}/> : <Visibility sx={{color: 'gray'}}/>}
                                  </IconButton>
                              </InputAdornment>
                              ),
                          }}
                              sx={{
                                height: '40px',
                              width: '100%',
                              '& .MuiOutlinedInput-root': {
                                height: '40px',
                                fontFamily: 'Poppins, sans-serif',
                                '& fieldset': {
                                    border: '2px solid lightgray',
                                },
                                '&.Mui-focused fieldset': {
                                    border: '3px solid gray',
                                },
                                },
                          }}/>
                  </FormControl>

                  {showPrompt && (
                        <div className="prompt">
                          <p>Incorrect username or password.</p>
                        </div>
                      )}

                  {/*LOG IN BUTTON*/}
                  <Button 
                  variant="contained"
                  type="submit" 
                  sx={{
                    textTransform: 'none',
                    width: '100%',
                    height: '50px', 
                    marginTop: 5, 
                    marginBottom: 1, 
                    padding: 2, 
                    fontFamily: 'Poppins, sans-serif',
                    backgroundColor: colors.primary,
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                    '&:hover': { backgroundColor: '#3b3b5a' }
                    }}>
                      <Typography sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '500', fontSize: '20px',}}> {loading ? <CircularProgress size={23} color="inherit" /> : "Log In"} </Typography>
                  </Button>

                  <Typography 
                      variant='body1'
                      onClick={handleForgotPasswordClick}
                      sx={{
                        marginTop: '15px', 
                        fontFamily: 'Poppins, sans-serif', 
                        cursor: 'pointer',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                      >Forgot Password?</Typography>
                  
                  
                  {/*REALTIME DISPLAY OF DATE & TIME*/}
                  <div className='mt-3 text-center text-sm' style={{color: colors.fontColor}}>
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
          </Container>


          <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
              <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Forgot Password</DialogTitle>
              <DialogContent sx={{width: '500px'}}>
                  <TextFieldInputWidget 
                      title={"Email:"} 
                      type={"email"}
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                  />
                  {successMessage && <p>{successMessage}</p>}
                  {errorMessage && <p>{errorMessage}</p>}
                  <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                      <ButtonWidget onClick={handleEditDialogClose} label={"Close"} />
                      <ButtonWidget onClick={handleResetPassword} label={"Reset Password"} disabled={afterSendEmail}/>
                  </DialogActions>
                  </DialogContent>
          </Dialog>
        </>
      );

}