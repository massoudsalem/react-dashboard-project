import {
  Logout as LogoutIcon,
  MoreVert as MoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReusableMenu from '../ReusableMenu/ReusableMenu';
import { logout } from '../../services/auth';

const MoreMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('token');

  const list = [
    {
      icon: <AccountCircleIcon />,
      to: '/profile',
      label: 'Profile',
    },
    {
      icon: <NotificationsIcon />,
      to: '/',
      label: 'Notifications',
    },
    {
      icon: <ShoppingCartIcon />,
      to: '/',
      label: 'Cart',
    },
  ];
  return (
    <Box className="flex md:hidden">
      {loggedIn ? (
        <ReusableMenu
          menuIcon={<MoreIcon />}
          menuItems={list}
          menuName="More.."
        >
          <Box>
            <Divider />
            <MenuItem
              component={Link}
              to="/"
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
        </ReusableMenu>
      ) : (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          component={Link}
          to="/login"
        >
          <AccountCircleIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default MoreMenu;
