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
                            <SearchRounded sx={{color: '#FFFFFF'}}/>
                        </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#FFFFFF',
                                borderWidth: '2px'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#FFFFFF',
                            },
                        },
                        '& input': {
                            color: '#FFFFFF',
                        },
                    }}
                    />
                    <AccountCircleRounded style={{ cursor: 'pointer', color: '#FFFFFF', fontSize: '2rem' }} />
                    <MenuRounded style={{ cursor: 'pointer', color: '#FFFFFF', fontSize: '2rem' }} />
                </Stack>
        </>
        
    );
}
