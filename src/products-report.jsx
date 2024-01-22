import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/sidebar';
import Header from './common/header';
import { styled } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

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
    fabClasses,
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

export default function ProductReport() {

    const navigate = useNavigate();

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


    /////////////////////////// REMOVE THIS IF CONNECTING NA SA DATABASE ///////////////////////////////////////////
    const staticRows = [
        {id: 1, productId: 1, productName: 'Product 1', productSold: 10, productIncome: 999.00},
        {id: 2, productId: 2, productName: 'Product 2', productSold: 15, productIncome: 999.00},
        // Add more static data as needed
    ];

    const columns = [
        { field: 'productId', headerName: 'Product ID', width: 200 },
        { field: 'productName', headerName: 'Product Name', width: 350 },
        { field: 'productSold', headerName: 'Sold', width: 200 },
        { field: 'productIncome', headerName: 'Income', width: 200 },
        
    ];

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
                                        Please review the product report below.
                                    </Typography>
                                </div>
                                <Grid container spacing={2} style={{ paddingTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={12}>
                                        <div style={{ height: 'auto', width: '100%' }}>
                                            <DataGrid
                                                rows={staticRows}
                                                columns={columns}
                                                initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 10 },
                                                },
                                                }}
                                                pageSizeOptions={[10, 50, 100]}
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
                                                        }
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
            </div>
        </>
    );
}