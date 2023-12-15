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
    { field: 'categoryCode', headerName: 'Category Code', width: 200 },
    { field: 'categoryName', headerName: 'Category Name', width: 350 },
    { 
        field: 'categoryActions', 
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
    { id: '0001', categoryName: 'Snacks', categoryCode: '' },
    { id: '0002', categoryName: 'Beverages', categoryCode: '' },
    { id: '0003', categoryName: 'School and Office Supplies', categoryCode: '' },
    { id: '0004', categoryName: 'Laundry Supplies', categoryCode: '' },
    { id: '0005', categoryName: 'Personal Care', categoryCode: '' },
    { id: '0006', categoryName: 'Frozen Goods', categoryCode: '' },
    { id: '0007', categoryName: 'Rice and Grains', categoryCode: '' },
    { id: '0008', categoryName: 'Canned Goods', categoryCode: '' },
  ];

  rows.forEach(row => {
    if (row.categoryName) {
      row.categoryCode = row.categoryName.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 1000).toString();
    }
  });

export default function CategoryHome() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const navigate = useNavigate();

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

    const printCategories = () => {
        window.print();
    }

    return(
        <>
            <div style={{display:'flex'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid xs={4} sx={{ alignItems: 'center' }}>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                        Categories
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
                                        onClick={printCategories}
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
                                    
                                    {/*Dialog*/}
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
        </>
    );

}