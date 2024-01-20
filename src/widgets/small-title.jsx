import React from 'react';
import { DialogTitle } from '@mui/material';

const SmallTitleWidget = ({ label }) => {
  return (
    <DialogTitle sx={{fontFamily: 'Poppins, sans-serif'}}>{label}</DialogTitle>
  );
};

export default SmallTitleWidget;
