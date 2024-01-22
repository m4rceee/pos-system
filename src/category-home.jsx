import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HeaderTitleWidget from './widgets/header-title';

import { firestore } from './firebaseConfig';
import { addDoc, collection, doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';

import {AddRounded, EditRounded, DeleteRounded,} from "@mui/icons-material";
import { Grid, Container, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Card, CardContent,} from '@mui/material';
import ButtonWidget from './widgets/button';
import TextFieldInputWidget from './widgets/textfield-input';

import { BounceLoader } from 'react-spinners';


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
// EDIT CATEGORY NAME TO THE DATABSE    
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [editedCategoryData, setEditedCategoryData] = useState({
    categoryName: '',
    // Add other category properties...
    });

    const handleEditDialogOpen = (categoryId, categoryData) => {
    setSelectedCategoryId(categoryId);
    setEditedCategoryData({ categoryName: categoryData.categoryName });
    setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
    setSelectedCategoryId(null);
    setEditedCategoryData({ categoryName: '' });
    setEditDialogOpen(false);
    };

    const handleUpdateCategory = async () => {
    if (selectedCategoryId) {
        try {
        const categoryRef = doc(firestore, 'Product_Category', selectedCategoryId);

        // Update the document with the edited category data (only categoryName)
        await updateDoc(categoryRef, { categoryName: editedCategoryData.categoryName });

        console.log('Category successfully updated!');
        } catch (error) {
        console.error('Error updating category:', error);
        }
    }

    // Close the edit dialog after updating or cancellation
    handleEditDialogClose();
    }; 



////////////////////////////////////////////////////////////////////////////////////////
// DELETE CATEGORY TO THE DATABSE          
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const handleConfirmationDialogOpen = (categoryId) => {
        setConfirmationDialogOpen(true);
        setSelectedCategoryId(categoryId);
    };

    const handleConfirmationDialogClose = () => {
        setConfirmationDialogOpen(false);
        setSelectedCategoryId(null);
    };

    const handleDeleteCategory = async () => {
        // Check if there is a selected category ID
        if (selectedCategoryId) {
        try {
            // Reference to the document in the "Product_Category" collection
            const categoryRef = doc(firestore, 'Product_Category', selectedCategoryId);

            // Delete the document
            await deleteDoc(categoryRef);

            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
        }

        handleConfirmationDialogClose();
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
                    <IconButton onClick={() => handleEditDialogOpen(params.row.id, params.row)}>
                        <EditRounded sx={{ color: '#3CBCC3' }} />
                    </IconButton>
                    <IconButton onClick={() => handleConfirmationDialogOpen(params.row.id)}>
                        <DeleteRounded sx={{ color: '#E40C2B' }} />
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
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: colors.secondary }}>
                                    <div style={{marginTop: '25px', marginBottom: '15px'}}>
                                        <BounceLoader color={colors.secondary} speedMultiplier={2}  />
                                    </div>
                                    <div style={{marginBottom: '25px'}}>
                                        <Typography variant="body1" sx={{fontFamily: 'Poppins, sans-serif'}}> Loading Categories... </Typography>
                                    </div>
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
                                    


{/*
///////////////////////////////////////////////////////////////////////////////////////
// EDIT CATEGORY POP UP
*/}   
                                <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Edit Category</DialogTitle>
                                    <DialogContent sx={{width: '500px'}}>
                                        <TextFieldInputWidget 
                                            title={"Category Name:"} 
                                            value={editedCategoryData.categoryName} 
                                            onChange={(e) => setEditedCategoryData((prevData) => ({ ...prevData, categoryName: e.target.value }))}
                                        />
                                        <DialogActions>
                                            <ButtonWidget onClick={handleEditDialogClose} label={"Cancel"} />
                                            <ButtonWidget onClick={handleUpdateCategory} label={"Update"} />
                                        </DialogActions>
                                        </DialogContent>
                                </Dialog>



{/*
///////////////////////////////////////////////////////////////////////////////////////
// DELETE CATEGORY POP UP
*/}  
                                <Dialog open={confirmationDialogOpen} onClose={handleConfirmationDialogClose}>
                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Confirmation</DialogTitle>
                                        <DialogContent sx={{fontFamily: 'Poppins, sans-serif'}}>Are you sure you want to delete this category?</DialogContent>
                                    <DialogActions sx={{marginRight: '15px', marginBottom: '10px'}}>
                                        <ButtonWidget onClick={handleConfirmationDialogClose} label={"Cancel"} />
                                        <ButtonWidget onClick={handleDeleteCategory} label={"Delete"} />
                                    </DialogActions>
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