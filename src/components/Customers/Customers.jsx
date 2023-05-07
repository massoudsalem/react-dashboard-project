import { Box, CircularProgress, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import { useDeleteUserMutation, useGetCustomersQuery } from '../../services/FakeApi';

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

const Actions = ({ id, handleDelete }) => (
  <Box className="flex">
    <IconButton onClick={() => { console.log(id); }}>
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => handleDelete(id)}>
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
  const [customers, setCustomers] = useState(mockData);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
    const response = await deleteUser(id);
    console.log(response.data.isDeleted ? 'Deleted' : 'Not Deleted');
  };

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData.users);
    }
  }, [customersData]);

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
  const rows = customers.map((customer) => ({
    id: customer.id,
    name: `${customer.firstName} ${customer.lastName}`,
    phone: customer.phone,
    email: customer.email,
    birthday: customer.birthDate,
    actions: <Actions id={customer.id} handleDelete={handleDelete} />,
  }));

  return (
    <DataTable columns={tableHeadings} rows={rows} />
  );
};

export default Customers;
