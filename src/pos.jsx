import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar-pos';
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
    Paper
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
        { id: '', itemCode: '', itemName: 'Hotdog (for making Filipino-style Spaghetti)', itemCategory: 'Frozen Goods', itemQuantity: '2', itemPrice: '70.00 '},
        { id: '', itemCode: '', itemName: 'Jasmin Rice', itemCategory: 'Rice and Grains', itemQuantity: '15', itemPrice: '40.00/kg'},
        { id: '', itemCode: '', itemName: 'Sinandomeng Rice', itemCategory: 'Rice and Grains', itemQuantity: '10', itemPrice: '35.00/kg'},
        { id: '', itemCode: '', itemName: 'Century Tuna', itemCategory: 'Canned Goods', itemQuantity: '8', itemPrice: '45.00'},
        { id: '', itemCode: '', itemName: 'Del Monte Fruit Cocktail', itemCategory: 'Canned Goods', itemQuantity: '6', itemPrice: '60.00'},
];

    return(
        <div style={{display: 'flex'}}>
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

                    <Grid container spacing={2} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '20px', display: 'flex', flexDirection: 'row'}}>
                                <List sx={{ overflowY: 'auto', width: '150px', borderRight: '1px solid #333', backgroundColor: '#13131c'}}>
                                    {categories.map((category) => (
                                        <ListItem
                                            key={category}
                                            onClick={() => handleCategoryClick(category)}
                                            >
                                                <ListItemButton selected={selectedCategory === category}>
                                                    <ListItemText primary={category} primaryTypographyProps={{fontSize: '14px', fontFamily: 'Poppins, sans-serif', color: colors.secondary}}/>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                <CardContent style={{ padding: '20px', flex: 1, width: '100%', overflowY: 'auto' }}>
                                    <TextField
                                        name="username" 
                                        id="username"
                                        variant="outlined"
                                        placeholder='Search an item here...'
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchRounded sx={{fontSize: '1rem', color: colors.secondary}}/>
                                            </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            height: '40px', marginBottom: '20px', width: '100%', 
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#27273b',
                                                height: '40px',
                                                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
                                                '& fieldset': {
                                                    border: 'none',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    border: 'none',
                                                },
                                                '&:hover': {
                                                    cursor: 'text'
                                                },
                                            },
                                            '& input': {
                                                fontFamily: 'Poppins, sans-serif',
                                                fontWeight: '300',
                                                color: colors.secondary,
                                                fontSize: '15px',
                                            },
                                            '& input::placeholder': {
                                                fontFamily: 'Poppins, sans-serif',
                                                fontWeight: '300',
                                                fontSize: '15px',
                                                
                                            }
                                        }}
                                    />
                                    <Grid container spacing={1.5}>
                                        {rows
                                        .filter((item) => selectedCategory === 'All' || item.itemCategory === selectedCategory)
                                        .map((item) => (
                                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                                            <CardActionArea onClick={() => handleItemClick(item)}>
                                                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                                    <CardContent style={{ flex: 1, height: '100%', whiteSpace: 'nowrap' }}>
                                                        <Typography variant="body1" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.itemName}>
                                                            {item.itemName}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" title={item.itemName}>
                                                            Quantity: {item.itemQuantity}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" title={item.itemName}>
                                                            Price: {item.itemPrice}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </CardActionArea>
                                        </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '20px'}}>
                                <CardContent style={{ padding: '20px'}}>
                                    <Card style={{ backgroundColor: colors.secondary, borderRadius: '10px', height: '400px' }}>
                                        <CardContent style={{ padding: '15px' }}>
                                        </CardContent>
                                    </Card>
                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Typography variant='h4' style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, marginTop: '10px', width: '100%'}}>
                                            Total: 
                                        </Typography>
                                        <Typography variant='h4' style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, marginTop: '10px', width: '100%'}}>
                                            $0000.00
                                        </Typography>
                                    </div>
                                    
                                    <CardActions style={{marginTop: '10px'}}>
                                        <Button variant="contained" fullWidth style={{ padding: '20px', fontFamily: 'Poppins, sans-serif', backgroundColor: colors.accentRed, width: '100%'}}>
                                            Discount
                                        </Button>
                                        <Button variant="contained" fullWidth style={{ padding: '20px', fontFamily: 'Poppins, sans-serif', backgroundColor: colors.accentOlive, width: '100%'}}>
                                            Pay
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
        </div>
    );
}