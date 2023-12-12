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
    ShoppingBagRounded ,
    AttachMoneyRounded,
    AutoGraphRounded,
    ProductionQuantityLimitsRounded,
    WarningAmberRounded,
    ReceiptRounded,
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
            <div style={{ display: 'flex' }}>
                <SideBar/>
                <div>
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
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
                            
                    <Grid container>
                        <Grid className='pt-8' container spacing={2}>
                            <Grid item xs={7}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <ShoppingBagRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography variant="h5" style={{ fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Products Registered
                                            </Typography>
                                            <Typography variant="h3" color={colors.primary} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            247
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <ReceiptRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Today's Transactions
                                            </Typography>
                                            <Typography variant="h3" color={colors.primary} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            83
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-3' container spacing={2}>
                            <Grid item xs={7}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <ProductionQuantityLimitsRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography variant="h5" style={{ fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Low Stock Items
                                            </Typography>
                                            <Typography variant="h3" color={colors.accentYellow} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            15
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <AttachMoneyRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Today's Sales
                                            </Typography>
                                            <Typography variant="h3" color={colors.primary} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            5,845.64
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-3' container spacing={2}>
                            <Grid item xs={7}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <WarningAmberRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography variant="h5" style={{ fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Expiring/Expired Items
                                            </Typography>
                                            <Typography variant="h3" color={colors.accentRed} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            21
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5}>
                                <Card style={{ background: colors.secondary, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <AutoGraphRounded sx={{ fontSize: '6rem', color: '#75839B' }} />
                                        <Stack sx={{ paddingLeft: '15px', paddingRight: '100px', flex: 1 }}>
                                            <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.primary, fontFamily: 'Poppins, sans-serif' }}>
                                            Total Revenue
                                            </Typography>
                                            <Typography variant="h3" color={colors.primary} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                            25,910.55
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-10' container spacing={2}>
                            <Grid item xs={7}>
                                <ThemeProvider theme={customTheme}> 
                                    <Card style={{marginBottom: '30px'}}>
                                        <CardContent style={{ backgroundColor: colors.secondary, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1.5rem' }}>
                                            <Stack>
                                                <Typography sx={{ paddingLeft: '30px', paddingBottom: '15px', color: colors.primary, fontSize: '1.5rem', fontWeight: '700', textAlign: 'left' }}>Sales Chart</Typography>
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
                                                <Typography style={{ paddingBottom: '15px', color: colors.primary, fontSize: '1.5rem', fontWeight: '700', textAlign: 'left' }}>Top Products</Typography>
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

                    </Grid>
                </Container>
                </div>
                
            </div>  
        </>
    );
}