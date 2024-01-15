import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { styled } from '@mui/system';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';

import { 
    Container,
    Grid,
    Typography,
    Stack,
    Card,
    CardContent,
    CardActions,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    InputAdornment,
    TextField,
    CardActionArea,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import { ColorizeSharp, SearchRounded } from '@mui/icons-material';

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


export default function PosPage() {

    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const [tableItems, setTableItems] = useState([]);

    const handleItemClick = (item) => {
        const existingItemIndex = tableItems.findIndex((tableItem) => tableItem.itemName === item.itemName);

        if (existingItemIndex !== -1) {
            const updatedItems = [...tableItems];
            updatedItems[existingItemIndex].itemQuantity += 1;
            setTableItems(updatedItems);
        } else {
            const newItem = { ...item, itemQuantity: 1 };
            setTableItems([...tableItems, newItem]);
        }

        setSelectedItem(item);
    };

    // Assuming you have a function to calculate the total amount from the tableItems
    const calculateTotalAmount = () => {
        return tableItems.reduce((total, item) => total + (item.itemQuantity * item.itemPrice), 0);
    };
    
    // Inside your component
    const totalAmount = calculateTotalAmount();

    const StyledTableCell = styled(TableCell)({
        fontFamily: 'Poppins, sans-serif',
        color: colors.secondary,
      });

    const [value, setValue] = React.useState('All');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    const categories = ['All', 
                        'Snacks', 
                        'Beverages', 
                        'School and Office Supplies',
                        'Laundry Supplies',
                        'Personal Care',
                        'Frozen Goods',
                        'Rice and Grains',
                        'Canned Goods'
                    ];
    
    const rows = [
        { id: '', itemCode: '', itemName: 'Chicharrón (Pork Cracklings)', itemCategory: 'Snacks', itemQuantity: '10', itemPrice: '50.00'},
        { id: '', itemCode: '', itemName: 'Banana Chips', itemCategory: 'Snacks', itemQuantity: '8', itemPrice: '30.00 '},
        { id: '', itemCode: '', itemName: 'Polvoron (Powdered Milk Candy)', itemCategory: 'Snacks', itemQuantity: '15', itemPrice: '20.00 '},
        { id: '', itemCode: '', itemName: 'Buko Juice (Coconut Water)', itemCategory: 'Beverages', itemQuantity: '12', itemPrice: '25.00 '},
        { id: '', itemCode: '', itemName: 'Pad Paper', itemCategory: 'School and Office Supplies', itemQuantity: '20', itemPrice: '15.00 '},
        { id: '', itemCode: '', itemName: 'Jansport Backpack', itemCategory: 'School and Office Supplies', itemQuantity: '5', itemPrice: '800.00 '},
        { id: '', itemCode: '', itemName: 'Zonrox (Bleach)', itemCategory: 'Laundry Supplies', itemQuantity: '6', itemPrice: '40.00 '},
        { id: '', itemCode: '', itemName: 'Tide Detergent', itemCategory: 'Laundry Supplies', itemQuantity: '4', itemPrice: '50.00 '},
        { id: '', itemCode: '', itemName: 'Safeguard Soap', itemCategory: 'Personal Care', itemQuantity: '12', itemPrice: '25.00 '},
        { id: '', itemCode: '', itemName: 'Colgate Toothpaste', itemCategory: 'Personal Care', itemQuantity: '10', itemPrice: '30.00 '},
        { id: '', itemCode: '', itemName: 'Magnolia Ice Cream', itemCategory: 'Frozen Goods', itemQuantity: '5', itemPrice: '150.00 '},
        { id: '', itemCode: '', itemName: 'Tender Juicy Hotdog', itemCategory: 'Frozen Goods', itemQuantity: '2', itemPrice: '70.00 '},
        { id: '', itemCode: '', itemName: 'Jasmin Rice', itemCategory: 'Rice and Grains', itemQuantity: '15', itemPrice: '40.00/kg'},
        { id: '', itemCode: '', itemName: 'Sinandomeng Rice', itemCategory: 'Rice and Grains', itemQuantity: '10', itemPrice: '35.00/kg'},
        { id: '', itemCode: '', itemName: 'Century Tuna', itemCategory: 'Canned Goods', itemQuantity: '8', itemPrice: '45.00'},
        { id: '', itemCode: '', itemName: 'Del Monte Fruit Cocktail', itemCategory: 'Canned Goods', itemQuantity: '6', itemPrice: '60.00'},
];

    const handleCancelBill = () => {
        const isConfirmed = window.confirm("Are you sure you want to cancel the bill?");

        if (isConfirmed) {
            navigate('/pos');
            window.location.reload();
        }
    }

    return(
        <div style={{display: 'flex', marginLeft: '5rem' }}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                Point-of-Sales
                            </Typography>
                            <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, fontWeight: 'light' }}>
                                <Stack direction="row">
                                    <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                                        {formatDate(currentDateTime)}
                                    </Typography>
                                    <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif', marginLeft: '8px', marginRight: '8px'}}>
                                        ||
                                    </Typography>
                                    <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                                        {formatTime(currentDateTime)}
                                    </Typography>
                                </Stack>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Header />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1.5} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '20px', display: 'flex', flexDirection: 'row'}}>
                                    <Box sx={{ overflowX: 'auto', width: '100%', typography: 'body1' }}>
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto', position: 'sticky', top: 0, zIndex: 500, backgroundColor: '#13131c', boxShadow: '0 8px 16px rgba(169, 169, 169, 0.6)' }}>
                                                <TabList
                                                    variant='scrollable'
                                                    scrollButtons="auto"
                                                    onChange={handleChange}
                                                    aria-label="lab API tabs example"
                                                    sx={{ 
                                                        borderBottom: 1, 
                                                        borderColor: 'divider',
                                                        '& .MuiTab-root': {
                                                            fontFamily: 'Poppins, sans-serif',
                                                            fontSize: '16px',
                                                            fontWeight: 'bold',
                                                            color: colors.secondary,
                                                        },
                                                        '& .MuiTabs-scrollButtons': {
                                                            color: colors.secondary,
                                                        },
                                                    }}
                                                >
                                                    {categories.map((category) => (
                                                        <Tab key={category} label={category} value={category} />
                                                    ))}
                                                </TabList>
                                            </Box>
                                            {categories.map((category) => (
                                                <TabPanel key={category} value={category}>
                                                    <Grid container spacing={2}>
                                                        {rows
                                                        .filter((item) => category === 'All' || item.itemCategory === category)
                                                        .map((item) => (
                                                            <Grid item key={item.id} xs={12} sm={6}>
                                                            <CardActionArea onClick={() => handleItemClick(item)}>
                                                                <Card style={{background: '#13131c', color: colors.secondary}}>
                                                                    <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                                                                        <div style={{display: 'flex', flexDirection: 'column', marginTop: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                                                            <Typography variant="body1" component="div" sx={{ fontSize: '25px', fontWeight: '700', fontFamily: 'Poppins, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.itemName}>
                                                                                {item.itemName}
                                                                            </Typography>
                                                                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '18px', color: 'gray', fontFamily: 'Poppins, sans-serif'}} title={item.itemName}>
                                                                                Price: ₱{item.itemPrice}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className="quantity" style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                                                            <Typography 
                                                                                variant="body2"
                                                                                sx={{
                                                                                color: item.itemQuantity <= 10 ? colors.accentOrange : colors.secondary,
                                                                                fontWeight: item.itemQuantity <= 10 ? '700' : 'normal',
                                                                                fontFamily: 'Poppins, sans-serif'
                                                                            }} title={item.itemName}>
                                                                                Qty: {item.itemQuantity}
                                                                            </Typography>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            </CardActionArea>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </TabPanel>
                                            ))}
                                        </TabContext>
                                    </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '20px'}}>
                                <CardContent style={{ padding: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <Typography variant='h6' sx={{marginTop: '10px', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textAlign: 'center', color: colors.secondary}}>
                                        Bill Total
                                    </Typography>
                                    <Typography variant='body2' sx={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', color: colors.secondary}}>
                                        Melyson Enterprise
                                    </Typography>
                                    <div style={{ flex: 1 }}>
                                            <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Description</StyledTableCell>
                                                            <StyledTableCell align="right">Quantity</StyledTableCell>
                                                            <StyledTableCell align="right">Price</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableItems.map((tableItem, index) => (
                                                            <TableRow key={index}>
                                                                <StyledTableCell>{tableItem.itemName}</StyledTableCell>
                                                                <StyledTableCell align="right">{tableItem.itemQuantity}</StyledTableCell>
                                                                <StyledTableCell align="right">{tableItem.itemPrice}</StyledTableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <div>
                                            <div style={{ margin: '15px', display: 'flex',  justifyContent: 'space-between'}}>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    Discount: 
                                                </Typography>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    ₱ 0.00 
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', width: '100%'}}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handleCancelBill()}
                                                    sx={{
                                                    backgroundColor: colors.accentRed,
                                                    borderTopLeftRadius: '0px',
                                                    borderTopRightRadius: '0px',
                                                    borderBottomLeftRadius: '0px', 
                                                    borderBottomRightRadius: '0px',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover':  {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                                                      }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handlePay(totalAmount)}
                                                    sx={{
                                                    padding: '10px',
                                                    borderTopLeftRadius: '0px',
                                                    borderTopRightRadius: '0px',
                                                    borderBottomLeftRadius: '0px', 
                                                    borderBottomRightRadius: '0px',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover':  {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                                                      }
                                                    }}
                                                >
                                                    Discount
                                                </Button>
                                            </div>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => handlePay(totalAmount)}
                                                sx={{
                                                backgroundColor: colors.accentOlive,
                                                borderTopLeftRadius: '0px',
                                                borderTopRightRadius: '0px',
                                                borderBottomLeftRadius: '8px', 
                                                borderBottomRightRadius: '8px',
                                                padding: '10px',
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '25px'
                                                }}
                                            >
                                                Pay: ₱{totalAmount.toFixed(2)}
                                            </Button>
                                        </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
        </div>
    );
}