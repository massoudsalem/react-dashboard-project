import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  alpha,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import {
  useDeleteUserMutation,
  useGetCustomersQuery,
  useUpdateUserMutation,
} from '../../services/FakeApi';
import { EditForm } from '..';
import TextContent from '../TextContent/TextContent';

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
    name: 'BirthDate',
    id: 'birthDate',
  },
  {
    name: 'Actions',
    id: 'actions',
  },
];

const Actions = ({ id, handleDelete, handleOpen }) => (
  <Box className="flex">
    <IconButton
      onClick={() => {
        handleOpen(id);
      }}
    >
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => handleDelete(id)}>
      <DeleteIcon />
    </IconButton>
  </Box>
);

const Customers = () => {
  const { data: customersData, isLoading, error } = useGetCustomersQuery();
  const [customers, setCustomers] = useState([]);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    const toUpdateData = customers.filter((customer) => customer.id === id);
    setEditData(toUpdateData[0]);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id),
    );
    const response = await deleteUser(id);
    console.log(response.data.isDeleted ? 'Deleted' : 'Not Deleted');
  };

  const handleUpdate = async (id, newData) => {
    const updatedUser = await updateUser({ id, newData });
    const newCustomers = customers.map((customer) => {
      if (customer.id === id) {
        return { ...updatedUser.data };
      }
      return customer;
    });
    setCustomers(newCustomers);
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
    return <h1> Sorry, Something went wrong.. </h1>;
  }
  const rows = customers.map((customer) => ({
    id: customer.id,
    name: <TextContent content={`${customer.firstName} ${customer.lastName}`} width={100} warp/>,
    phone: <TextContent content={customer.phone} width={130}/>,
    email: <TextContent content={customer.email} width={180} warp/>,
    birthDate: <TextContent content={customer.birthDate} width={100}/>,
    actions: (
      <Actions
        id={customer.id}
        handleDelete={handleDelete}
        handleOpen={handleOpen}
      />
    ),
  }));

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component={Paper}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.8),
            boxShadow: 24,
            p: 4,
          }}
        >
          <EditForm
            editData={editData}
            handleUpdate={handleUpdate}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      {/*<Box className="bg-black w-4 h-4" />*/}
      <DataTable columns={tableHeadings} rows={rows} />
    </Box>
  );
};

export default Customers;
