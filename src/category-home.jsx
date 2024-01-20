import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HeaderTitleWidget from './widgets/header-title';

import { firestore } from './firebaseConfig';
import { addDoc, collection, doc, onSnapshot } from '@firebase/firestore';

import {AddRounded, EditRounded, DeleteRounded,} from "@mui/icons-material";
import { Grid, Container, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Card, CardContent,} from '@mui/material';
import ButtonWidget from './widgets/button';
import TextFieldInputWidget from './widgets/textfield-input';


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



export default function CategoryHome() {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [count, setCount] = useState(0);

    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};


////////////////////////////////////////////////////////////////////////////////////////
// GET PRODUCT CATEGORY FROM THE DATABSE   
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getCategoryData = onSnapshot(collection(firestore, 'Product_Category'), (snapshot) => {
            const categoryArray = snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setCategory(categoryArray);
            setLoading(false); // Set loading to false when data is loaded
        });
    return () => getCategoryData();
  }, []); 
    


////////////////////////////////////////////////////////////////////////////////////////
// ADD PRODUCT CATEGORY TO THE DATABSE    
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
        
        setOpen(false);
      };



////////////////////////////////////////////////////////////////////////////////////////
// ATTRIBUTES TO THE DATAGRID TABLE       
    const columns = [
        { field: 'categoryId', headerName: 'ID', width: 120 },
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



////////////////////////////////////////////////////////////////////////////////////////
// START OF CODE
    return(
        <>
            <div style={{display:'flex', marginLeft: '5rem'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>
                    <HeaderTitleWidget label={"Categories"}/>

                    <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', marginBottom: '30px' }}>
                        <CardContent style={{ padding: '20px'}}>
                            {loading ? (
                                // Render loading indicator while loading
                                <div style={{ textAlign: 'center', color: colors.secondary }}>
                                    Loading...
                                </div>
                                ) : (
                                    <>
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



{/*
///////////////////////////////////////////////////////////////////////////////////////
// ADD CATEGORY POP UP
*/}   
                                        <Dialog open={open} onClose={handleClose} >
                                            <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Add Category</DialogTitle>
                                            <DialogContent sx={{width: '500px'}}>
                                                <form onSubmit={(e)=> handleAddCategory(e)}>
                                                    <TextFieldInputWidget title={"Please enter a category name:"} name={"categoryName"}/>
                                                    <DialogActions>
                                                        <ButtonWidget onClick={handleClose} label={"Cancel"} />
                                                        <ButtonWidget type={"submit"} label={"Add"} />
                                                    </DialogActions>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>



{/*
///////////////////////////////////////////////////////////////////////////////////////
// SHOW ALL THE DATA INFORMATION (ID, CATEGORY NAME, PRODUCT COUNT)
*/}
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
                                </>
                                )
                            }
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </>
    );

}