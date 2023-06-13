import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
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
  Logout,
} from '@mui/icons-material';
import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoreMenu, ReusableMenu, AutoCompleteSearch } from '..';
import { useColorMode } from '../../utils/ToggleColorMode';
import Sidebar from '../Sidebar/Sidebar';
import { logout } from '../../services/auth';
import {
  useGetProductsQuery,
  useGetCustomersQuery,
} from '../../services/FakeApi';

const NavbarIcons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('token');
  return (
    <Box className="hidden items-center gap-4 md:flex">
      {loggedIn ? (
        <>
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
          <ReusableMenu
            menuItems={[
              {
                to: '/profile',
                icon: <AccountCircleIcon />,
                label: 'Profile',
              },
            ]}
            menuIcon={<AccountCircleIcon />}
            menuName="Account settings"
          >
            <Divider />
            <MenuItem
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </ReusableMenu>
        </>
      ) : (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={() => navigate('/login')}
        >
          <AccountCircleIcon />
        </IconButton>
      )}
    </Box>
  );
};
const Navbar = ({ changeWidth, openState }) => {
  //TODO: add Transition for menu icon
  const { drawerOpen, setDrawerOpen } = openState;
  const { openWidth, closedWidth } = changeWidth;
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const smScreen = useMediaQuery('(max-width: 768px)');
  const { data: customers } = useGetCustomersQuery();
  const { data: products } = useGetProductsQuery();
  const customersOptions =
    customers?.users?.map((customer) => ({
      label: `${customer.firstName} ${customer.lastName}`,
      to: `/customer/${customer.id}`,
      icon: (
        <img
          className="h-6 w-6 object-contain"
          src={customer.image}
          alt={customer.firstName}
        />
      ),
      category: 'Customers',
    })) ?? [];
  const productsOptions =
    products?.products?.map((product) => ({
      label: product.title,
      to: `/product/${product.id}`,
      icon: (
        <img
          className="h-6 w-6 object-contain"
          src={product.thumbnail}
          alt={product.title}
        />
      ),
      category: 'Products',
    })) ?? [];

  useLayoutEffect(() => {
    if (smScreen) {
      setDrawerOpen(false);
    }
  }, [smScreen, setDrawerOpen]);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.primary.main,
        }}
        position="sticky"
        className="py-2"
      >
        <Toolbar
          sx={{
            marginLeft: `${drawerOpen ? openWidth : closedWidth}px`,
          }}
          className="transition-all duration-500"
        >
          <Box className="mr-auto flex items-center">
            {!smScreen && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className="mr-4"
                onClick={() =>
                  setDrawerOpen((prevDrawerOpen) => !prevDrawerOpen)
                }
              >
                {drawerOpen ? <MenuIcon /> : <ArrowForwardIcon />}
              </IconButton>
            )}
          </Box>
          <AutoCompleteSearch
            propOptions={productsOptions.concat(customersOptions)}
          />
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
