import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { firestore } from './firebaseConfig';
import { where, limit, query, orderBy, addDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';
import { format, isSameDay, parseISO } from 'date-fns';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

import { 
    Grid, 
    Container, 
    Typography,
    Stack,
    Card,
    CardContent,
    CardActionArea,
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

import { ClipLoader } from 'react-spinners';
import HeaderTitleWidget from './widgets/header-title';

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

  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 2400, 1398, 9800, 3908, 4800];
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

    const handleProducts = () => {navigate('/product-home');}
    const handleTransactions = () => {navigate('/transactions-home');}

    const currentDate = new Date();
    const monthOptions = { month: 'long' };

    const currentMonthName = currentDate.toLocaleString('en-US', monthOptions);

    // Get current year
    const currentYear = currentDate.getFullYear();

    const navigate = useNavigate();

   const [currentDateTime, setCurrentDateTime] = useState(new Date());
   const [productCount, setProductCount] = useState(0);
   const [transactionCount, setTransactionCount] = useState(0);
   const [lowInStockCount, setLowInStockCount] = useState(0);
   const [loading, setLoading] = useState(true);
   const [productChartData, setProductChartData] = useState([]);
    
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
    const fetchData = async () => {
        try {
            // Product Count
            const productQuerySnapshot = await getDocs(collection(firestore, 'Products'));
            setProductCount(productQuerySnapshot.size);

            // Transaction Count
            const transactionQuerySnapshot = await getDocs(collection(firestore, 'Transactions'));
            setTransactionCount(transactionQuerySnapshot.size);

            // Low In Stock Count
            const lowInStockQuerySnapshot = await getDocs(collection(firestore, 'Products'));
            const lowInStockItems = lowInStockQuerySnapshot.docs.filter(doc => doc.data().itemQuantity <= 10);
            setLowInStockCount(lowInStockItems.length);

            // All data fetched, set loading to false
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
            setLoading(false);
        }
    };

    fetchData();
}, []);

useEffect(() => {
    const fetchData = async () => {
        try {
            // Fetch data from the products collection
            const productsSnapshot = await getDocs(collection(firestore, 'Products'));
            const productsData = productsSnapshot.docs.map(doc => doc.data());

            console.log('Fetched products data:', productsData);

            const getRandomColor = () => {
                const colorKeys = Object.keys(colors);
                const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
                return colors[randomColorKey];
            };
            
            // Prepare data for the charts
            const productChartData = productsData.map(product => ({
                value: product.unitsSold || 0,
                label: product.itemName,
                color: getRandomColor(), // Function to generate random color
            }));

            setProductChartData(productChartData);

            // Other data fetching and loading handling...
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error if needed
            setLoading(false);
        }
    };

    fetchData();
}, []);


const [transactions, setTransactions] = useState([]);
const [totalPriceSum, setTotalPriceSum] = useState(0);

useEffect(() => {
    const getTransactionData = onSnapshot(collection(firestore, 'Transactions'), (snapshot) => {
      const transactionArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      transactionArray.sort((a, b) => new Date(b.dateTransaction) - new Date(a.dateTransaction));

      setTransactions(transactionArray);
      setLoading(false); 

      const targetDate = new Date();

      const totalPriceSum = transactionArray
        .filter((transaction) => isSameDay(new Date(transaction.dateTransaction), targetDate))
        .reduce((sum, transaction) => {
          return sum + parseFloat(transaction.productBreakdown.reduce((itemSum, item) => itemSum + parseFloat(item.itemPrice * item.itemQuantity), 0));
        }, 0);
        
      setTotalPriceSum(totalPriceSum);
    });

    return () => getTransactionData();
  }, []);



  const [totalMonthlySales, setTotalMonthlySales] = useState(0);

  useEffect(() => {
    const getTransactionData = onSnapshot(collection(firestore, 'Transactions'), (snapshot) => {
      const transactionArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      transactionArray.sort((a, b) => new Date(b.dateTransaction) - new Date(a.dateTransaction));

      setTransactions(transactionArray);
      setLoading(false);

      const targetDate = new Date();
      targetDate.setDate(1);
      const isSameMonth = (date1, date2) => date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();

      const totalPriceSum = transactionArray
        .filter((transaction) => isSameMonth(new Date(transaction.dateTransaction), targetDate))
        .reduce((sum, transaction) => {
            return sum + parseFloat(transaction.productBreakdown.reduce((itemSum, item) => itemSum + parseFloat(item.itemPrice * item.itemQuantity), 0));
        }, 0);

        setTotalMonthlySales(totalPriceSum);
    });

    return () => getTransactionData();
  }, []);


    return(
    
        <>
            <div style={{ display: 'flex', marginLeft: '5rem' }}>
                <SideBar/>
                <div style={{ marginLeft: '10px', marginRight: '5px', width: '100%'}}>
                    <Container maxWidth="xl" style={{ paddingTop: '20px' }}>
                        <HeaderTitleWidget label={"Dashboard"}/>

                        <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                            <CardContent style={{ padding: '20px'}}>
                                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                Overview
                                </Typography>
                                <Grid container spacing={2} style={{ paddingTop: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={4} >
                                        <CardActionArea onClick={handleProducts}>
                                            <Card style={{ background: '#13131c', boxShadow: '0 12p 24px rgba(0, 0, 0, 0.3)' }}>
                                                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <ShoppingBagRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                    <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                        <Typography  style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                        Products
                                                        </Typography>
                                                        {loading ? (
                                                            <ClipLoader color={colors.accentCyan} size={45} />
                                                        ) : (
                                                        <Typography variant="h3" color={colors.accentCyan} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                            {productCount}
                                                        </Typography>
                                                        )}
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        </CardActionArea>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CardActionArea onClick={handleTransactions}>
                                            <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <ReceiptRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                    <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                        <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                        Transactions
                                                        </Typography>
                                                        {loading ? (
                                                            <ClipLoader color={colors.accentOlive} size={45} />
                                                        ) : (
                                                        <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                            {transactionCount}
                                                        </Typography>
                                                        )}
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        </CardActionArea>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card style={{ background: '#13131c', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)' }}>
                                            <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <ProductionQuantityLimitsRounded sx={{ fontSize: '3.5rem', color: '#515178' }} />
                                                <Stack sx={{ paddingLeft: '15px', flex: 1 }}>
                                                    <Typography style={{ fontSize: '1rem', fontWeight: 'normal', color: colors.secondary, fontFamily: 'Poppins, sans-serif' }}>
                                                    Low in Stock
                                                    </Typography>
                                                    {loading ? (
                                                        <ClipLoader color={colors.accentYellow} size={45} />
                                                    ) : (
                                                        <Typography variant="h3" color={colors.accentYellow} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>
                                                        {lowInStockCount}
                                                        </Typography>
                                                    )}
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
                                                    Today's Sales
                                                    </Typography>
                                                    {loading ? (
                                                        <ClipLoader color={colors.accentYellow} size={45} />
                                                    ) : (
                                                        <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif', color: colors.secondary}}>
                                                            ₱{totalPriceSum.toFixed(2)}
                                                        </Typography>
                                                    )}
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
                                                    {currentMonthName + " " + currentYear} Sales
                                                    </Typography>
                                                    {loading ? (
                                                        <ClipLoader color={colors.accentYellow} size={45} />
                                                    ) : (
                                                        <Typography variant="h3" color={colors.accentOlive} style={{fontWeight: '600', fontFamily: 'Poppins, sans-serif', color: colors.secondary}}>
                                                            ₱{totalMonthlySales.toFixed(2)}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        <Grid container spacing={2} style={{ marginTop: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        
                            <Grid item xs={7}>
                                <ThemeProvider theme={customTheme}> 
                                    <Card style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px', height: 'auto'}}>
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                                <Stack>
                                                    <Typography sx={{ marginTop: '15px', paddingBottom: '10px', color: colors.secondary, fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Sales Chart</Typography>
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

                            <Grid item xs={5}>
                                <ThemeProvider theme={customTheme}>
                                    <Card style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px', height: 'auto'}}>
                                        <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                                <Typography style={{ marginLeft: '15px', marginTop: '15px', paddingBottom: '10px', color: colors.secondary, fontSize: '1.5rem', fontWeight: '600', textAlign: 'left' }}>Top Products</Typography>
                                                <PieChart
                                                    series={[
                                                        {
                                                        data: productChartData,
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