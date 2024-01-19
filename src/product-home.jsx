import * as React from 'react';
import { useState, useEffect } from 'react';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { firestore } from './firebaseConfig';
import { addDoc, collection, onSnapshot, doc, getDoc} from '@firebase/firestore';

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
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';

import { styled } from '@mui/system';

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
    { field: 'itemId', headerName: 'ID', width: 90 },
    { field: 'itemCode', headerName: 'Item Code', width: 200 },
    { field: 'itemName', headerName: 'Item Name', width: 300 },
    { field: 'itemCategory', headerName: 'Category', width: 250 },
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
    row.id = String(index + 1).padStart(4, '0');
  });

  const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: '▴',
          },
          decrementButton: {
            children: '▾',
          },
        }}
        {...props}
        ref={ref}
      />
    );
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

    const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
  };


  const [count, setCount] = useState(0);
  const [category, setCategory] = useState([]);
  //const [productItem, setProduct] = useState([]);

    useEffect(() => {
        const getCategoryData = onSnapshot(collection(firestore, 'Product_Category'), (snapshot) => {
            const categoryArray = snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setCategory(categoryArray);
        });
    return () => getCategoryData();
  }, []); 

    /*useEffect(() => {
        const getProductData = onSnapshot(collection(firestore, 'Products'), (snapshot) => {
            const productArray = snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setProduct(productArray);
        });
    return () => getProductData();
  }, []); */

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
    

    console.log("Name: " + itemName + "\nBarcode: " + itemCode + "\nCategory: " + itemCategory + "\nQuantity: " + itemQuantity + "\nPrice: " + itemPrice);

    setOpen(false);
    
  };

  
  const StyledTableCell = styled(TableCell)({
    fontFamily: 'Poppins, sans-serif',
    color: colors.secondary,
  });



  const [productItem, setProductItem] = useState([]);
  const [productItemWithCategory, setProductItemWithCategory] = useState([]);

  useEffect(() => {
    // Fetching productItem data
    const getProductItemData = onSnapshot(collection(firestore, 'Products'), (snapshot) => {
      const productItemArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setProductItem(productItemArray);
    });

    // Fetching category names for each productItem
    const fetchCategoryName = (categoryId) => {
      const categoryRef = doc(firestore, 'Product_Category', categoryId);

      return getDoc(categoryRef)
        .then((categorySnapshot) => {
          if (categorySnapshot.exists()) {
            const categoryData = categorySnapshot.data();
            return categoryData.categoryName;
          } else {
            console.log(`Category with ID ${categoryId} not found.`);
            return '';
          }
        })
        .catch((error) => {
          console.error('Error fetching category data: ', error);
          return '';
        });
    };

    // Combining the two fetching operations
    const fetchData = () => {
      try {
        const promises = productItem.map((item) =>
          fetchCategoryName(item.itemCategory).then((categoryName) => ({ ...item, categoryName }))
        );

        Promise.all(promises).then((updatedProductItem) => {
          setProductItemWithCategory(updatedProductItem);
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData(); // Call the function when the component mounts
    return () => {
      getProductItemData(); // Cleanup for productItem listener
    };
  }, []);

    return(
        <>
            <div style={{display: 'flex', marginLeft: '5rem'}}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px', overflowX: 'auto' }}>
                    <Grid container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                            Products
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
                                        <Dialog open={open} onClose={handleClose} >
                                            <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Add Item</DialogTitle>
                                            
                                                <form onSubmit={(e)=> handleAddProduct(e)}>
                                                    <DialogContent sx={{width: '500px'}}><DialogContentText sx={{fontFamily: 'Poppins, sans-serif'}}>Item name:</DialogContentText>
                                                        <TextField
                                                            name="itemName"
                                                            id="itemName"
                                                            fullWidth
                                                            variant="outlined"
                                                            sx={{
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
                                                            }}
                                                        />
                                                    <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>Item Barcode:</DialogContentText>
                                                        <TextField
                                                            name="itemCode"
                                                            id="itemCode"
                                                            fullWidth
                                                            variant="outlined"
                                                            inputProps={{
                                                                type: 'number',
                                                                inputMode: 'numeric',
                                                                pattern: '[0-9]*',
                                                              }}
                                                            sx={{
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
                                                            }}
                                                        />
                                                    <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>Item Category:</DialogContentText>
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
                                                    <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>Item Quantity:</DialogContentText>
                                                        <TextField
                                                            name="itemQuantity"
                                                            id="itemQuantity"
                                                            fullWidth
                                                            variant="outlined"
                                                            inputProps={{
                                                                type: 'number',
                                                                inputMode: 'numeric',
                                                                pattern: '[0-9]*',
                                                              }}
                                                            sx={{
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
                                                            }}
                                                        />
                                                    <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>Item Price (per piece):</DialogContentText>
                                                        <TextField
                                                            name="itemPrice"
                                                            id="itemPrice"
                                                            fullWidth
                                                            variant="outlined"
                                                            inputProps={{
                                                                type: 'number',
                                                                inputMode: 'numeric',
                                                                pattern: '[0-9]*',
                                                              }}
                                                            sx={{
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
                                                            }}>Cancel</Button>

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
                                                            }}>Add</Button>
                                                    </DialogActions>
                                                </form>
                                                
                                    </Dialog>
                                    </div>
                                </div>
                                <TableContainer style={{ marginTop: '15px', overflowY: 'auto' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>ID</StyledTableCell>
                                                <StyledTableCell>Item Code</StyledTableCell>
                                                <StyledTableCell>Item Name</StyledTableCell>
                                                <StyledTableCell>Category</StyledTableCell>
                                                <StyledTableCell>Quantity</StyledTableCell>
                                                <StyledTableCell>Price</StyledTableCell>
                                                <StyledTableCell>Action</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {productItemWithCategory.map((item) => (
                                                <TableRow key={item.id}>
                                                <StyledTableCell>{item.itemId}</StyledTableCell>
                                                <StyledTableCell>{item.itemCode}</StyledTableCell>
                                                <StyledTableCell>{item.itemName}</StyledTableCell>
                                                <StyledTableCell>{item.categoryName}</StyledTableCell>
                                                <StyledTableCell>{item.itemQuantity}</StyledTableCell>
                                                <StyledTableCell>{item.itemPrice}</StyledTableCell>
                                                <StyledTableCell>{item.id}</StyledTableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                </Container>
            </div>
        </>
    );
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    column-gap: 8px;
    padding: 4px;
  
    &.${numberInputClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
  `,
  );
  
  const StyledButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 19px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 0;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;
      grid-row: 1/2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid;
      border-bottom: 0;
      &:hover {
        cursor: pointer;
        background: ${blue[400]};
        color: ${grey[50]};
      }
  
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 1px solid;
      &:hover {
        cursor: pointer;
        background: ${blue[400]};
        color: ${grey[50]};
      }
  
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
    & .arrow {
      transform: translateY(-1px);
    }
  `,
  );