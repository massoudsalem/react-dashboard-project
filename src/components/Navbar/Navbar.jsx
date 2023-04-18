import { AppBar, Badge, Box, IconButton, Toolbar, useTheme } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon, Notifications as NotificationsIcon, AccountCircle as AccountCircleIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import React from 'react';
import { Search, MoreMenu } from '..';

const NavbarIcons = ({ theme }) => (
  <Box
    className="ml-auto gap-4 hidden md:flex items-center"
  >
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
    >
      <Badge badgeContent={4} color="info">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
    >
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
    >
      <AccountCircleIcon />
    </IconButton>
  </Box>
);

const Navbar = () => {
  console.log('Navbar');
  const theme = useTheme();
  return (
    <Box>
      <AppBar className="py-2">
        <Toolbar>
          <Box className="mr-auto flex items-center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="mr-4"
            >
              <MenuIcon />
            </IconButton>
            <Search />
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <NavbarIcons />
          <MoreMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
