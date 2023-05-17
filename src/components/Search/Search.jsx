import { SearchRounded } from '@mui/icons-material';
import { alpha, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const Search = () => (
  <TextField
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: (theme) =>
            alpha(theme.palette.primary.contrastText, 0.5),
        },
        '&:hover fieldset': {
          borderColor: 'primary.contrastText',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.contrastText',
        },
      },
    }}
    inputProps={{ className: 'py-2' }}
    InputProps={{
      startAdornment: (
        <InputAdornment sx={{ color: 'primary.contrastText' }} position="start">
          <SearchRounded />
        </InputAdornment>
      ),
    }}
    variant="outlined"
    //
    size="small"
  />
);

export default Search;
