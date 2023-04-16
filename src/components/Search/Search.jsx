import { SearchRounded } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

const Search = () => {
  console.log('sadasd');
  return (
    <TextField
      id="input-with-icon-textfield"
      slotProps={{
        input: { className: 'p-18' },
      }}
      InputProps={{
        className: '& input p-10',
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      className="text-white"
    />
  );
};

export default Search;
