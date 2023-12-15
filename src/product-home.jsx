import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import {
    AddRounded,
    EditRounded,
    DeleteRounded,
    PrintRounded,
} from "@mui/icons-material";

import { 
    Stack,
    Button,
    Grid, 
    Container, 
    Typography,
    IconButton,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Card,
    CardContent,
} from '@mui/material';

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'itemCode', headerName: 'Item Code', width: 100 },
    { field: 'itemName', headerName: 'Item Name', width: 300 },
    { field: 'itemCategory', headerName: 'Category', width: 250 },
    { field: 'itemQuantity', headerName: 'Quantity', width: 75 },
    { field: 'itemPrice', headerName: 'Price', width: 75 },
    { 
        field: 'itemActions', 
        headerName: 'Actions',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        renderCell: (params) => (
            <div>
                <IconButton>
                    <EditRounded sx={{color: '#3CBCC3'}}/>
                </IconButton>
                <IconButton>
                    <DeleteRounded sx={{color: '#E40C2B'}}/>
                </IconButton>
            </div>
            
                
        ),
    },
    
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

  rows.forEach((row, index) => {
    if (row.itemName) {
      row.itemCode = row.itemName.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 1000).toString();
    }
    row.id = String(index + 1).padStart(4, '0');;
  });

export default function ProductHome() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
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
    
    const printProducts = () => {
        window.print();
    }

    return(
        <>
            <div style={{display: 'flex'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px', overflowX: 'auto' }}>
                    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid xs={4} sx={{ alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                            Products
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
                        <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px' }}>
                            <CardContent style={{ padding: '20px'}}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                            Please use the table below to navigate or filter the results.
                                        </Typography>
                                    </div>
                                    <div sx={{ textAlign: 'center', marginTop: '16px' }}>
                                        <IconButton 
                                            onClick={printProducts}
                                            sx={{
                                                backgroundColor: '#13131c',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                '&:hover': {
                                                    backgroundColor: colors.secondary,
                                                },
                                                marginRight: '5px',
                                            }}>
                                            <PrintRounded
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
                                        <IconButton 
                                            onClick={handleClickOpen}
                                            sx={{
                                                backgroundColor: '#13131c',
                                                borderRadius: '8px',
                                                padding: '8px',
                                                '&:hover': {
                                                    backgroundColor: colors.secondary,
                                                },
                                            }}>
                                            <AddRounded
                                                onClick={handleClickOpen}
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
                                        <Dialog open={open} onClose={handleClose} >
                                            <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Add Category</DialogTitle>
                                            <DialogContent sx={{width: '500px'}}>
                                                <DialogContentText sx={{fontFamily: 'Poppins, sans-serif'}}>
                                                Please enter a category name:
                                                </DialogContentText>
                                                <TextField
                                                    margin="dense"
                                                    id="categoryName"
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        width: '100%',
                                                        '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            border: '1px solid #1F2937',
                                                        },
                                                            '&.Mui-focused fieldset': {
                                                            border: '2px solid #1F2937',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </DialogContent>
                                        <DialogActions sx={{marginRight: '15px', marginBottom: '10px'}}>
                                            <Button 
                                                onClick={handleClose} 
                                                sx={{
                                                    textTransform: 'none',
                                                    color: colors.secondary,
                                                    backgroundColor: '#27273b',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover': {
                                                        backgroundColor: 'none',
                                                        color: colors.fontColor,
                                                    },
                                                }}>
                                                Cancel
                                            </Button>
                                            <Button 
                                                onClick={handleClose} 
                                                sx={{
                                                    textTransform: 'none',
                                                    color: colors.secondary,
                                                    backgroundColor: '#27273b',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover': {
                                                        backgroundColor: 'none',
                                                        color: colors.fontColor,
                                                    },
                                                }}>
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    </div>
                                </div>
                                <Grid className='mt-5' container>
                                    <Grid xs={12}>
                                        <div style={{ height: 'auto', width: '100%' }}>
                                            <DataGrid
                                                rows={rows}
                                                columns={columns}
                                                initialState={{
                                                    pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                    },
                                                }}
                                                pageSizeOptions={[5, 10]}
                                                checkboxSelection
                                                sx={{
                                                    fontFamily: 'Poppins, sans-serif',
                                                    color: colors.fontColor,
                                                    backgroundColor: colors.secondary,
                                                    '& .MuiDataGrid-columnHeaders': {
                                                    backgroundColor: colors.primary,
                                                    color: colors.secondary,
                                                    '& .css-i4bv87-MuiSvgIcon-root': {
                                                        color: colors.secondary,
                                                    },
                                                    '& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
                                                        color: colors.secondary,
                                                    },
                                                    },
                                                    '& .MuiDataGrid-row': {
                                                    '& .css-i4bv87-MuiSvgIcon-root': {
                                                        color: colors.primary,
                                                    },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                </Container>
            </div>
        </>
    );
}