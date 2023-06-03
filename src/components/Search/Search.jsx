import { SearchRounded } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const Search = ({
  className = '',
  onKeyDown = () => {},
  onChange = () => {},
  color = 'primary.contrastText',
}) => (
  <TextField
    className={className}
    onKeyDown={onKeyDown}
    onChange={onChange}
    sx={{
      '& .MuiOutlinedInput-root': {
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
    inputProps={{ className: 'py-2' }}
    InputProps={{
      startAdornment: (
        <InputAdornment sx={{ color }} position="start">
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
