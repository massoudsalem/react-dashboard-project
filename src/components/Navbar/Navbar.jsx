import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Brightness4,
  Brightness7,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import React, { useLayoutEffect } from 'react';
import { Search, MoreMenu } from '..';
import { useColorMode } from '../../utils/ToggleColorMode';
import Sidebar from '../Sidebar/Sidebar';

const NavbarIcons = () => (
  <Box className="hidden items-center gap-4 md:flex">
    <IconButton size="large" edge="start" color="inherit">
      <Badge badgeContent={4} color="info">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    <IconButton size="large" edge="start" color="inherit">
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton size="large" edge="start" color="inherit">
      <AccountCircleIcon />
    </IconButton>
  </Box>
);

const Navbar = ({ changeWidth, openState }) => {
  //TODO: add Transition for menu icon
  const { drawerOpen, setDrawerOpen } = openState;
  const { openWidth, closedWidth } = changeWidth;
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const smScreen = useMediaQuery('(max-width: 768px)');
  useLayoutEffect(() => {
    if (smScreen) {
      setDrawerOpen(false);
    }
  }, [smScreen, setDrawerOpen]);
  return (
    <>
      <AppBar className="py-2">
        <Toolbar
          sx={{
            marginLeft: `${drawerOpen ? openWidth : closedWidth}px`,
          }}
          className="transition-all duration-500"
        >
          <Box className="mr-auto flex items-center">
            {!smScreen && <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className="mr-4"
              onClick={() => setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen)}
            >
              {drawerOpen ? <MenuIcon /> : <ArrowForwardIcon />}
            </IconButton>}
            <Search />
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            className="mx-4"
            onClick={toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <NavbarIcons />
          <MoreMenu />
        </Toolbar>
      </AppBar>
      <Sidebar open={drawerOpen} changeWidth={{ closedWidth, openWidth }} />
    </>
  );
};

export default Navbar;
