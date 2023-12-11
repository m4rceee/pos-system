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
    Card,
    CardContent,
    Box,
    IconButton,
} from '@mui/material';

import { 
    ShoppingBagRounded ,
    AttachMoneyRounded,
    SellRounded,
    AutoGraphRounded,
    ProductionQuantityLimitsRounded,
    WarningAmberRounded,
} from '@mui/icons-material';


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
                    <Grid container >
                        <Grid xs={12} sx={{ marginTop: '15px', marginBottom: '27px' }}>
                            <Header />
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant='h3' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: '#F5F5DC' }}>
                                Welcome to Dashboard
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: '#F5F5DC' }}>
                                <p className='pr-3'>{formatDate(currentDateTime)}</p>
                                <p>{formatTime(currentDateTime)}</p>
                            </Typography>
                        </Grid>

                        <Grid className='pt-8' container spacing={2}>
                            <Grid item xs={4}>
                                <Card style={{ background: 'linear-gradient(to bottom left, #F5F5DC, #D8D8BF)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                        <IconButton
                                            style={{
                                            backgroundColor: '#1F2937',
                                            borderRadius: '50%',
                                            color: 'white',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                            }}
                                        >
                                            <ShoppingBagRounded sx={{ fontSize: '2.5rem' }} />
                                        </IconButton>
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                        <p>Items</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ background: 'linear-gradient(to bottom left, #F5F5DC, #D8D8BF)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <IconButton
                                                    style={{
                                                    backgroundColor: '#1F2937',
                                                    borderRadius: '50%',
                                                    color: 'white',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                >
                                                    <AttachMoneyRounded sx={{ fontSize: '2.5rem' }} />
                                                </IconButton>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                                <p>Today's Sales</p>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ background: 'linear-gradient(to bottom left, #F5F5DC, #D8D8BF)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <IconButton
                                                    style={{
                                                    backgroundColor: '#1F2937',
                                                    borderRadius: '50%',
                                                    color: 'white',
                                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                    }}
                                                >
                                                    <AutoGraphRounded sx={{ fontSize: '2.5rem' }} />
                                                </IconButton>
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                                <p>Total Sales</p>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-3' container spacing={2}>
                            <Grid item xs={6}>
                                <Card style={{ background: '#FFD699', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center', paddingRight: '10px' }}>
                                            <ProductionQuantityLimitsRounded sx={{ fontSize: '2.5rem' }} />
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                        <p>Low Stock Items</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card style={{ background: '#FFCCCC', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center', paddingRight: '10px' }}>
                                                    <WarningAmberRounded sx={{ fontSize: '2.5rem' }} />
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '5px' }}>
                                                <p>Expiring/Expired Items</p>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                
            </div>  
        </>
    );
}