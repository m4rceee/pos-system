import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { firestore } from './firebaseConfig';
import { addDoc, collection, doc, onSnapshot } from '@firebase/firestore';

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
    { field: 'categoryId', headerName: 'ID', width: 90 },
    { field: 'categoryName', headerName: 'Category Name', width: 450 },
    { field: 'categoryTotalCount', headerName: 'Product Count', width: 450 },
    { 
        field: 'categoryActions', 
        headerName: 'Actions',
        width: 150,
        align: 'center',
        headerAlign: 'center',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        renderCell: (params) => (
            <>
                <IconButton>
                    <EditRounded sx={{color: '#3CBCC3'}}/>
                </IconButton>
                <IconButton>
                    <DeleteRounded sx={{color: '#E40C2B'}}/>
                </IconButton>
            </>
            
                
        ),
    },
    
  ];

export default function CategoryHome() {

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const getCategoryData = onSnapshot(collection(firestore, 'Product_Category'), (snapshot) => {
            const categoryArray = snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setCategory(categoryArray);
        });
    return () => getCategoryData();
  }, []); 

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };


    const handleAddCategory = (e) => {
        e.preventDefault();
        setCount(count + 1);
        const categoryName = e.target.categoryName.value;

        //const val = doc(firestore, "MelysonProductDB", categoryName);
        const collectVal = collection(firestore, "Product_Category");
        addDoc(collectVal, {
            categoryId:count, 
            categoryName, 
            categoryTotalCount:count
        });
        

        console.log(categoryName);
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
            <div style={{display:'flex', marginLeft: '5rem'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                Categories
                            </Typography>
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

                    <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px' }}>
                        <CardContent style={{ padding: '20px'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                        Please use the table below to navigate or filter the results.
                                </Typography>
                                <div sx={{ textAlign: 'center', marginTop: '16px' }}>
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

                                            <form onSubmit={(e)=> handleAddCategory(e)}>
                                                <TextField
                                                    name="categoryName"
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

                                                <DialogActions>
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
                                                        type="submit" 
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
                                            </form>
                                            
                                            </DialogContent>
                                        
                                    </Dialog>
                                </div>
                            </div>
                            
                            <Grid className='mt-5' container>
                                <Grid item xs={12}>
                                    <div style={{ height: 'auto', width: '100%' }}>
                                        <DataGrid
                                            rows={category}
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
        </>
    );

}