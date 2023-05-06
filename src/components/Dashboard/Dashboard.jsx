import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  console.log('Dashboard');
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
