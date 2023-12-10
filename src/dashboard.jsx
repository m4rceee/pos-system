import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { 
    Grid, 
    Container, 
    Typography,
    Stack,
} from '@mui/material';


export default function DashboardHome() {

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

    return(
        <>
            <div style={{ display: 'flex' }}>
                <SideBar />

                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <Grid container>
                        <Grid xs={12} sx={{ marginTop: '15px', marginBottom: '45px' }}>
                            <Header />
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant='h3' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: '#D1D5DB' }}>
                                Welcome to Dashboard
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: '#D1D5DB' }}>
                                <p className='pr-3'>{formatDate(currentDateTime)}</p>
                                <p>{formatTime(currentDateTime)}</p>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>   
        </>
    );
}