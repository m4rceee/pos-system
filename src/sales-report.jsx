import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/sidebar';
import Header from './common/header';
import { styled } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { firestore } from './firebaseConfig';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { InputAdornment, TextField, Grid, Container, Typography, Stack, Card, CardContent, Breadcrumbs, Link,} from '@mui/material';
import { where, limit, query, orderBy, addDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';
import {NavigateNextRounded,} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts/BarChart';

import { SearchRounded } from '@mui/icons-material';

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

  const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];


export default function SalesReport() {

    const navigate = useNavigate();

    const handleReportsHomePage = (event) => {
        event.preventDefault();
        console.info('You clicked a Reports Home Page.');
        navigate('/reports-home');
    }
    
    const handleSalesHomePage = (event) => {
        event.preventDefault();
        console.info('You clicked a Sales Home Page.');
        navigate('/sales-report');
    }

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

    const [transactions, setTransactions] = useState([]);
    const [totalPriceSum, setTotalPriceSum] = useState(0);
    const [totalMonthlySales, setTotalMonthlySales] = useState(0);

  useEffect(() => {
    const getTransactionData = onSnapshot(collection(firestore, 'Transactions'), (snapshot) => {
      const transactionArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Assuming dateTransaction is a string
      transactionArray.sort((a, b) => new Date(b.dateTransaction) - new Date(a.dateTransaction));

      setTransactions(transactionArray);
      setLoading(false); // Set loading to false when data is loaded

      // Calculate the sum of itemPrice for the current day
      const targetDate = new Date(); // You can replace this with the specific date you're interested in
      targetDate.setDate(1); // Set the day to the first day of the month
      const isSameMonth = (date1, date2) => date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();

      const totalPriceSum = transactionArray
    .filter((transaction) => isSameMonth(new Date(transaction.dateTransaction), targetDate))
    .reduce((sum, transaction) => {
        // Assuming itemPrice is a number
        return sum + parseFloat(transaction.productBreakdown.reduce((itemSum, item) => itemSum + parseFloat(item.itemPrice * item.itemQuantity), 0));
    }, 0);

        setTotalMonthlySales(totalPriceSum);
    });

    return () => getTransactionData();
  }, []);



    return(
        <>
            <div style={{ display: 'flex', marginLeft: '5rem' }}>
                <SideBar />
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
                                <Grid item xs={4}>
                                        <Breadcrumbs
                                            separator={<NavigateNextRounded fontSize="medium" sx={{ color: colors.secondary }} />}
                                            aria-label="breadcrumb"
                                        >
                                            <Link 
                                                underline="hover" 
                                                key="1" 
                                                onClick={handleReportsHomePage}
                                                sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary, cursor: 'pointer' }}
                                                >
                                                Reports
                                            </Link>,
                                            <Link
                                                underline="hover"
                                                key="2"
                                                onClick={handleSalesHomePage}
                                                sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary, cursor: 'pointer' }}
                                                >
                                                Products
                                            </Link>
                                        </Breadcrumbs>
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
                        <Grid container spacing={2} style={{ marginTop: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        
                            <Grid item xs={12}>
                                <ThemeProvider theme={customTheme}> 
                                    <Card style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px', height: 'auto'}}>
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                <Stack>
                                                    <Typography sx={{ marginTop: '15px', paddingBottom: '10px', color: colors.secondary, fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Monthly Sales Report</Typography>
                                                            <BarChart
                                                            width={600}
                                                            height={300}
                                                            series={[
                                                                { data: [totalMonthlySales], label: 'Generated Sales', id: 'pvId', color: colors.accentOlive },
                                                            ]}
                                                            xAxis={[{ data: xLabels, scaleType: 'band' }]}
                                                            />
                                                </Stack>
                                        </CardContent>
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