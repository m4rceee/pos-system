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
                            <SearchRounded sx={{color: '#F5F5DC'}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#F5F5DC',
                                borderWidth: '2px'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#F5F5DC',
                            },
                        },
                        '& input': {
                            color: '#F5F5DC',
                        },
                    }}
                    />
                    <AccountCircleRounded style={{ cursor: 'pointer', color: '#F5F5DC', fontSize: '2rem' }} />
                    <MenuRounded style={{ cursor: 'pointer', color: '#F5F5DC', fontSize: '2rem' }} />
                </Stack>
        </>
        
    );
}
