import React, { useState } from 'react';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';

const ReusableMenu = ({ menuItems, menuIcon, menuName, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="flex">
      <Tooltip title={menuName}>
        <IconButton color="inherit" onClick={handleClick}>
          {menuIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            component={Link}
            to={item.to}
            onClick={item.onClick ? item.onClick : handleClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
        {children}
      </Menu>
    </Box>
  );
};

export default ReusableMenu;
