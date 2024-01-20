import React from 'react';
import { Grid, DialogContentText, TextField } from '@mui/material';

const TextFieldInputWidget = ({ title, name, id, value, onChange }) => {
  return (
    <Grid>
      <DialogContentText sx={{fontFamily: 'Poppins, sans-serif', marginTop: '15px'}}>{title}</DialogContentText>
      <TextField
        name = { name }
        id = { id }
        value = { value }
        onChange = { onChange }
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
    </Grid>
  );
};

export default TextFieldInputWidget;
