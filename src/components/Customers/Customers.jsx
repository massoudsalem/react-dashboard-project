import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Add,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import DataTable from '../DataTable/DataTable';
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetCustomersQuery,
  useUpdateUserMutation,
} from '../../services/FakeApi';
import { EditForm, Search, TextContent } from '..';

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

const EditModal = ({
  open,
  handleClose,
  handleUpdate,
  handleAddUser,
  editData,
}) => (
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
        opacity: 0.8,
        boxShadow: 24,
        p: 4,
      }}
    >
      <EditForm
        editData={editData}
        handleUpdate={handleUpdate}
        handleClose={handleClose}
        handleAddUser={handleAddUser}
      />
    </Box>
  </Modal>
);

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

const Customers = ({ customersTableOnly = false, className = '' }) => {
  const { data: customersData, isLoading, error } = useGetCustomersQuery();
  const [customers, setCustomers] = useState([]);
  const [visibleCustomers, setVisibleCustomers] = useState([]);
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [addUser] = useAddUserMutation();
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData.users);
    }
  }, [customersData]);

  useEffect(() => {
    setVisibleCustomers(customers);
  }, [customers]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const searchValue = e.target.value;
      setVisibleCustomers(
        customers.filter(
          (customer) =>
            customer.firstName
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            customer.lastName
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            customer.email
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            customer.phone
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            `${customer.firstName} ${customer.lastName}`
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()) ||
            `${customer.lastName} ${customer.firstName}`
              .trim()
              .toLowerCase()
              .includes(searchValue.trim().toLowerCase()),
        ),
      );
    }
  };

  const handleOpen = (id) => {
    if (id) {
      setOpen(true);
      const toUpdateData = customers.filter((customer) => customer.id === id);
      setEditData(toUpdateData[0]);
    } else {
      setOpen(true);
      setEditData({});
    }
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

  const handleAddUser = async (newData) => {
    const newUser = await addUser(newData);
    setCustomers((prevCustomers) => [newUser.data, ...prevCustomers]);
  };

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
  const rows = visibleCustomers.map((customer) => ({
    id: customer.id,
    name: (
      <TextContent
        content={`${customer.firstName} ${customer.lastName}`}
        width={100}
        warp
      />
    ),
    phone: <TextContent content={customer.phone} width={130} />,
    email: <TextContent content={customer.email} width={180} warp />,
    birthDate: <TextContent content={customer.birthDate} width={100} />,
    actions: (
      <Actions
        id={customer.id}
        handleDelete={handleDelete}
        handleOpen={() => handleOpen(customer.id)}
      />
    ),
  }));
  return (
    <Box className={className}>
      <EditModal
        open={open}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        editData={editData}
        handleAddUser={handleAddUser}
      />
      {!customersTableOnly && (
        <Box>
          <Search
            className="mb-4 w-full"
            color={theme.palette.primary}
            onKeyDown={handleSearch}
            onChange={(e) => {
              if (e.target.value === '') {
                setVisibleCustomers(customers);
              }
            }}
          />
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            className="mb-4 ml-auto"
          >
            <Add /> Add Customer
          </Button>
        </Box>
      )}
      <DataTable columns={tableHeadings} rows={rows} />
    </Box>
  );
};

export default Customers;
