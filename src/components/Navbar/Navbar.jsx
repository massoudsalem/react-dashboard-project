import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import React from 'react';
import { Search } from '..';

const Navbar = () => {
  console.log('Navbar');
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Search />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
