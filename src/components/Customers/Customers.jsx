import { Box, CircularProgress, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React from 'react';
import DataTable from '../DataTable/DataTable';
import { useGetCustomersQuery } from '../../services/FakeApi';

const tableHeadings = [
  {
    name: 'Name',
    id: 'name',
  },
  {
    name: 'Phone',
    id: 'phone',
  },
  {
    name: 'Email',
    id: 'email',
  },
  {
    name: 'Birthday',
    id: 'birthday',
  },
  {
    name: 'Actions',
    id: 'actions',
  },
];
const Actions = () => (
  <Box className="flex">
    <IconButton>
      <EditIcon />
    </IconButton>
    <IconButton color="error">
      <DeleteIcon />
    </IconButton>
  </Box>
);
const mockData = [
  {
    id: 1,
    name: 'John Doe',
    phone: '1234567890',
    email: 'email@email.com',
    birthday: '22-02-1999',
    actions: <Actions />,
  },
  {
    id: 2,
    name: 'John Doe',
    phone: '1234567890',
    email: 'email@email.com',
    birthday: '22-02-1999',
    actions: <Actions />,
  },
];

const Customers = () => {
  const { data: customersData, isLoading, error } = useGetCustomersQuery();
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <h1> Sorry, Something went wrong.. </h1>
    );
  }
  const rows = customersData.users.map((customer) => ({
    id: customer.id,
    name: `${customer.firstName} ${customer.lastName}`,
    phone: customer.phone,
    email: customer.email,
    birthday: customer.birthDate,
    actions: <Actions />,
  }));

  return (
    <DataTable columns={tableHeadings} rows={rows} />
  );
};

export default Customers;
