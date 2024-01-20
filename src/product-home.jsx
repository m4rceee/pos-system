import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import { DataGrid } from '@mui/x-data-grid';
import HeaderTitleWidget from './widgets/header-title';
import SmallTitleWidget from './widgets/small-title';
import ContentTitleWidget from './widgets/content-title'

import { firestore } from './firebaseConfig';
import { addDoc, collection, onSnapshot, doc, getDoc, deleteDoc, updateDoc} from '@firebase/firestore';

import {AddRounded, EditRounded, DeleteRounded, PrintRounded,} from "@mui/icons-material";
import { Grid, Container, Typography, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Card, CardContent, Select, MenuItem,} from '@mui/material';
import ButtonWidget from './widgets/button';
import TextFieldInputWidget from './widgets/textfield-input';
import TextFieldInputNumberWidget from './widgets/textfield-input-number';


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

  /*rows.forEach((row, index) => {
    if (row.itemName) {
      row.itemCode = row.itemName.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 1000).toString();
    }
    row.id = String(index + 1).padStart(4, '0');
  });*/


export default function ProductHome() {

    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryChange = (event) => {setSelectedCategory(event.target.value);};

    const handleClickOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};
    const printProducts = () => {window.print();}



////////////////////////////////////////////////////////////////////////////////////////
// SHOW PRODUCT CATEGORY FROM THE DATABASE    
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        const getCategoryData = onSnapshot(collection(firestore, 'Product_Category'), (snapshot) => {
        const categoryArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));

        // Sort the categoryArray based on categoryName in ascending order
        categoryArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));

        setCategory(categoryArray);
        });

        return () => getCategoryData();
    }, []);



////////////////////////////////////////////////////////////////////////////////////////
// ADD DATA TO THE DATABASE
    const handleAddProduct = (e) => {
        e.preventDefault();
        setCount(count + 1);
        
        const itemName = e.target.itemName.value;
        const itemCode = e.target.itemCode.value;
        const itemCategory = e.target.itemCategory.value;
        const itemQuantity = e.target.itemQuantity.value;
        const itemPrice = e.target.itemPrice.value;

        const collectVal = collection(firestore, "Products");
        addDoc(collectVal, {
            itemId:count, 
            itemName, 
            itemCode,
            itemCategory,
            itemQuantity,
            itemPrice
        });

        setOpen(false); 
    };



////////////////////////////////////////////////////////////////////////////////////////
// EDIT DATA TO THE DATABASE    
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editedProductData, setEditedProductData] = useState({
        itemName: '',
        itemCode: '',
        itemCategory: '',
        itemQuantity: '',
        itemPrice: '',
    });

    const handleEditDialogOpen = (productId, productData) => {
        setSelectedProductId(productId);
        setEditedProductData(productData);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setSelectedProductId(null);
        setEditedProductData({
        itemName: '',
        itemCode: '',
        itemCategory: '',
        itemQuantity: '',
        itemPrice: '',
        });
        setEditDialogOpen(false);
    };

    const handleUpdateProduct = async () => {
        if (selectedProductId) {
        try {
            const productRef = doc(firestore, 'Products', selectedProductId);

            // Update the document with the edited product data
            await updateDoc(productRef, editedProductData);

            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document:', error);
        }
        }

        // Close the edit dialog after updating or cancellation
        handleEditDialogClose();
    };



////////////////////////////////////////////////////////////////////////////////////////
// DETELE DATA FROM DATABASE
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const handleConfirmationDialogOpen = (productId) => {
        setConfirmationDialogOpen(true);
        setSelectedProductId(productId);
      };
    
      const handleConfirmationDialogClose = () => {
        setConfirmationDialogOpen(false);
        setSelectedProductId(null);
      };

    const handleDeleteProduct = async () => {
    // Check if there is a selected product ID
    if (selectedProductId) {
        try {
        // Reference to the document in the "Products" collection
        const productRef = doc(firestore, 'Products', selectedProductId);

        // Delete the document
        await deleteDoc(productRef);

        console.log('Document successfully deleted!');
        } catch (error) {
        console.error('Error deleting document:', error);
        }
    }

    handleConfirmationDialogClose();
    };



////////////////////////////////////////////////////////////////////////////////////////
// REPLACING THE CATEGORY.ID BY ITS CATEGORY NAME
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'Products'), (snapshot) => {
        const productArray = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));

        // Fetch category information for each product
        const fetchCategoryInfo = async () => {
            const productsWithCategory = await Promise.all(
            productArray.map(async (product) => {
                const categoryRef = doc(firestore, 'Product_Category', product.itemCategory);
                const categorySnapshot = await getDoc(categoryRef);

                if (categorySnapshot.exists()) {
                const categoryData = categorySnapshot.data();
                return { ...product, categoryName: categoryData.categoryName };     
                } else {
                console.log(`Category with ID ${product.itemCategory} not found.`);
                return product; // Return the product without category information
                }
            })
            );
            setProducts(productsWithCategory);
        };
        fetchCategoryInfo();
        });
        return () => unsubscribe();
    }, []);



////////////////////////////////////////////////////////////////////////////////////////
// ATTRIBUTES TO THE DATAGRID TABLE
    const columns = [
        { field: 'itemId', headerName: 'ID', width: 90 },
        { field: 'itemCode', headerName: 'Item Code', width: 200 },
        { field: 'itemName', headerName: 'Item Name', width: 300 },
        { field: 'categoryName', headerName: 'Category', width: 250 },
        { field: 'itemQuantity', headerName: 'Quantity', width: 100 },
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
            <div style={{display: 'flex', marginLeft: '5rem'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px', overflowX: 'auto' }}>
                    <HeaderTitleWidget label={"Products"}/>

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
// ADD PRODUCT POP UP
*/}                                            
                                        <Dialog open={open} onClose={handleClose} >
                                            <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Add Item</DialogTitle>
                                                <form onSubmit={(e)=> handleAddProduct(e)}>
                                                    <DialogContent sx={{width: '500px'}}>
                                                        <TextFieldInputWidget title={"Item Name:"} name={"itemName"}/>
                                                        <TextFieldInputWidget title={"Item Barcode:"} name={"itemCode"}/>
                                                        <ContentTitleWidget label={"Item Category:"} />
                                                        <Select
                                                            name="itemCategory"
                                                            value={selectedCategory}
                                                            onChange={handleCategoryChange}
                                                            displayEmpty
                                                            fullWidth
                                                            variant="outlined"
                                                            sx={{
                                                                fontFamily: 'Poppins, sans-serif',
                                                                marginTop: '5px',
                                                                width: '100%',
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        border: '1px solid #1F2937',
                                                                    },
                                                                    '&.Mui-focused fieldset': {
                                                                        border: '2px solid #1F2937',
                                                                    },
                                                                },
                                                            }}>
                                                            <MenuItem value="" disabled sx={{fontFamily: 'Poppins, sans-serif'}}>Select Category</MenuItem>
                                                            {category.map((item) => (
                                                                <MenuItem value={item.id} sx={{fontFamily: 'Poppins, sans-serif'}}>{item.categoryName}</MenuItem>
                                                            ))}
                                                        </Select>
                                                        <TextFieldInputNumberWidget title={"Item Quantity:"} name={"itemQuantity"}/>
                                                        <TextFieldInputNumberWidget title={"Item Price (per piece):"} name={"itemPrice"}/>
                                                    </DialogContent>
                                                        
                                                
                                                    <DialogActions sx={{marginRight: '15px', marginBottom: '10px'}}>
                                                        <ButtonWidget onClick={handleClose} label={"Cancel"} />
                                                        <ButtonWidget type={"submit"} label={"Add"} />
                                                    </DialogActions>
                                                </form>
                                                
                                    </Dialog>


{/*
///////////////////////////////////////////////////////////////////////////////////////
// EDIT PRODUCT POP UP
*/}  
                                    <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                                    <SmallTitleWidget label="Edit Item"/>
                                            <DialogContent sx={{width: '500px'}}>
                                                <TextFieldInputWidget 
                                                    title={"Item name:"} 
                                                    value={editedProductData.itemName} 
                                                    onChange={(e) => setEditedProductData((prevData) => ({ ...prevData, itemName: e.target.value }))}
                                                />
                                                <TextFieldInputWidget 
                                                    title={"Item Barcode:"} 
                                                    value={editedProductData.itemCode} 
                                                    onChange={(e) => setEditedProductData((prevData) => ({ ...prevData, itemCode: e.target.value }))}
                                                />
                                                <ContentTitleWidget label={"Item Category:"} />
                                                <Select
                                                    fullWidth
                                                    value={editedProductData.itemCategory}
                                                    onChange={(e) => setEditedProductData((prevData) => ({ ...prevData, itemCategory: e.target.value }))}
                                                    variant="outlined"
                                                    sx={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        marginTop: '5px',
                                                        width: '100%',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': {
                                                                border: '1px solid #1F2937',
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                border: '2px solid #1F2937',
                                                            },
                                                        },
                                                    }}>
                                                    <MenuItem value="" disabled sx={{fontFamily: 'Poppins, sans-serif'}}>Select Category</MenuItem>
                                                    {category.map((item) => (
                                                        <MenuItem value={item.id} sx={{fontFamily: 'Poppins, sans-serif'}}>{item.categoryName}</MenuItem>
                                                    ))}
                                                </Select>
                                                <TextFieldInputNumberWidget 
                                                    title={"Item Quantity:"}
                                                    value={editedProductData.itemQuantity} 
                                                    onChange={(e) => setEditedProductData((prevData) => ({ ...prevData, itemQuantity: e.target.value }))}
                                                />
                                                <TextFieldInputNumberWidget 
                                                    title={"Item Price (per piece):"}
                                                    value={editedProductData.itemPrice} 
                                                    onChange={(e) => setEditedProductData((prevData) => ({ ...prevData, itemPrice: e.target.value }))}
                                                />
                                        </DialogContent>

                                            <DialogActions sx={{marginRight: '15px', marginBottom: '10px'}}>
                                                <ButtonWidget onClick={handleEditDialogClose} label={"Cancel"} />
                                                <ButtonWidget onClick={handleUpdateProduct} label={"Update"} />
                                            </DialogActions>
                                    </Dialog>


{/*
///////////////////////////////////////////////////////////////////////////////////////
// DELETE PRODUCT POP UP
*/}
                                    <Dialog open={confirmationDialogOpen} onClose={handleConfirmationDialogClose}>
                                        <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Confirmation</DialogTitle>
                                            <DialogContent sx={{fontFamily: 'Poppins, sans-serif'}}>Are you sure you want to delete this product?</DialogContent>
                                        <DialogActions sx={{marginRight: '15px', marginBottom: '10px'}}>
                                            <ButtonWidget onClick={handleConfirmationDialogClose} label={"Cancel"} />
                                            <ButtonWidget onClick={handleDeleteProduct} label={"Delete"} />
                                        </DialogActions>
                                    </Dialog>
                                    </div>
                                </div>


{/*
///////////////////////////////////////////////////////////////////////////////////////
// SHOW ALL THE DATA INFORMATION (ID, ITEM CODE, ITEM NAME, CATEGORY, QUANTITY, PRICE)
*/}                                
                                <Grid className='mt-5' container>
                                    <Grid item xs={12}>
                                        <div style={{ height: 'auto', width: '100%' }}>
                                            <DataGrid
                                                rows={products}
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