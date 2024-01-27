import React, { useState, useEffect, useRef } from 'react';
import "./styles.css"
import 'typeface-poppins';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/sidebar';
import Header from './common/header';
import { styled } from '@mui/system';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import Receipt from './receipt-transactions-home';
import logo3 from './svg pics/3.svg';

import { firestore } from './firebaseConfig';
import { limit, query, orderBy, addDoc, getDoc, getDocs, collection, doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';

import { 
    Grid, 
    Container, 
    Typography,
    Stack,
    Card,
    CardContent,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Breadcrumbs,
    Link,
    fabClasses,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    InputAdornment,
    TextField,
    CircularProgress,
} from '@mui/material';

import {
    Inventory2Rounded,
    NavigateNextRounded,
    PrintRounded,
    SearchRounded,
} from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';

import ButtonWidget from './widgets/button';
import { BounceLoader } from 'react-spinners';
import ContentTitleWidget from './widgets/content-title';
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

export default function TransactionsHome() {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

////////////////////////////////////////////////////////////////////////////////////////
// GET PRODUCT CATEGORY FROM THE DATABSE   
    const [transaction, setTransactions] = useState([]);

    useEffect(() => {
        const getTransactionData = onSnapshot(collection(firestore, 'Transactions'), (snapshot) => {
          const transactionArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
      
          transactionArray.sort((a, b) => new Date(b.dateTransaction) - new Date(a.dateTransaction));
      
          setTransactions(transactionArray);
          setLoading(false);
        });
      
        return () => getTransactionData();
      }, []);


    const handleReportsHomePage = (event) => {
        event.preventDefault();
        console.info('You clicked a Reports Home Page.');
        navigate('/reports-home');
    }

    const handleTransactionsPage = (event) => {
        event.preventDefault();
        console.info('You clicked a Transactions Report Page.');
        navigate('/transactions-home');
    }

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

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const componentRef = useRef();

  const handleSearchClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

    const handleCloseDialog = () => {
        setSelectedTransaction(null);
        setIsDialogOpen(false);
    };

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingStatus, setEditingStatus] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);

    const [editValidDialogOpen, setEditValidDialogOpen] = useState(false);
    const [editingValidStatus, setEditingValidStatus] = useState(false);
    const [selectedValidTransactionId, setSelectedValidTransactionId] = useState(null);

    const handleClose = () => {
        setEditDialogOpen(false);
        setEditValidDialogOpen(false);
    };

    
    const handleVoidClick = (transactionId) => {
        setSelectedTransactionId(transactionId);
        setEditDialogOpen(true);
    };
    const handleEditDialogClose = () => {
        setSelectedTransactionId(null);
        setEditDialogOpen(false);
        };
    const handleUpdateTransaction = async () => {
        setEditingStatus(true);
    if (selectedTransactionId) {
        try {
        const categoryRef = doc(firestore, 'Transactions', selectedTransactionId);

        await updateDoc(categoryRef, { transactionStatus: 'Void' });

        toast.success('Transaction Status updated successfully!', {
            position: 'top-right',
            autoClose: 3000, // Auto close the notification after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        console.log('Transaction Status successfully updated!');
        } catch (error) {
        console.error('Error updating Transaction Status:', error);
        } finally {
            setEditingStatus(false);
            handleEditDialogClose();
        }
    }};

    // VALID TRANSACTION VALID

    const handleValidClick = (transactionId) => {
        setSelectedValidTransactionId(transactionId);
        setEditValidDialogOpen(true);
    };
    const handleEditDialogCloseValid = () => {
        setSelectedValidTransactionId(null);
        setEditValidDialogOpen(false);
    };
    const handleUpdateValidTransaction = async () => {
        setEditingValidStatus(true);
    if (selectedValidTransactionId) {
        try {
        const categoryRef = doc(firestore, 'Transactions', selectedValidTransactionId);

        await updateDoc(categoryRef, { transactionStatus: 'Valid' });

        toast.success('Transaction Status updated successfully!', {
            position: 'top-right',
            autoClose: 3000, // Auto close the notification after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        console.log('Transaction Status successfully updated!');
        } catch (error) {
        console.error('Error updating Transaction Status:', error);
        } finally {
            setEditingValidStatus(false);
            handleEditDialogCloseValid();
        }
    }};

  const handlePrint = () => {
    const transactionData = selectedTransaction;

        if (transactionData) {
            // Create a new window for printing
            const printWindow = window.open('', '_blank');

            // Write the HTML content to the new window
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="styles.css">
                    <style>
                        body {font-family: Arial, sans-serif; margin: 0; padding: 0;}
                        .container {width: auto; margin: auto; box-sizing: border-box;}
                        .header {text-align: center; font-size: 14px; font-weight: bold; margin-bottom: 8px;}
                        .offReceipt {text-align: center; font-size: 12px; font-weight: bold;}
                        .content {font-size: 9px;}
                        .receiptTable {width: 100%;}
                        .receiptTable td {font-size: 14px;}
                        .tableQty {width: 10%;}
                        .tableDesc {width: 65%;}
                        .tableAmount {width: 25%; text-align: right;}
                        .receiptDivider {display: block; border-bottom: 1px solid #000; margin: 5px 0; }
                        .last {margin-bottom: 0;}
                        .receiptDetails {font-size: 12px;}
                        .receiptTable.transaction p {margin: 5px 0;}
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
                                ${transactionData.productBreakdown.map((product, index) => `
                                    <tr>
                                        <td>${product.itemQuantity}</td>
                                        <td>${product.itemName} @${product.itemPrice}</td>
                                        <td class="tableAmount">₱${(product.itemQuantity * product.itemPrice).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <span class="receiptDivider last"></span>

                        <div class="receiptDetails">
                            <table class="receiptTable transaction">
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><p>Amount Due:</p></td>
                                    <td>₱${transactionData.totalAmount.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><p>Cash:</p></td>
                                    <td>₱${parseInt(transactionData.totalCash, 10).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><p>Change:</p></td>
                                    <td>₱${transactionData.totalChange.toFixed(2)}</td>
                                </tr>
                            </table>
                            <span class="receiptDivider"></span>
                            <p>Transaction Date: ${transactionData.dateTransaction}</p>
                            <p>Reference ID: ${transactionData.referenceId}</p>
                        </div>
                    </div>
                </body>
                </html>
            `);

            // Close the document stream
            printWindow.document.close();

            // Trigger the print dialog
            printWindow.print();
        }
    };

  const columns = [
    { field: 'dateTransaction', headerName: 'Date & Time', width: 250 },
    { field: 'referenceId', headerName: 'Reference', width: 350 },
    { field: 'totalAmount', headerName: 'Amount', width: 200 },
    { field: 'transactionStatus', headerName: 'Status', width: 250 },
    {
      field: 'transactionActions',
      headerName: 'Actions',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleValidClick((params.row.id))} disabled={params.row.transactionStatus === "Valid" ? true : false}>
            <CheckIcon sx={{ color: colors.primary }} />
          </IconButton>
          <IconButton onClick={() => handleVoidClick((params.row.id))} disabled={params.row.transactionStatus === "Void" ? true : false}>
            <BlockIcon sx={{ color: colors.primary }} />
          </IconButton>
          <IconButton onClick={() => handleSearchClick(params.row)}>
            <PrintRounded sx={{ color: colors.primary }} />
          </IconButton>
        </>
      ),
    },
  ];

    return(
        <>
            <div style={{ display: 'flex', marginLeft: '5rem' }}>
                <SideBar />
                    <Container maxWidth="xl" style={{ paddingTop: '20px' }}>
                        <Grid 
                            container 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                        }}>
                            <Grid item xs={4}>
                                        <Breadcrumbs
                                            separator={<NavigateNextRounded fontSize="medium" sx={{ color: colors.secondary }} />}
                                            aria-label="breadcrumb"
                                        >
                                            <Link 
                                                underline="hover" 
                                                key="1" 
                                                onClick={handleReportsHomePage}
                                                sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary, cursor: 'pointer' }}
                                                >
                                                Reports
                                            </Link>,
                                            <Link
                                                underline="hover"
                                                key="2"
                                                onClick={handleTransactionsPage}
                                                sx={{fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary, cursor: 'pointer' }}
                                                >
                                                Transactions
                                            </Link>
                                        </Breadcrumbs>
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
                        <Card className='mt-8' style={{backgroundColor: '#27273b', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                            <CardContent style={{ padding: '20px'}}>
                            {loading ? (
                                // Render loading indicator while loading
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 'auto', width: '50%', color: colors.secondary }}>
                                    <div style={{marginTop: '25px', marginBottom: '15px'}}>
                                        <BounceLoader color={colors.secondary} speedMultiplier={2}  />
                                    </div>
                                    <div>
                                        <Typography variant="body1" sx={{fontFamily: 'Poppins, sans-serif'}}> Loading Transactions... </Typography>
                                    </div>
                                </div>
                            ) : (
                                <>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div>
                                        <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                            Please review the transactions report below.
                                        </Typography>
                                    </div>
                                    <div>
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
                                                height: '45px',
                                                width: '500px',
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
                                    </div>
                                    
                                </div>
                                <Grid container spacing={2} style={{ paddingTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={12}>
                                        <div style={{ height: 'auto', width: '100%' }}>
                                            <DataGrid
                                                rows={transaction}
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
                                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                                    <DialogContent>
                                        <Receipt transactionData={selectedTransaction} ref={componentRef} />
                                    </DialogContent>
                                    <DialogActions>
                                        <ButtonWidget onClick={handleCloseDialog} label={'Cancel'} />
                                        <ButtonWidget onClick={handlePrint} label={'Print this out!'} />
                                    </DialogActions>
                                </Dialog>

                                <Dialog open={editDialogOpen} onClose={handleClose}>
                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Void this Transaction</DialogTitle>
                                    <DialogContent sx={{width: '500px'}}>
                                        <ContentTitleWidget label={"Are you sure you want to Void this Transaction?"} />
                                        <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                                            <ButtonWidget onClick={handleClose} label={"Cancel"} />
                                            <ButtonWidget onClick={handleUpdateTransaction} label={editingStatus ? <CircularProgress size={23} color="inherit" /> : "Void"} />
                                        </DialogActions>
                                        </DialogContent>
                                </Dialog>

                                <Dialog open={editValidDialogOpen} onClose={handleClose}>
                                    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>Valid this Transaction</DialogTitle>
                                    <DialogContent sx={{width: '500px'}}>
                                        <ContentTitleWidget label={"Are you sure you want to Valid this Transaction?"} />
                                        <DialogActions sx={{marginTop: '20px', marginRight: '-8px'}}>
                                            <ButtonWidget onClick={handleClose} label={"Cancel"} />
                                            <ButtonWidget onClick={handleUpdateValidTransaction} label={editingValidStatus ? <CircularProgress size={23} color="inherit" /> : "Valid"} />
                                        </DialogActions>
                                        </DialogContent>
                                </Dialog>
                            </>
                            )}
                        </CardContent> 
                        </Card>
                    </Container>
                </div>
        </>
    ); 
}