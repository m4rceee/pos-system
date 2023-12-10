import { 
    AccountCircleRounded,
    MenuRounded,
    SearchRounded 
} from "@mui/icons-material";

import { 
    TextField,
    InputAdornment,
    Stack,
    Typography
} from "@mui/material";

export default function Header() {

    return(
        <>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded sx={{color: '#D1D5DB'}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#D1D5DB',
                                borderWidth: '2px'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#D1D5DB',
                            },
                        },
                        '& input': {
                            color: '#D1D5DB',
                        },
                    }}
                    />
                    <AccountCircleRounded style={{ cursor: 'pointer', color: '#D1D5DB', fontSize: '2rem' }} />
                    <MenuRounded style={{ cursor: 'pointer', color: '#D1D5DB', fontSize: '2rem' }} />
                </Stack>
        </>
        
    );
}
