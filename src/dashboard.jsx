import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import { 
    Grid, 
    Container, 
    Typography,
    Stack,
    Card,
    CardContent,
} from '@mui/material';

import { 
    ShoppingBagRounded,
    ProductionQuantityLimitsRounded,
    WarningAmberRounded,
    ReceiptRounded,
    TodayRounded,
    DateRangeRounded,
    CalendarMonthRounded,
} from '@mui/icons-material';

const customTheme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
    palette: {
        text: {
          primary: '#1D1D2C',
        },
    },
  });

const uData = [5, 8, 10, 5, 16];
const pData = [3, 25, 2, 1, 10];
const vData = [6, 5, 0, 6, 8];
const xLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
];

const data = [
    { id: 0, value: 44, label: 'Item 1', color: '#E40C2B' },
    { id: 1, value: 41, label: 'Item 2', color: '#3CBCC3' },
    { id: 2, value: 25, label: 'Item 3', color: '#EBA63F' },
  ];

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

export default function DashboardHome() {

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

    // Concatenate the parts in the desired order
    return `${weekday} ${day} ${month} ${year}`;
  };
    
  const formatTime = (date) => {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleTimeString(undefined, options);
  };

    return(
    
        <>
            <div style={{ display: 'flex', justifyContent:'space-evenly' }}>
                <SideBar/>
                <div>
                <Container maxWidth="xl" style={{ paddingTop: '20px' }}>
                    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Grid xs={4} sx={{ alignItems: 'center' }}>
                                <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                    Dashboard
                                </Typography>
                                <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, fontWeight: 'light' }}>
                                    <Stack direction="row">
                                        <p className='pr-3'>{formatDate(currentDateTime)}</p>
                                        <p className='pr-3'>||</p>
                                        <p>{formatTime(currentDateTime)}</p>
                                    </Stack>
                                </Typography>
                            </Grid>
                            <Grid xs={8} sx={{ alignItems: 'center' }}>
                                <Header />
                            </Grid>
                    </Grid>

                        <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                            <CardContent style={{ padding: '20px', alignItems: 'stretch'}}>
                                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                Overview
                                </Typography>
                                <Grid container spacing={2} style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={3} >
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <ShoppingBagRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography  style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Products
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentBlue} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    247
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <ReceiptRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Transactions
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    83
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <ProductionQuantityLimitsRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Low in Stock
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentYellow} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    15
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <WarningAmberRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Expiring/Expired
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentRed} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    23
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} style={{ marginTop: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={6} >
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <TodayRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography  style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Daily Sales
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    3,734.<span style={{fontSize: '2rem'}}>27</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <DateRangeRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Weekly Sales
                                                    </Typography>
                                                    <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                    26,139.<span style={{fontSize: '2rem'}}>88</span>
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Grid className='pt-5' container spacing={2}>
                            <Grid item xs={7}>
                                <ThemeProvider theme={customTheme}> 
                                    <Card style={{marginBottom: '30px'}}>
                                        <CardContent style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1.5rem' }}>
                                            <Stack>
                                                <Typography sx={{ paddingLeft: '30px', paddingBottom: '30px', color: colors.primary, fontSize: '1.5rem', fontWeight: '700', textAlign: 'left' }}>Sales Chart</Typography>
                                                <BarChart
                                                    width={600}
                                                    height={300}
                                                    series={[
                                                    { data: pData, label: 'Product1', id: 'pvId', stack: 'total', color: '#E40C2B' },
                                                    { data: uData, label: 'Product2', id: 'uvId', stack: 'total', color: '#3CBCC3' },
                                                    { data: vData, label: 'Product3', id: 'vvId', stack: 'total', color: '#EBA63F' },
                                                    ]}
                                                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                                />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </ThemeProvider>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <ThemeProvider theme={customTheme}>
                                    <Card style={{ backgroundColor: colors.secondary }}>
                                            <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', height: '100%', padding: '1.5rem' }}>
                                                <Typography style={{ paddingBottom: '30px', color: colors.primary, fontSize: '1.5rem', fontWeight: '700', textAlign: 'left' }}>Top Products</Typography>
                                                <PieChart
                                                    series={[
                                                        {
                                                        data,
                                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                                        faded: { innerRadius: 30, additionalRadius: -30 },
                                                        },
                                                    ]}
                                                    height={300}
                                                />
                                            </Stack>
                                    </Card>
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                </Container>
                </div>
                
            </div>  
        </>
    );
}