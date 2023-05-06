import { Box, Typography } from '@mui/material';
import React from 'react';
import { useGetProductsQuery } from '../../services/FakeStore';

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
      <Typography variant="h1" className="text-cyan-500 h-[1000px]">
        Dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;
