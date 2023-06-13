import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  Toolbar,
  Typography,
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
  Close,
} from '@mui/icons-material';
import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoreMenu, ReusableMenu, AutoCompleteSearch } from '..';
import { useColorMode } from '../../utils/ToggleColorMode';
import Sidebar from '../Sidebar/Sidebar';
import { logout } from '../../services/auth';

const notificationsMockList = [
  {
    id: 1,
    title: 'New order has been received',
    date: '2021-09-01T12:00:00.000Z',
    to: '/reports',
    read: false,
  },
  {
    id: 2,
    title: 'New customer is registered',
    date: '2021-09-01T12:00:00.000Z',
    to: '/customers',
    read: false,
  },
  {
    id: 3,
    title: 'Project has been approved',
    date: '2021-09-01T12:00:00.000Z',
    to: '/reports',
    read: true,
  },
  {
    id: 4,
    title: 'New feature has been added',
    date: '2021-09-01T12:00:00.000Z',
    to: '/reports',
    read: true,
  },
];

const productsMockList = [
  {
    id: 1,
    title: 'Nike Air Force',
    price: 268,
  },
  {
    id: 2,
    title: 'Iphone 12 Pro Max',
    price: 1300,
  },
  {
    id: 3,
    title: 'AMD Ryzen 7 3700X',
    price: 500,
  },
  {
    id: 4,
    title: 'Vintage Bag',
    price: 1200,
  },
];

const NavbarIcons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('token');
  const [notifications, setNotifications] = React.useState(
    notificationsMockList,
  );
  const [products, setProducts] = React.useState(productsMockList);
  return (
    <Box className="hidden items-center gap-4 md:flex">
      {loggedIn ? (
        <>
          <ReusableMenu
            menuName={`Cart (${products.length})`}
            menuIcon={
              <Badge badgeContent={products.length} color="info">
                <ShoppingCartIcon />
              </Badge>
            }
          >
            {products.map((product, idx) => (
              <>
                {!!idx && <Divider />}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                  }}
                  key={product.id}
                >
                  <ShoppingCartIcon />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {product.title}
                    <Typography variant="caption" className="ml-auto">
                      Price: {product.price}$
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    edge="end"
                    color="error"
                    sx={
                      {
                        marginLeft: 'auto',
                      }
                    }
                    onClick={() => {
                      setProducts((prevProducts) =>
                        prevProducts.filter(
                          (prevProduct) => prevProduct.id !== product.id,
                        ),
                      );
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
                <Divider />
              </>
            ))}
            {products.length === 0 ? (
              <MenuItem disabled>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                Your cart is empty
              </MenuItem>
            ) : (
              <Box
                sx={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" className="mx-auto">
                  Total: {products.reduce((acc, curr) => acc + curr.price, 0)}$
                </Typography>
              </Box>
            )}
          </ReusableMenu>

          <ReusableMenu
            menuName={`Notifications (${notifications.length})`}
            menuIcon={
              <Badge
                badgeContent={
                  notifications.filter((notification) => !notification.read)
                    .length
                }
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            }
          >
            {notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                disabled={notification.read}
                onClick={() => {
                  navigate(notification.to);
                  setNotifications((prevNotifications) =>
                    prevNotifications.map((prevNotification) =>
                      prevNotification.id === notification.id
                        ? { ...prevNotification, read: true }
                        : prevNotification,
                    ),
                  );
                }}
              >
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {notification.title}
                  <Typography variant="caption" className="ml-auto">
                    {notification.date}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </ReusableMenu>
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
          <AutoCompleteSearch />
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
