import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/FakeStore';
import CreateProduct from '../CreateProduct/CreateProduct';

const Dashboard = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return (
      <h1> Loading.... </h1>
    );
  }

  if (error) {
    return (
      <h1> error.... </h1>
    );
  }
  console.log(data);

  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
