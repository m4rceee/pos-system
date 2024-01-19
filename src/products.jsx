import React, { useState, useEffect } from 'react';
import "./styles.css"
import 'typeface-poppins';
import SideBar from './common/sidebar';
import Header from './common/header';
import { styled } from '@mui/system';

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
} from '@mui/material';

import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

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

export default function Products() {

    const StyledTableCell = styled(TableCell)({
        fontFamily: 'Poppins, sans-serif',
        color: colors.secondary,
      });

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

    return (
        <>
            <div style={{ display: 'flex', marginLeft: '5rem' }}>
                <SideBar/> 
                <div style={{ marginLeft: '10px', marginRight: '5px', width: '100%'}}>
                    <Container maxWidth="xl" style={{ paddingTop: '20px' }}>
                        <Grid 
                                container
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Grid item xs={4} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                                            Records<span style={{marginLeft: '0.5rem', marginRight: '0.5rem'}}>&raquo;</span>Products
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
                            <Card className='mt-8' style={{backgroundColor: '#27273b', height: '82vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'}}>
                                <CardContent style={{ padding: '20px'}}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Typography variant='h5' sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300', color: colors.secondary }}>
                                            Please review the top products below.
                                        </Typography>
                                        <div sx={{ textAlign: 'center', marginTop: '16px' }}>
                                            <IconButton
                                                sx={{
                                                    backgroundColor: '#13131c',
                                                    borderRadius: '8px',
                                                    padding: '8px',
                                                    '&:hover': {
                                                        backgroundColor: colors.secondary,
                                                    },
                                                }}>
                                                <Inventory2RoundedIcon
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
                                    </div>

                                <Grid container spacing={2} style={{ paddingTop: '15px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Grid item xs={6}>
                                        <Card style={{ padding: '10px', background: '#13131c', height: '68vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
                                            <CardContent>
                                                <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                                    This Month
                                                </Typography>
                                                <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary }}>
                                                    January 2024
                                                </Typography>
                                                <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Rank</StyledTableCell>
                                                                <StyledTableCell>Product Name</StyledTableCell>
                                                                <StyledTableCell align="right">Units Sold</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid #EBA63F', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ color: colors.accentYellow, fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>1</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell sx={{color: colors.accentYellow, fontWeight: 'bold'}}>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>2</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>3</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>4</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>5</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card style={{ padding: '10px', background: '#13131c', height: '68vh', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)', borderRadius: '20px' }}>
                                            <CardContent>
                                                <Typography variant="h5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', color: colors.secondary }}>
                                                    Past Month
                                                </Typography>
                                                <Typography variant="body1" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary }}>
                                                    December 2023
                                                </Typography>
                                                <TableContainer style={{ marginTop: '15px', maxHeight: '50vh', overflowY: 'auto' }}>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Rank</StyledTableCell>
                                                                <StyledTableCell>Product Name</StyledTableCell>
                                                                <StyledTableCell align="right">Units Sold</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid #EBA63F', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ color: colors.accentYellow, fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>1</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell sx={{color: colors.accentYellow, fontWeight: 'bold'}}>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>2</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ border: '2px solid white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>3</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>4</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: colors.secondary }}>
                                                                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 'bold' }}>5</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <StyledTableCell>sample</StyledTableCell>
                                                                    <StyledTableCell align="right">sample</StyledTableCell>
                                                                </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>
                                </CardContent>
                            </Card>
                    </Container>
                </div>
            </div>
        </>
    );
}