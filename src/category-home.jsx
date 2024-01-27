import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HeaderTitleWidget from './widgets/header-title';

import { firestore } from './firebaseConfig';
import { limit, query, orderBy, addDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, deleteDoc, where, } from '@firebase/firestore';

import {AddRounded, EditRounded, DeleteRounded, SearchRounded} from "@mui/icons-material";
import { InputAdornment, Grid, Container, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Card, CardContent, CircularProgress} from '@mui/material';
import ButtonWidget from './widgets/button';
import TextFieldInputWidget from './widgets/textfield-input';

import { BounceLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./toast.css";


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
    const [addingCategory, setAddingCategory] = useState(false);
    const [editingCategory, setEditingCategory] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState(false);

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
const handleAddCategory = async (e) => {
    setAddingCategory(true);
    try {
        e.preventDefault();

        // Query to get the latest category ID
        const latestCategoryQuery = query(collection(firestore, 'Product_Category'), orderBy('categoryId', 'desc'), limit(1));
        const latestCategorySnapshot = await getDocs(latestCategoryQuery);
        const latestCategoryId = latestCategorySnapshot.docs[0]?.data().categoryId || 'C0000';

        // Increment the latest category ID
        const newNumericPart = parseInt(latestCategoryId.slice(1), 10) + 1;
        const newCategoryId = `C${String(newNumericPart).padStart(4, '0')}`;

        const categoryName = e.target.categoryName.value;

        const collectVal = collection(firestore, "Product_Category");
        const categoryDocRef = await addDoc(collectVal, {
            categoryId: newCategoryId,
            categoryName,
            categoryTotalCount: 0,
        });

        toast.success('Category added successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } catch (error) {
        toast.error('Error adding category. Please try again.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        console.error('Error adding category:', error);
    } finally {
        setAddingCategory(false);
        setOpen(false);
    }
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
        setEditingCategory(true);
    if (selectedCategoryId) {
        try {
        const categoryRef = doc(firestore, 'Product_Category', selectedCategoryId);

        // Update the document with the edited category data (only categoryName)
        await updateDoc(categoryRef, { categoryName: editedCategoryData.categoryName });

        toast.success('Category updated successfully!', {
            position: 'top-right',
            autoClose: 3000, // Auto close the notification after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        console.log('Category successfully updated!');
        } catch (error) {
        console.error('Error updating category:', error);
        } finally {
            setEditingCategory(false);
            handleEditDialogClose();
        }
    }

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
        setDeletingCategory(true);
    
        if (selectedCategoryId) {
            try {
                // Reference to the document in the "Product_Category" collection
                const categoryRef = doc(firestore, 'Product_Category', selectedCategoryId);
    
                // Get the current category ID before deleting
                const categorySnapshot = await getDoc(categoryRef);
                const currentCategoryId = categorySnapshot.data().categoryId;
    
                // Delete the document
                await deleteDoc(categoryRef);
    
                toast.success('Category deleted successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
    
                console.log('Document successfully deleted!');
                
                // Update the count based on the latest category ID
                setCount((prevCount) => prevCount - 1);
    
                // Optionally, you may set a state variable for the latestCategoryId
                // latestCategoryIdStateVar(currentCategoryId);
    
            } catch (error) {
                console.error('Error deleting document:', error);
            } finally {
                setDeletingCategory(false);
                handleConfirmationDialogClose();
            }
        }
    };


    const handleSearch = async (e) => {
        e.preventDefault();
        const searchCategory = e.target.searchCategory.value;

        console.log(searchCategory);
        

        if(searchCategory == ""){
            const querySnapshot = await getDocs(query(collection(firestore, 'Product_Category')));
            const CategoryArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setCategory(CategoryArray);
        }else{
            const querySnapshot = await getDocs(query(collection(firestore, 'Product_Category'), where('categoryName', '==', searchCategory)));
            const filteredCategoryArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setCategory(filteredCategoryArray);
        }
        
  
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
            <ToastContainer />
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
                                    <div>
                                    <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                            Please use the table below to navigate or filter the results.
                                    </Typography>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <form onSubmit={(e)=> handleSearch(e)}>
                                        <Grid container>
                                        <Grid item xs={8} >
                                        <TextField
                                        name="searchCategory"
                                        variant="outlined"
                                        fullWidth
                                        placeholder='Search here...'
                                        sx={{
                                            
                                            '& .MuiOutlinedInput-root': {
                                                height: '45px',
                                                width: '300px',
                                                marginRight: '15px',
                                                backgroundColor: colors.secondary,
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
                                                color: colors.fontColor,
                                            },
                                            '& input::placeholder': {
                                                fontFamily: 'Poppins, sans-serif',
                                                fontWeight: '300',
                                                color: 'gray',
                                            }
                                        }}
                                        />
                                        </Grid>
                                        <Grid item xs={2} >
                                        <IconButton type='submit'>
                                            <SearchRounded sx={{ color: colors.primary }} />
                                        </IconButton>
                                        </Grid>
                                        </Grid>
                                    
                                        
                                        </form>
                                        
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
                                    </div>
                                    



{/*
///////////////////////////////////////////////////////////////////////////////////////
// ADD CATEGORY POP UP
*/}   
                                <Dialog open={open} onClose={handleClose} >
                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Add Category</DialogTitle>
                                    <DialogContent sx={{width: '500px'}}>
                                        <form onSubmit={(e)=> handleAddCategory(e)}>
                                            <TextFieldInputWidget title={"Please enter a category name:"} name={"categoryName"}/>
                                            <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                                                <ButtonWidget onClick={handleClose} label={"Cancel"} />
                                                <ButtonWidget type={"submit"} label={addingCategory ? <CircularProgress size={23} color="inherit" /> : "Add"} />
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
                                        <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                                            <ButtonWidget onClick={handleEditDialogClose} label={"Cancel"} />
                                            <ButtonWidget onClick={handleUpdateCategory} label={editingCategory ? <CircularProgress size={23} color="inherit" /> : "Update"} />
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
                                        <ButtonWidget onClick={handleDeleteCategory} label={deletingCategory ? <CircularProgress size={23} color="inherit" /> : "Delete"} />
                                    </DialogActions>
                                </Dialog>
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