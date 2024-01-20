import React from 'react';
import { useState, useEffect } from 'react';
import { 
    Typography,
    Stack,
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

const DateTimeWidget = () => {

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

  return (
    <Typography variant='body2' sx={{ fontFamily: 'Poppins, sans-serif', color: colors.secondary, fontWeight: 'light' }}>
        <Stack direction="row">
            <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                {formatDate(currentDateTime)}
            </Typography>
            <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif', marginLeft: '8px', marginRight: '8px'}}>
                ||
            </Typography>
            <Typography component="div" variant='body2' sx={{fontFamily: 'Poppins, sans-serif'}}>
                {formatTime(currentDateTime)}
            </Typography>
        </Stack>
    </Typography>
  );
};

export default DateTimeWidget;
