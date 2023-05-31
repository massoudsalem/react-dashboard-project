import {
  Logout as LogoutIcon,
  MoreVert as MoreIcon,
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    localStorage.clear();
    window.location.href = '/logout';
  };
  return (
    <Box className="flex md:hidden">
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClick={handleClose}>
        <MenuItem component={Link} to="/" onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/" onClick={handleClose}>
          <ListItemIcon>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          Notifications
        </MenuItem>
        <MenuItem component={Link} to="/" onClick={handleClose}>
          <ListItemIcon>
            <Badge badgeContent={4} color="info">
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </ListItemIcon>
          Notifications
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MoreMenu;
