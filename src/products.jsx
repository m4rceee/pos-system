import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/sidebar';
import Header from './common/header';
import { styled } from '@mui/system';
import { firestore } from './firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

import { 
    Grid, 
    Container, 
    Typography,
    Stack,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Breadcrumbs,
    Link,
} from '@mui/material';

import {
    Inventory2Rounded,
    NavigateNextRounded,
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
  

export default function Products() {

    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState('');
    const [prevMonth, setPrevMonth] = useState('');
    const [productData, setProductData] = useState([]);
    const [prevMonthProductData, setPrevMonthProductData] = useState([]);

    const handleReportsHomePage = (event) => {
        event.preventDefault();
        console.info('You clicked a Reports Home Page.');
        navigate('/reports-home');
    }

    const handleProductsPage = (event) => {
        event.preventDefault();
        console.info('You clicked a Product Rankings Page.');
        navigate('/products');
    }

    const handleProductsReportPage = (event) => {
        event.preventDefault();
        console.info('You clicked a Product Report Page.');
        navigate('/products-report');
    }

    const StyledTableCell = (props) => (
        <TableCell
          sx={{
            fontFamily: 'Poppins, sans-serif',
            color: colors.secondary,
          }}
          {...props}
        />
      );

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

  useEffect(() => {
    const currentDate = new Date();

    const prevDate = new Date(currentDate);
    prevDate.setMonth(prevDate.getMonth() - 1);

    const monthOptions = { month: 'long', year: 'numeric' };
    const formattedCurrentMonth = currentDate.toLocaleDateString('en-US', monthOptions);
    const formattedPrevMonth = prevDate.toLocaleDateString('en-US', monthOptions);

    setCurrentMonth(formattedCurrentMonth);
    setPrevMonth(formattedPrevMonth);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch data from the products collection
            const productsSnapshot = await getDocs(collection(firestore, 'Products'));
            const products = productsSnapshot.docs.map(doc => doc.data());

            console.log('Fetched products:', products);

            // Count total units sold for each product
            const productSalesMap = new Map();

            products.forEach(product => {
                const { itemName, unitsSold } = product;

                productSalesMap.set(itemName, unitsSold || 0);
            });

            // Convert map to an array of objects for easier sorting
            const productsArray = Array.from(productSalesMap, ([itemName, totalUnitsSold]) => {
                return {
                    itemName,
                    totalUnitsSold
                };
            });

            // Sort products by total units sold in descending order
            productsArray.sort((a, b) => {
                return b.totalUnitsSold - a.totalUnitsSold; // Sort by total units sold
            });

            console.log('Products array after sorting:', productsArray);

            setProductData(productsArray);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    fetchData();
}, []);

useEffect(() => {
    const fetchDataForPreviousMonth = async () => {
        try {
            const currentDate = new Date();
            const prevDate = new Date(currentDate);
            prevDate.setMonth(prevDate.getMonth() - 1);

            // Fetch data from the transactions collection for the previous month
            const prevMonthTransactionsSnapshot = await getDocs(collection(firestore, 'Transactions'));
            const prevMonthTransactions = prevMonthTransactionsSnapshot.docs.map(doc => doc.data());

            // Filter transactions for the previous month
            const filteredPrevMonthTransactions = prevMonthTransactions.filter(transaction => {
                const dateTransaction = new Date(transaction.dateTransaction);
                return dateTransaction.getMonth() === prevDate.getMonth();
            });

            console.log('Fetched transactions for previous month:', filteredPrevMonthTransactions);

            // Count total units sold for each product for the previous month
            const productSalesMap = new Map();

            filteredPrevMonthTransactions.forEach(transaction => {
                transaction.productBreakdown.forEach(product => {
                    const { itemName, itemQuantity } = product;

                    const key = `${itemName}`;

                    if (productSalesMap.has(key)) {
                        // Increment the count for the existing product
                        productSalesMap.set(key, productSalesMap.get(key) + itemQuantity);
                    } else {
                        // Initialize the count for a new product
                        productSalesMap.set(key, itemQuantity);
                    }
                });
            });

            // Convert map to an array of objects for easier sorting
            const productsArray = Array.from(productSalesMap, ([key, totalUnitsSold]) => ({
                itemName: key,
                totalUnitsSold
            }));

            // Sort products by total units sold in descending order
            productsArray.sort((a, b) => b.totalUnitsSold - a.totalUnitsSold);

            console.log('Products array for previous month after sorting:', productsArray);

            setPrevMonthProductData(productsArray);
        } catch (error) {
            console.error('Error fetching data for previous month:', error.message);
        }
    };

    fetchDataForPreviousMonth();
}, []);

    return (
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
                                                onClick={handleProductsPage}
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
                            <Card className='mt-8' style={{backgroundColor: '#27273b', height: '82vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                                <CardContent style={{ padding: '20px'}}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                            Please review the top products below.
                                        </Typography>
                                        <div sx={{ textAlign: 'center', marginTop: '16px' }}>
                                            <IconButton
                                                onClick={handleProductsReportPage}    
                                                sx={{
                                                    backgroundColor: '#13131c',
                                                    borderRadius: '8px',
                                                    padding: '8px',
                                                    '&:hover': {
                                                        backgroundColor: colors.secondary,
                                                    },
                                                }}>
                                                <Inventory2Rounded
                                                    sx={{ 
                                                    color: colors.secondary, 
                                                    fontSize: '2rem', 
                                                    transition: 'transform 0.2s',
                                                    ':hover': {
                                                        color: colors.fontColor,
                                                    }
                                                }} 
                                                />
                                            </IconButton>
                                        </div>
                                    </div>

                                <Grid container spacing={2} style={{ paddingTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={6}>
                                        <Card style={{ padding: '10px', background: '#13131c', height: '68vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
                                            <CardContent>
                                                <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                                    This Month
                                                </Typography>
                                                <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary }}>
                                                    {currentMonth}
                                                </Typography>
                                                <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Rank</StyledTableCell>
                                                                <StyledTableCell>Product Name</StyledTableCell>
                                                                <StyledTableCell align="right">Units Sold</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {productData.map((product, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>
                                                                    <div style={{
                                                                        border: `2px solid ${index === 0 ? colors.accentYellow : colors.secondary}`,
                                                                        borderRadius: '50%',
                                                                        width: '30px',
                                                                        height: '30px',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        color: index === 0 ? colors.accentYellow : colors.secondary,
                                                                        backgroundColor: 'transparent'
                                                                    }}>
                                                                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>{index + 1}</span>
                                                                    </div>
                                                                    </TableCell>
                                                                    <StyledTableCell sx={{ color: index === 0 ? colors.accentYellow : colors.secondary, fontWeight: 'bold' }}>{product.itemName}</StyledTableCell>
                                                                    <StyledTableCell align="right">{product.totalUnitsSold}</StyledTableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card style={{ padding: '10px', background: '#13131c', height: '68vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
                                            <CardContent>
                                                <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                                    Past Month
                                                </Typography>
                                                <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary }}>
                                                    {prevMonth}
                                                </Typography>
                                                <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Rank</StyledTableCell>
                                                            <StyledTableCell>Product Name</StyledTableCell>
                                                            <StyledTableCell align="right">Units Sold</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {prevMonthProductData.length > 0 ? (
                                                            // Render rows if there is data for the previous month
                                                            prevMonthProductData.map((product, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>
                                                                        <div style={{
                                                                            border: `2px solid ${index === 0 ? colors.accentYellow : colors.secondary}`,
                                                                            borderRadius: '50%',
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            display: 'flex',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            color: index === 0 ? colors.accentYellow : colors.secondary,
                                                                            backgroundColor: 'transparent'
                                                                        }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>{index + 1}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell sx={{ color: index === 0 ? colors.accentYellow : colors.secondary, fontWeight: 'bold' }}>{product.itemName}</StyledTableCell>
                                                                    <StyledTableCell align="right">{product.totalUnitsSold}</StyledTableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            // Display a message if no data is available for the previous month
                                                            <TableRow>
                                                                <TableCell colSpan={3} style={{ textAlign: 'center', color: colors.secondary }}>
                                                                    No data available for the previous month
                                                                </TableCell>
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>
                                </CardContent>
                            </Card>
                    </Container>
                </div>
            </div>
        </>
    );
}