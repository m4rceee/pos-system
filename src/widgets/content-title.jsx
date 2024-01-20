import React from 'react';
import { DialogContentText } from '@mui/material';

const ContentTitleWidget = ({ label }) => {
  return (
    <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>{label}</DialogContentText>
  );
};

export default ContentTitleWidget;
