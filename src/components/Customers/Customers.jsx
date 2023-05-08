import { Box, CircularProgress, IconButton, Modal, Paper, TextField, alpha } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import {
  useDeleteUserMutation,
  useGetCustomersQuery,
  useUpdateUserMutation,
} from '../../services/FakeApi';
import { EditForm } from '..';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  padding: 30,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
      onClick={() => { handleOpen(id); }}
    >
      <EditIcon />
    </IconButton>
    <IconButton color="error" onClick={() => handleDelete(id)}>
      <DeleteIcon />
    </IconButton>
  </Box>
);
//const mockData = [
//{
//id: 1,
//name: 'John Doe',
//phone: '1234567890',
//email: 'email@email.com',
//birthday: '22-02-1999',
//actions: <Actions />,
//},
//{
//id: 2,
//name: 'John Doe',
//phone: '1234567890',
//email: 'email@email.com',
//birthday: '22-02-1999',
//actions: <Actions />,
//},
//];

const Customers = () => {
  const { data: customersData, isLoading, error } = useGetCustomersQuery();
  const [customers, setCustomers] = useState([]);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [updateUser, result] = useUpdateUserMutation();
  const [editData, setEditData] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    const toUpdateData = customers.filter((customer) => customer.id === id);
    setEditData(toUpdateData[0]);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
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
    name: `${customer.firstName} ${customer.lastName}`,
    phone: customer.phone,
    email: customer.email,
    birthDate: customer.birthDate,
    actions: (
      <Actions
        id={customer.id}
        handleDelete={handleDelete}
        handleOpen={handleOpen}
      />
    ),
  }));

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style} component={Paper}>
          <EditForm
            editData={editData}
            handleUpdate={handleUpdate}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
      <DataTable columns={tableHeadings} rows={rows} />
    </>
  );
};

export default Customers;
