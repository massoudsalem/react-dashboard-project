import { Autocomplete, Box, ListItemIcon, MenuItem, Popper } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Add,
  BarChart,
  Dashboard,
  People,
  ShoppingCart,
} from '@mui/icons-material';

import Search from '../Search/Search';

const preOptions = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <Dashboard />,
    category: 'Pages',
  },
  {
    label: 'Products',
    to: '/products',
    icon: <ShoppingCart />,
    category: 'Pages',
  },
  { label: 'Customers', to: '/customers', icon: <People />, category: 'Pages' },
  { label: 'Reports', to: '/reports', icon: <BarChart />, category: 'Pages' },
  {
    label: 'Create Product',
    to: '/create-product',
    icon: <Add />,
    category: 'Pages',
  },
];

const CustomerPopper = ({ children, ...props }) => {
  console.log(props);
  return (
    <Popper {...props} placement="bottom-start" 
    sx={{
      minWidth: '250px !important',
    }}
    >
      {children}
    </Popper>
  );
};

const AutoCompleteSearch = ({ propOptions = [] }) => {
  const options = [...preOptions, ...propOptions];
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const navigate = useNavigate();

  return (
    <Box className="flex w-full items-center gap-2">
      <Autocomplete
        key={selected?.label}
        className="max-w-[300px] flex-grow"
        id="combo-box-demo"
        options={options}
        popupIcon={null}
        clearIcon={null}
        value={selected}
        PopperComponent={CustomerPopper}
        onChange={(e, newValue) => {
          setSelected(newValue);
          if (newValue) {
            navigate(newValue.to);
          }
        }}
        inputValue={value}
        open={!!value && open}
        onInputChange={(event, newValue) => {
          setValue(newValue.trimStart());
          setOpen(!!newValue);
        }}
        onClose={() => {
          setOpen(false);
          setValue('');
          setSelected(null);
        }}
        filterOptions={(o, state) =>
          o
            .filter((option) =>
              option.label
                .toLowerCase()
                .includes(state.inputValue.toLowerCase()),
            )
            .sort(() => {
              return 0.5 - Math.random();
            })
            .splice(0, 10)
            .sort((a, b) => {
              return a.category >= b.category ? -1 : 1;
            })
        }
        sx={{
          '& .MuiAutocomplete-inputRoot': {
            paddingRight: '0 !important',
          },
        }}
        groupBy={(option) => option.category}
        renderInput={(params) => <Search {...params} placeholder="Search" />}
        renderOption={(props, option) => (
          <MenuItem
            component={Link}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigate(option.to);
              }
            }}
            to={option.to}
            {...props}
          >
            <ListItemIcon
              sx={{
                width: '24px !important',
                height: '24px !important',
                objectFit: 'contain !important',
                overflow: 'hidden !important',
              }}
            >
              {option.icon}
            </ListItemIcon>
            {option.label}
          </MenuItem>
        )}
        openOnFocus={false}
      />
    </Box>
  );
};

export default AutoCompleteSearch;
