import * as React from 'react';
import { useState } from 'react';

import "../styles.css";
import 'typeface-poppins';
import SideBar from '../common/sidebar';
import Header from '../common/header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import {
    AddRounded,
    EditRounded,
    DeleteRounded,
} from "@mui/icons-material";

import { 
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
} from '@mui/material';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'categoryName', headerName: 'Category Name', width: 350 },
    { field: 'categoryCode', headerName: 'Category Code', width: 350 },
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
                    <EditRounded />
                </IconButton>
                <IconButton>
                    <DeleteRounded />
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

    return(
        <>
            <div style={{display:'flex'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <Grid container>
                        <Grid xs={12} style={{ marginTop: '15px', marginBottom: '27px' }}>
                            <Header />
                        </Grid>
                    </Grid>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <Typography variant='h2' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: '#181818' }}>
                                    Categories
                                </Typography>
                            </div>
                            <div sx={{ textAlign: 'center', marginTop: '16px' }}>
                                <IconButton sx={{
                                    backgroundColor: '#1F2937',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    '&:hover': {
                                        backgroundColor: '#30444E',
                                        '& .rotate-icon': {
                                          transform: 'rotate(45deg)',
                                        },
                                      },
                                    }}>
                                    <AddRounded
                                        onClick={handleClickOpen}
                                        className="rotate-icon"
                                        style={{ 
                                        color: '#F5F5F5', 
                                        fontSize: '2rem', 
                                        transition: 'transform 0.2s',
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
                                    <DialogActions>
                                        <Button 
                                            onClick={handleClose} 
                                            sx={{
                                                textTransform: 'none',
                                                color: 'white',
                                                backgroundColor: '#1F2937',
                                                fontFamily: 'Poppins, sans-serif',
                                                '&:hover': {
                                                    backgroundColor: '#30444E',
                                                },
                                            }}>
                                            Cancel
                                        </Button>
                                        <Button 
                                            onClick={handleClose} 
                                            sx={{
                                                textTransform: 'none',
                                                color: 'white',
                                                backgroundColor: '#1F2937',
                                                fontFamily: 'Poppins, sans-serif',
                                                '&:hover': {
                                                    backgroundColor: '#30444E',
                                                },
                                            }}>
                                            Add
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                </div>
                        </div>

                    <Grid container>
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
                                        border: '2px solid #ddd',
                                        borderRadius: '8px',
                                        backgroundColor: 'white',
                                        '& .MuiDataGrid-row': {
                                            '&:nth-of-type(odd)': {
                                                color: '#F5F5F5',
                                                backgroundColor: '#37474F',
                                                '& .css-i4bv87-MuiSvgIcon-root': {
                                                    color: '#F5F5F5',
                                                  },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                
                
            </div>
        </>
    );

}