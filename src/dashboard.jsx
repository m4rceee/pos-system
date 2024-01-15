import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

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
          primary: '#F7F4E9',
        },
    },
  });

  const uData = [5000, 8000, 10000, 5000, 16000];
  const pData = [3000, 25000, 2000, 1000, 10000];
  const vData = [6000, 5000, 0, 6000, 8000];
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
    { id: 3, value: 15, label: 'Item 4', color: '#438945' },
    { id: 4, value: 5, label: 'Item 5', color: '#7E22A7' },
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
            <div style={{ display: 'flex', marginLeft: '5rem' }}>
                <SideBar/>
                <div style={{ marginLeft: '10px', marginRight: '5px', width: '100%'}}>
                    <Container maxWidth="xl" style={{ paddingTop: '20px' }}>
                        <Grid 
                            container
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Grid item xs={4} sx={{ alignItems: 'center' }}>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                        Dashboard
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

                        <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                            <CardContent style={{ padding: '20px'}}>
                                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                Overview
                                </Typography>
                                <Grid container spacing={2} style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={3} >
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
                                    <Card style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px'}}>
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1.5rem' }}>
                                            <Stack>
                                                <Typography sx={{ paddingBottom: '10px', color: colors.secondary, fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Sales Chart</Typography>
                                                <LineChart
                                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                                    series={[
                                                        { data: pData, label: 'Year 1', color: '#E40C2B' },
                                                        { data: uData, label: 'Year 2', color: '#3CBCC3' },
                                                        { data: vData, label: 'Year 3', color: '#EBA63F' },
                                                    ]}
                                                    width={500}
                                                    height={300}
                                                />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </ThemeProvider>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <ThemeProvider theme={customTheme}>
                                    <Card style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px'}}>
                                            <Stack style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', height: '100%', padding: '1.5rem' }}>
                                                <Typography style={{ paddingBottom: '10px', color: colors.secondary, fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Top Products</Typography>
                                                <PieChart
                                                    series={[
                                                        {
                                                        data: data,
                                                        innerRadius: 50,
                                                        outerRadius: 100,
                                                        paddingAngle: 5,
                                                        cornerRadius: 5,
                                                        startAngle: -90,
                                                        endAngle: 180,
                                                        cx: 120,
                                                        cy: 140,
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