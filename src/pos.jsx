import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { styled } from '@mui/system';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';

import { firestore } from './firebaseConfig';
import { collection, onSnapshot, doc, getDoc} from '@firebase/firestore';

import { 
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    CardActionArea,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from '@mui/material';
import HeaderTitleWidget from './widgets/header-title';

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


export default function PosPage() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [tableItems, setTableItems] = useState([]);

    const handleItemClick = (item) => {
        const existingItemIndex = tableItems.findIndex((tableItem) => tableItem.itemName === item.itemName);

        if (existingItemIndex !== -1) {
            const updatedItems = [...tableItems];
            updatedItems[existingItemIndex].itemQuantity += 1;
            setTableItems(updatedItems);
        } else {
            const newItem = { ...item, itemQuantity: 1 };
            setTableItems([...tableItems, newItem]);
        }

        setSelectedItem(item);
    };

    // Assuming you have a function to calculate the total amount from the tableItems
    const calculateTotalAmount = () => {
        return tableItems.reduce((total, item) => total + (item.itemQuantity * item.itemPrice), 0);
    };
    
    // Inside your component
    const totalAmount = calculateTotalAmount();

    const handleCancelBill = () => {
        setOpen(true);
    };
    
    const handleClose = (confirmed) => {
        setOpen(false);
    
        if (confirmed) {
            navigate('/pos');
            window.location.reload();
        }
    };



    const StyledTableCell = styled(TableCell)({
        fontFamily: 'Poppins, sans-serif',
        color: colors.secondary,
      });

    const [value, setValue] = React.useState('All');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };




const [getCategories, setCategories] = useState([]);

useEffect(() => {
    const getCategoryData = onSnapshot(collection(firestore, 'Product_Category'), (snapshot) => {
      const categoryArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
  
      // Add a custom category "All" to the beginning of the array
      const allCategory = { id: 'all', categoryName: 'All' };
      categoryArray.unshift(allCategory);
  
      // Sort the categoryArray based on categoryName in ascending order
      categoryArray.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  
      setCategories(categoryArray);
  
      // Extract only the category IDs into a separate array
      const categoryIdsArray = categoryArray.map(category => category.id);
  
      // Now you have the array of all category IDs including "All"
      console.log('All Category IDs:', categoryIdsArray);
    });
  
    return () => getCategoryData();
  }, []);

  
const [getProduct, setProduct] = useState([]);

    useEffect(() => {
        const getProductData = onSnapshot(collection(firestore, 'Products'), (snapshot) => {
            const productArray = snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            setProduct(productArray);
            console.log(productArray);
        });
    return () => getProductData();
  }, []); 

    return(
        <div style={{display: 'flex', marginLeft: '5rem' }}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>       
                    <HeaderTitleWidget label={"Point-of-Sale"}/>
                    <Grid container spacing={1.5} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '5px', display: 'flex', flexDirection: 'row'}}>
                                    <Box sx={{ overflowX: 'auto', width: '100%', typography: 'body1' }}>
                                        <TabContext value={value}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto', position: 'sticky', top: 0, zIndex: 500, backgroundColor: '#13131c', boxShadow: '0 8px 16px rgba(169, 169, 169, 0.6)' }}>
                                                <TabList
                                                    variant='scrollable'
                                                    scrollButtons="auto"
                                                    onChange={handleChange}
                                                    aria-label="lab API tabs example"
                                                    sx={{ 
                                                        borderBottom: 1, 
                                                        borderColor: 'divider',
                                                        '& .MuiTab-root': {
                                                            fontFamily: 'Poppins, sans-serif',
                                                            fontSize: '16px',
                                                            fontWeight: 'bold',
                                                            color: colors.secondary,
                                                        },
                                                        '& .MuiTabs-scrollButtons': {
                                                            color: colors.secondary,
                                                        },
                                                    }}
                                                >
                                                    {getCategories.map((category) => (
                                                        <Tab key={category.id} label={category.categoryName} value={category.categoryName} />
                                                    ))}
                                                </TabList>
                                            </Box>
                                            {getCategories.map((category) => (
                                                <TabPanel key={category.id} value={category.categoryName}>
                                                    <Grid container spacing={2}>
                                                        {getProduct
                                                        .filter((item) => category.categoryName === 'All' || item.itemCategory === category.id)
                                                        .map((item) => (
                                                            <Grid item key={item.id} xs={12} sm={4}>
                                                            <CardActionArea onClick={() => handleItemClick(item)}>
                                                                <Card style={{background: '#13131c', color: colors.secondary}}>
                                                                    <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                                                                        <div style={{display: 'flex', flexDirection: 'column', marginTop: 'auto', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                                                                            <Typography variant="body1" component="div" sx={{ fontSize: '15px', fontWeight: '700', fontFamily: 'Poppins, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.itemName}>
                                                                                {item.itemName}
                                                                            </Typography>
                                                                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '13px', color: 'gray', fontFamily: 'Poppins, sans-serif'}} title={item.itemName}>
                                                                                Price: ₱{item.itemPrice}
                                                                            </Typography>
                                                                        </div>
                                                                        <div className="quantity" style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                                                            <Typography 
                                                                                variant="body2"
                                                                                sx={{
                                                                                color: item.itemQuantity <= 10 ? colors.accentOrange : colors.secondary,
                                                                                fontWeight: item.itemQuantity <= 10 ? '700' : 'normal',
                                                                                fontFamily: 'Poppins, sans-serif'
                                                                            }} title={item.itemName}>
                                                                                Qty: {item.itemQuantity}
                                                                            </Typography>
                                                                        </div>
                                                                    </CardContent>
                                                                </Card>
                                                            </CardActionArea>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </TabPanel>
                                            ))}
                                        </TabContext>
                                    </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '20px'}}>
                                <CardContent style={{ padding: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <Typography variant='h6' sx={{marginTop: '10px', fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', textAlign: 'center', color: colors.secondary}}>
                                        Bill Total
                                    </Typography>
                                    <Typography variant='body2' sx={{fontFamily: 'Poppins, sans-serif', textAlign: 'center', color: colors.secondary}}>
                                        Melyson Enterprise
                                    </Typography>
                                    <div style={{ flex: 1 }}>
                                            <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>Product Name</StyledTableCell>
                                                            <StyledTableCell align="right">Quantity</StyledTableCell>
                                                            <StyledTableCell align="right">Price</StyledTableCell>
                                                            <StyledTableCell align="right">Trashcan Icon</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {tableItems.map((tableItem, index) => (
                                                            <TableRow key={index}>
                                                                <StyledTableCell>{tableItem.itemName}</StyledTableCell>
                                                                <StyledTableCell align="right">{tableItem.itemQuantity}</StyledTableCell>
                                                                <StyledTableCell align="right">{tableItem.itemPrice}</StyledTableCell>
                                                                <StyledTableCell align="right">Icon</StyledTableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <div>
                                            <div style={{ margin: '15px', display: 'flex',  justifyContent: 'space-between'}}>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    Discount: 
                                                </Typography>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    ₱ 0.00 
                                                </Typography>
                                            </div>
                                            <div style={{display: 'flex', width: '100%'}}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handleCancelBill()}
                                                    sx={{
                                                    backgroundColor: colors.accentRed,
                                                    borderTopLeftRadius: '0px',
                                                    borderTopRightRadius: '0px',
                                                    borderBottomLeftRadius: '0px', 
                                                    borderBottomRightRadius: '0px',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover':  {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                                                      }
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Dialog open={open} onClose={() => handleClose(false)}>
                                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Confirm Cancellation</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText sx={{fontFamily: 'Poppins, sans-serif'}}>
                                                            Are you sure you want to cancel the bill?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={() => handleClose(false)} color="primary" sx={{fontFamily: 'Poppins, sans-serif'}}>
                                                            No
                                                        </Button>
                                                        <Button onClick={() => handleClose(true)} color="primary" sx={{fontFamily: 'Poppins, sans-serif'}}>
                                                            Yes
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handlePay(totalAmount)}
                                                    sx={{
                                                    padding: '10px',
                                                    borderTopLeftRadius: '0px',
                                                    borderTopRightRadius: '0px',
                                                    borderBottomLeftRadius: '0px', 
                                                    borderBottomRightRadius: '0px',
                                                    fontFamily: 'Poppins, sans-serif',
                                                    '&:hover':  {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                                                      }
                                                    }}
                                                >
                                                    Discount
                                                </Button>
                                            </div>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={() => handlePay(totalAmount)}
                                                sx={{
                                                backgroundColor: colors.accentOlive,
                                                borderTopLeftRadius: '0px',
                                                borderTopRightRadius: '0px',
                                                borderBottomLeftRadius: '8px', 
                                                borderBottomRightRadius: '8px',
                                                padding: '10px',
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '25px'
                                                }}
                                            >
                                                Pay: ₱{totalAmount.toFixed(2)}
                                            </Button>
                                        </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
        </div>
    );
}