import { SearchRounded } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const Search = ({ color = 'primary.contrastText', ...props }) => (
  <TextField
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        color,
        '& fieldset': {
          borderColor: color,
        },
        '&:hover fieldset': {
          borderColor: color,
        },
        '&.Mui-focused fieldset': {
          borderColor: color,
        },
      },
    }}
    inputProps={{
      ...props.inputProps,
    }}
    InputProps={{
      ...props.InputProps,
      startAdornment: (
        <InputAdornment sx={{ color }} position="start">
          <SearchRounded />
        </InputAdornment>
      ),
    }}
    variant="outlined"
    size="small"
  />
);

export default Search;
