import React from 'react';
import Header from '../common/header';
import { 
    Grid,
    Typography,
} from '@mui/material';
import DateTimeWidget from './time-date';

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

const HeaderTitleWidget = ({ label }) => {
  return (
    <Grid container style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={8} sx={{ alignItems: 'center'}}>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600', fontSize: '1.5rem', color: colors.secondary }}>
                {label}
            </Typography>
            <DateTimeWidget/>
        </Grid>
        <Grid item xs={4} sx={{ alignItems: 'center' }}>
            <Header />
        </Grid>
    </Grid>
  );
};

export default HeaderTitleWidget;
