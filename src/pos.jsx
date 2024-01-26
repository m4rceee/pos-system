import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, IconButton, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import { styled } from '@mui/system';

import "./styles.css";
import 'typeface-poppins';
import SideBar from './common/sidebar';

import { firestore } from './firebaseConfig';
import { collection, onSnapshot, doc, getDoc, updateDoc, addDoc } from '@firebase/firestore';

import { BounceLoader } from 'react-spinners';
import { InputAdornment, TextField, Container, Grid, Typography, Card, CardContent, Button, CardActionArea, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, } from '@mui/material';
import { DeleteRounded, SearchRounded } from '@mui/icons-material';

import HeaderTitleWidget from './widgets/header-title';
import TextFieldInputNumberPaymentWidget from './widgets/textfield-input-number';
import ButtonWidget from './widgets/button';

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
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [changeAmount, setChangeAmount] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [processingClick, setProcessingClick] = useState(false);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [cancelButton, setcancelButtonDisabled] = useState(true);
    const [addingProduct, setAddingProduct] = useState(false);

    const handleDeleteItem = async (index) => {
        const deletedItem = tableItems[index];
    
        // Create a copy of the current state
        const updatedTableItems = [...tableItems];
    
        // Remove the item at the specified index
        updatedTableItems.splice(index, 1);
    
        // Update the state with the new array
        setTableItems(updatedTableItems);
    
        try {
            // Reference to the specific product document
            const productRef = doc(firestore, 'Products', deletedItem.id);
    
            // Get the current product data
        const productSnapshot = await getDoc(productRef);
        const initialQuantity = productSnapshot.data().itemPreQuantity;

        // Calculate the new quantity by adding back the deleted item's quantity
        const newQuantity = initialQuantity + deletedItem.itemQuantity;

        // Update the product document with the new quantity
        await updateDoc(productRef, { itemQuantity: newQuantity, itemPreQuantity: newQuantity });
    
            console.log(`Product ${deletedItem.itemName} quantity restored successfully.`);
        } catch (error) {
            console.error(`Error restoring product ${deletedItem.itemName} quantity:`, error.message);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentDate(new Date());
        }, 1000); // Update the date every second

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const handleItemClick = async (item) => {
        if (processingClick) {
            console.log('Click in progress, please wait.');
            return;
        }
        // Reference to the specific product document
        const productRef = doc(firestore, 'Products', item.id);
        const existingItemIndex = tableItems.findIndex((tableItem) => tableItem.itemName === item.itemName);
        const updatedItems = [...tableItems];
        const quantity = item.itemPreQuantity;

        setProcessingClick(true);

        if(quantity > 0){
            if (existingItemIndex !== -1) {
                // If the item exists
                updatedItems[existingItemIndex].itemQuantity += 1;
                setTableItems(updatedItems);
                
            } else {
                // If the item does not exist, create a new item with quantity 1 and add it to the array
                const newItem = { ...item, itemQuantity: 1 };
                setTableItems([...tableItems, newItem]);
            }

            //enable cancel button
            setcancelButtonDisabled(false);

        }else {
            console.log('Product quantity is already at the minimum!');
        }
     

        try {
            // Get the current product data
            const productSnapshot = await getDoc(productRef);
            const currentQuantity = productSnapshot.data().itemPreQuantity;

            // Ensure that the quantity does not go below 0
            const newQuantity = Math.max(0, currentQuantity - 1);

            // Add a condition to check if the new quantity is greater than 0 before updating the product document
            if (newQuantity > 0) {
                // Update the product document with the new quantity
                await updateDoc(productRef, { itemPreQuantity: newQuantity });
                console.log('Product quantity decreased successfully.');
            } else {
                // Display a notification when itemQuantity is equal to 0
                setNotification('Your product quantity is 0');
                console.log('Product quantity is already at the minimum.');
            }
        } catch (error) {
            console.error('Error decreasing product quantity:', error.message);
        } finally {
            setProcessingClick(false);
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
    

    // CANCEL BUTTON
    const handleClose = async (confirmed) => {
        setOpen(false);

        if (confirmed)  {

            for (let i = 0; i < tableItems.length; i++) {
                const item = tableItems[i];
            
                // Reference to the specific product document
                const productRef = doc(firestore, 'Products', item.id);
            
                try {
                  // Get the current product data
                  const productSnapshot = await getDoc(productRef);
                  const currentQuantity = productSnapshot.data().itemQuantity;
            
                  // Ensure that the quantity does not go below 0
                  const newQuantity = currentQuantity;
            
                  // Update the product document with the new quantity
                  await updateDoc(productRef, { itemPreQuantity: newQuantity });
            
                  console.log(`Product ${item.itemName} quantity updated successfully.`);
                } catch (error) {
                  console.error(`Error updating product ${item.itemName} quantity:`, error.message);
                }
              }

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
      //console.log('All Category IDs:', categoryIdsArray);
      setLoading(false);
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
            //console.log(productArray);
            setLoading(false);
        });
    return () => getProductData();
  }, []); 

  ///////////////////////////////// PAYMENT DIALOG ///////////////////////////////////
  const handleOpenDialog = (event) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAmountChange = (event) => {
    setPaymentAmount(event.target.value);
    const inputValue = event.target.value;
    setPaymentAmount(inputValue);

    // Assuming totalAmount is calculated somewhere in your component
    const totalAmount = calculateTotalAmount(); // Make sure to define calculateTotalAmount function

    if(inputValue == ""){
        setChangeAmount(0);
    }else{
        // Calculate the change
        const change = parseFloat(inputValue) - totalAmount;
        setChangeAmount(change);
    }

    

    if(inputValue < totalAmount){
        setButtonDisabled(true);
    }else {
        setButtonDisabled(false);
    }

  };


  const generatePaymentReferenceId = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

    const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6-digit random number

    const referenceId = formattedDate + randomDigits;
    return referenceId;
};

const generateReceiptHTML = (transaction) => {
    const { referenceId, dateTransaction, productBreakdown, totalAmount, totalCash, totalChange } = transaction;

    const itemsHTML = productBreakdown.map(item => `<li>${item.itemName}: ${item.itemQuantity} x $${item.itemPrice} = $${item.itemQuantity * item.itemPrice}</li>`).join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                width: auto;
                margin: auto;
                box-sizing: border-box;
            }
            .header {
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
            }
            .offReceipt {
                text-align: center;
                font-size: 12px;
                font-weight: bold;
            }
            .content {
                font-size: 9px;
            }
            .receiptTable {
                width: 100%;
            }
            .tableQty {
                width: 10%;
            }
            .tableDesc {
                width: 65%;
            }
            .tableAmount {
                width: 25%;
                text-align: right;
            }
            .receiptDivider {
                display: block;
                border-bottom: 1px solid #000;
                margin: 5px 0;
            }
            .last {
                margin-bottom: 0;
            }
            .receiptDetails {
                font-size: 12px;
            }
        </style>
    </head>
    <body>
                    <div class="container">
                        <div class="header">Melyson Enterprise</div>
                        <p class="offReceipt">OFFICIAL RECEIPT</p>
                        <span class="receiptDivider"></span>

                        <table class="receiptTable">
                            <tbody>
                                <tr>
                                    <td class="tableQty">Qty</td>
                                    <td class="tableDesc">Description</td>
                                    <td class="tableAmount">Amount PHP</td>
                                </tr>
                                <tr><td colspan="3"><span class="receiptDivider"></span></td></tr>
                                <!-- Use map to create <table> based on the length of productBreakdown -->
                                ${productBreakdown.map(item => `
                                    <tr>
                                        <td>${item.itemQuantity}</td>
                                        <td>${item.itemName} @${item.itemPrice}</td>
                                        <td class="tableAmount">₱${(item.itemQuantity * item.itemPrice).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <span class="receiptDivider last"></span>

                        <div class="receiptDetails">
                            <table class="receiptTable transaction">
                                <tr>
                                    <td><p>Amount Due:</p></td>
                                    <td><p>₱${totalAmount.toFixed(2)}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Cash:</p></td>
                                    <td><p>₱${parseInt(totalCash, 10).toFixed(2)}</p></td>
                                </tr>
                                <tr>
                                    <td><p>Change:</p></td>
                                    <td><p>₱${totalChange.toFixed(2)}</p></td>
                                </tr>
                            </table>
                            <span class="receiptDivider"></span>
                            <p>Transaction Date: ${dateTransaction}</p>
                            <p>Reference ID: ${referenceId}</p>
                            <p>*********************************************************</p>
                            <p>*********************************************************</p>
                            <p>*********************************************************</p>
                            <p>*********************************************************</p>
                        </div>
                    </div>
                </body>
                </html>
    `;
};


  const handleAddTransaction = async (e) => {
    e.preventDefault();
    console.log('Payment to be paid:', totalAmount)
    console.log('Products in the table:', tableItems);
    console.log('Payment amount:', paymentAmount);

    setAddingProduct(true);

    for (let i = 0; i < tableItems.length; i++) {
        const item = tableItems[i];
        const productRef = doc(firestore, 'Products', item.id);

        try {
            // Get the current product data
            const productSnapshot = await getDoc(productRef);
            const currentQuantity = productSnapshot.data().itemQuantity;

            // Ensure that the quantity does not go below 0
            const newQuantity = Math.max(0, currentQuantity - item.itemQuantity);

            // Update unitsSold and totalAmount fields
            const unitsSold = productSnapshot.data().unitsSold + item.itemQuantity;
            const totalAmount = productSnapshot.data().totalAmount + (item.itemQuantity * item.itemPrice);

            // Update the product document with the new quantity
            await updateDoc(productRef, { itemQuantity: newQuantity, itemPreQuantity: newQuantity, unitsSold, totalAmount });

        } catch (error) {
            console.error(`Error updating product ${item.itemName} quantity:`, error.message);
        }
    }

    const transactionVal = collection(firestore, "Transactions");
    const newTransactionRef = addDoc(transactionVal, {
        referenceId: generatePaymentReferenceId(),
        dateTransaction: currentDate.toLocaleString(),
        productBreakdown: tableItems,
        totalAmount: totalAmount,
        totalCash: paymentAmount,
        totalChange: changeAmount
    });

    const transactionData = {
        referenceId: generatePaymentReferenceId(),
        dateTransaction: currentDate.toLocaleString(),
        productBreakdown: tableItems,
        totalAmount: totalAmount,
        totalCash: paymentAmount,
        totalChange: changeAmount
    };

    const receiptHTML = generateReceiptHTML(transactionData);

    // Open a new window or create an iframe
    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Initiate the print process
    printWindow.print();

    // Close the window or remove the iframe after printing
    printWindow.onafterprint = function () {
        printWindow.close();
    };

    setOpenDialog(false);
    navigate('/pos');
    window.location.reload();
  };

  

    return(
        <div style={{display: 'flex', marginLeft: '5rem' }}>
                <SideBar />
                <Container maxWidth="xl" style={{ paddingLeft: '35px', paddingTop: '20px' }}>       
                    <HeaderTitleWidget label={"Point-of-Sale"}/>
                    <Grid container spacing={1.5} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={8} sx={{ alignItems: 'center' }}>
                            <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', height: '82vh', borderRadius: '5px', display: 'flex', flexDirection: 'row'}}>
                                {loading ? (
                                    // Render loading indicator while loading
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '50%', color: colors.secondary }}>
                                        <div style={{marginBottom: '15px'}}>
                                            <BounceLoader color={colors.secondary} speedMultiplier={2}  />
                                        </div>
                                        <div>
                                            {/*<Typography variant="body1" sx={{fontFamily: 'Poppins, sans-serif'}}> Loading Contents... </Typography>*/}
                                        </div>
                                    </div>
                                ) : (
                                    <>   
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
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    placeholder='Search here...'
                                                    InputProps={{
                                                        startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchRounded sx={{fontSize: '2rem', color: colors.primary}}/>
                                                        </InputAdornment>
                                                        ),
                                                    }}
                                                    sx={{
                                                        
                                                        '& .MuiOutlinedInput-root': {
                                                            height: '35px',
                                                            margin: '15px',
                                                            width: '745px',
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
                                                                                color: item.itemPreQuantity <= 10 ? colors.accentOrange : colors.secondary,
                                                                                fontWeight: item.itemPreQuantity <= 10 ? '700' : 'normal',
                                                                                fontFamily: 'Poppins, sans-serif'
                                                                            }} title={item.itemName}>
                                                                                Qty: {item.itemPreQuantity}
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
                                </>
                                )
                                }   
                                 
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
                                                            <StyledTableCell align="right"><DeleteRounded sx={{marginRight: '5px', fontSize: '1.3rem'}}/></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                   
                                                    {loading ? (
                                                        <TableBody>
                                                            <TableRow>
                                                            <StyledTableCell align="center" colSpan={4} className="noborderbottom">
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '30% auto', width: '100%', color: colors.secondary }}>
                                                            <div style={{marginBottom: '15px'}}>
                                                                <BounceLoader color={colors.secondary} speedMultiplier={2}  />
                                                            </div>
                                                        </div>
                                                        </StyledTableCell>
                                                        </TableRow>
                                                        </TableBody>
                                                    ) : (
                                                    <TableBody>
                                                        {tableItems.map((tableItem, index) => (
                                                            <TableRow key={index}>
                                                                <StyledTableCell>{tableItem.itemName}</StyledTableCell>
                                                                <StyledTableCell align="right">{tableItem.itemQuantity}</StyledTableCell>
                                                                <StyledTableCell align="right">₱{tableItem.itemPrice}</StyledTableCell>
                                                                <StyledTableCell align="right">
                                                                    <IconButton onClick={() => handleDeleteItem(index)}>
                                                                        <DeleteRounded sx={{fontSize: '1.3rem', color:colors.secondary}}/>
                                                                    </IconButton>
                                                                </StyledTableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                    )}
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <div>
                                            {/*<div style={{ margin: '15px', display: 'flex',  justifyContent: 'space-between'}}>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    Discount: 
                                                </Typography>
                                                <Typography variant='h6' sx={{ color: colors.secondary, fontFamily: 'Poppins, sans-derif'}}>
                                                    ₱ 0.00 
                                                </Typography>
                                            </div>*/}
                                            <div style={{display: 'flex', width: '100%'}}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handleCancelBill()}
                                                    disabled={cancelButton}
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
                                            </div>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={handleOpenDialog}
                                                value={paymentAmount}
                                                onChange={handleAmountChange}
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
                                            <Dialog open={openDialog} onClose={handleCloseDialog} >
                                                <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Enter Payment</DialogTitle>
                                                <DialogContent sx={{width: '500px'}}>
                                                    <form onSubmit={(e)=> handleAddTransaction(e)}>
                                                        <Typography variant="body1" color="inherit" sx={{fontFamily: 'Poppins, sans-serif', marginBottom: '15px'}}>Amount to be paid: {totalAmount.toFixed(2)} </Typography>
                                                        <TextFieldInputNumberPaymentWidget title={"Enter the amount paid:"} name={"payment"} onChange={handleAmountChange}/>
                                                        <Typography variant="body1" color="inherit" sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>Change: ₱{changeAmount.toFixed(2)} </Typography>
                                                        <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                                                            <ButtonWidget onClick={handleCloseDialog} label={"Cancel"} />
                                                            <ButtonWidget type={"submit"} label={addingProduct ? <CircularProgress size={23} color="inherit" /> : "Pay"} disabled={isButtonDisabled} />
                                                        </DialogActions>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
        </div>
    );
}