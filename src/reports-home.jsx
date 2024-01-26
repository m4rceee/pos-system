import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';

import { 
    Stack,
    Grid, 
    Container, 
    Typography,
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    IconButton
} from '@mui/material';

import { 
    LaunchRounded,
} from '@mui/icons-material';

const colors = {
    primary: '#1D1D2C',
    secondary: '#F7F4E9',
    accentRed: '#E40C2B',
    accentBlue: '#3CBCC3',
    accentYellow: '#EBA63F',
    accentGreen: '#438945',
    fontColor: '#181818',
    accentPurple: '#7E22A7',
    accentCyan: '#2FCED1',  
    accentOrange: '#F68D2E',
    accentTeal: '#349C9E',  
    accentOlive: '#A4B82F', 
    accentPink: '#E84B8A', 
  };

export default function ReportHome() {

    const navigate = useNavigate();

    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    
    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

    const formatDate = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleTimeString(undefined, options).replace(/,/g, '');
        const [weekday, month, day, year] = formattedDate.split(' ');
        return `${weekday} ${day} ${month} ${year}`;
    };
        
    const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return date.toLocaleTimeString(undefined, options);
    };

    const handleProductsPage = () => {
        navigate('/products');
    }

    const handleTransactionsPage = () => {
        navigate('/transactions-home');
    }

    const handleSalesPage = () => {
        navigate('/sales-report');
    }

    
    return(
        <>
            <div style={{display: 'flex', marginLeft: '5rem'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px', overflowX: 'auto' }}>
                    <Grid container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                            Reports
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, fontWeight: 'light' }}>
                                <Stack direction="row">
                                    <Typography component="span" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                                        {formatDate(currentDateTime)}
                                    </Typography>
                                    <Typography component="span" variant='body2' sx={{fontFamily: 'Poppins, sans-serif', marginLeft: '8px', marginRight: '8px'}}>
                                        ||
                                    </Typography>
                                    <Typography component="span" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                                        {formatTime(currentDateTime)}
                                    </Typography>
                                </Stack>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Header />
                        </Grid>
                    </Grid>
                    <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: 'auto'}}>
                            <CardContent style={{ padding: '20px'}}>
                                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                    Please choose a section to see its reports:
                                </Typography>
                                <Grid container spacing={2} style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    
                                    
                                <Grid item xs={4}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: 'auto' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{width: '100%'}}>
                                                    <Typography variant="h4" sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary}}>
                                                        Sales
                                                    </Typography>
                                                </div>
                                                <div style={{marginTop: '35px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                                    <div>
                                                        <IconButton
                                                        onClick={handleSalesPage}
                                                            sx={{
                                                                background: 'transparent',
                                                            }}
                                                        >
                                                            <LaunchRounded sx={{ fontSize: '2rem', color: '#515178' }} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: 'auto' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{width: '100%'}}>
                                                    <Typography variant="h4" sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary}}>
                                                        Transactions
                                                    </Typography>
                                                </div>
                                                <div style={{marginTop: '35px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                                    <div>
                                                        <IconButton
                                                            onClick={handleTransactionsPage}
                                                            sx={{
                                                                background: 'transparent',
                                                            }}
                                                        >
                                                            <LaunchRounded sx={{ fontSize: '2rem', color: '#515178' }} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: 'auto' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <div style={{width: '100%'}}>
                                                    <Typography variant="h4" sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary}}>
                                                        Products
                                                    </Typography>
                                                </div>
                                                <div style={{marginTop: '35px', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                                                    <div>
                                                        <IconButton
                                                            onClick={handleProductsPage}
                                                            sx={{
                                                                background: 'transparent',
                                                            }}
                                                        >
                                                            <LaunchRounded sx={{ fontSize: '2rem', color: '#515178' }} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                    </Card>
                </Container>
            </div>
        </>
    );
}