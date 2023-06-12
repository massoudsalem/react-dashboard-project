import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { logoIcon, logoIconFull } from '../../assets';

const buttons = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    link: '/dashboard',
  },
  {
    name: 'Products',
    icon: 'shopping_cart',
    link: '/products',
  },
  {
    name: 'Customers',
    icon: 'people',
    link: '/customers',
  },
  {
    name: 'Reports',
    icon: 'analytics',
    link: '/reports',
  },
  {
    name: 'Create Product',
    icon: 'add',
    link: '/create-product',
  },
];

const Sidebar = ({ open, changeWidth }) => {
  const theme = useTheme();
  return (
    <Box component="nav" className="transition-all duration-500">
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? changeWidth.openWidth : changeWidth.closedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? changeWidth.openWidth : changeWidth.closedWidth,
          },
        }}
        className="transition duration-500"
        PaperProps={{ className: 'transition-all duration-500' }}
        ModalProps={{ className: 'transition-all duration-500' }}
      >
        <Box className="flex h-[80px] items-center justify-center py-4">
          <img
            src={open ? logoIconFull : logoIcon}
            alt="logo"
            className={`${theme.palette.mode === 'dark' && 'invert'} my-2`}
            width={open ? '70%' : '24px'}
          />
        </Box>
        <Divider />
        <List>
          {buttons.map(({ name, icon, link }) => (
            <ListItem component={Link} to={link} button key={name}>
              <ListItemIcon className="min-w-[24px]">
                <Icon>{icon}</Icon>
              </ListItemIcon>
              {open && <ListItemText primary={name} className="m-0 ml-8 p-0" />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default Sidebar;
