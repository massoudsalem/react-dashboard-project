import {
  Autocomplete,
  Box,
  CircularProgress,
  ListItemIcon,
  MenuItem,
  Popper,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Add,
  BarChart,
  Dashboard,
  People,
  ShoppingCart,
} from '@mui/icons-material';
import {
  useSearchProductsQuery,
  useSearchCustomersQuery,
} from '../../services/FakeApi';
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
  return (
    <Popper
      {...props}
      placement="bottom-start"
      sx={{
        minWidth: '250px !important',
      }}
    >
      {children}
    </Popper>
  );
};

const AutoCompleteSearch = ({ propOptions = [] }) => {
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [debounceSearch, setDebounceSearch] = React.useState(true);
  const navigate = useNavigate();

  const { data: products, isLoading: productSearchLoading } =
    useSearchProductsQuery(value, {
      skip: !debounceSearch,
    });

  const { data: customers, isLoading: CustomersSearchLoading } =
    useSearchCustomersQuery(value, {
      skip: !debounceSearch,
    });

  const loading =
    !debounceSearch || productSearchLoading || CustomersSearchLoading;

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(true);
    }, 700);
    return () => {
      setDebounceSearch(false);
      clearTimeout(timeout);
    };
  }, [value]);

  const customersOptions = useMemo(
    () =>
      customers?.users?.map((customer) => ({
        label: `${customer.firstName} ${customer.lastName}`,
        to: `/customer/${customer.id}`,
        icon: (
          <img
            src={customer.image}
            alt={customer.firstName}
            width="24px"
            height="24px"
          />
        ),
        category: 'Customers',
      })) ?? [],
    [customers],
  );
  const productsOptions = useMemo(
    () =>
      products?.products?.map((product) => ({
        label: product.title,
        to: `/product/${product.id}`,
        icon: (
          <img
            src={product.thumbnail}
            alt={product.title}
            width="24px"
            height="24px"
          />
        ),
        category: 'Products',
      })) ?? [],
    [products],
  );

  React.useEffect(() => {
    if (loading) {
      setOptions([]);
    } else {
      setOptions([
        ...preOptions,
        ...customersOptions,
        ...productsOptions,
        ...propOptions,
      ]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
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
        loading={loading}
        loadingText={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CircularProgress size={20} />
            <span>Searching...</span>
          </Box>
        }
        noOptionsText="No results found"
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
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.label}
          </MenuItem>
        )}
        openOnFocus={false}
      />
    </Box>
  );
};

export default AutoCompleteSearch;
