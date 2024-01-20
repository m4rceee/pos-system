import React from 'react';
import { Button } from '@mui/material';

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

const ButtonWidget = ({ onClick, label, type }) => {
  return (
    <Button 
        type = {type}
        onClick = {onClick} 
        sx={{
            textTransform: 'none',
            color: colors.secondary,
            backgroundColor: '#27273b',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                backgroundColor: 'none',
                color: colors.fontColor,
            },
        }}>{label}
    </Button>
  );
};

export default ButtonWidget;
