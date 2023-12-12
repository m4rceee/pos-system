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
} from '@mui/icons-material';

const customTheme = createTheme({
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
    palette: {
        text: {
          primary: '#181818',
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
    { id: 0, value: 44, label: 'Item 1' },
    { id: 1, value: 41, label: 'Item 2' },
    { id: 2, value: 25, label: 'Item 3' },
  ];

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
                            <Typography variant='h2' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: '#181818' }}>
                                Welcome to Dashboard
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: '#181818' }}>
                                <Stack direction="row">
                                    <p className='pr-3'>{formatDate(currentDateTime)}</p>
                                    <p>{formatTime(currentDateTime)}</p>
                                </Stack>
                            </Typography>
                        </Grid>

                        <Grid className='pt-8' container spacing={2}>
                            <Grid item xs={4}>
                                <Card style={{ background: '#1F2937', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent 
                                        style={{ 
                                            display: 'flex',   
                                            flexDirection: 'column',
                                            justifyContent: 'center', 
                                            alignItems: 'center',
                                        }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <ShoppingBagRounded sx={{ fontSize: '4rem', color: '#75839B' }} />
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '5px', color: '#F5F5F5' }}>
                                            <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '3rem', fontWeight: '600', color: '#6CA573' }}>
                                                    215
                                            </p>
                                            <p>Products</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ background: '#1F2937', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <AttachMoneyRounded sx={{ fontSize: '4rem', color: '#75839B' }} />
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '5px', color: '#F5F5F5' }}>
                                                <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '3rem', fontWeight: '600', color: '#6CA573' }}>
                                                    5,615.00
                                                </p>
                                                <p>Today's Sales</p>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={4}>
                                <Card style={{ background: '#1F2937', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <AutoGraphRounded sx={{ fontSize: '4rem', color: '#75839B' }} />
                                            </div>
                                            <div style={{ textAlign: 'center', marginTop: '5px', color: '#F5F5F5' }}>
                                                <p style={{ textAlign: 'center', marginTop: '5px', fontSize: '3rem', fontWeight: '600', color: '#6CA573' }}>
                                                    26,820.00
                                                </p>
                                                <p>Total Sales</p>
                                            </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-3 ' container spacing={2}>
                            <Grid item xs={6}>
                                <Card style={{ background: '#1F2937', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center', paddingRight: '15px' }}>
                                            <ProductionQuantityLimitsRounded sx={{ textAlign: 'center', paddingLeft: '25px', fontSize: '6rem', color: '#75839B' }} />
                                        </div>
                                        <Stack sx={{paddingRight: '100px'}}>
                                                <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '3rem', fontWeight: '600', color: '#FFA833' }}>
                                                    <p>15</p>
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: '5px', color: '#F5F5F5' }}>
                                                    <p>Low Stock Items</p>
                                                </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <Card style={{ background: '#1F2937', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                    <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '15px' }}>
                                                    <WarningAmberRounded sx={{ textAlign: 'center', paddingLeft: '25px', fontSize: '6rem', color: '#75839B' }} />
                                            </div>
                                            <Stack sx={{paddingRight: '100px'}}>
                                                <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '3rem', fontWeight: '600', color: '#FF8888' }}>
                                                    <p>10</p>
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: '5px', color: '#F5F5F5' }}>
                                                    <p>Expiring/Expired Items</p>
                                                </div>
                                            </Stack>
                                            
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        <Grid className='pt-10' container spacing={2}>
                            <Grid item xs={7}>
                                <ThemeProvider theme={customTheme}> 
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <Typography sx={{ color: '#181818', fontSize: '1.5rem', fontWeight: '700' }}>Sales Chart</Typography>
                                            <BarChart
                                                width={600}
                                                height={400}
                                                series={[
                                                    { data: pData, label: 'Item 1', id: 'pvId', stack: 'total'},
                                                    { data: uData, label: 'Item 2', id: 'uvId', stack: 'total'},
                                                    { data: vData, label: 'Item 3', id: 'vvId', stack: 'total'},
                                                ]}
                                                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                                
                                            />
                                    </div>
                                </ThemeProvider>
                            </Grid>
                            
                            <Grid item xs={5}>
                                <ThemeProvider theme={customTheme}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <Typography sx={{ color: '#181818', fontSize: '1.5rem', fontWeight: '700' }}>Top Products</Typography>
                                        <PieChart
                                            series={[
                                                {
                                                data,
                                                highlightScope: { faded: 'global', highlighted: 'item' },
                                                faded: { innerRadius: 30, additionalRadius: -30 },
                                                },
                                            ]}
                                            height={250}
                                        />
                                    </div>
                                </ThemeProvider>
                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
                
            </div>  
        </>
    );
}