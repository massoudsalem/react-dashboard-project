import { Box, Typography } from '@mui/material';
import React from 'react';

const Dashboard = () => {
  console.log('Dashboard');
  return (
    <Box>
      <Typography variant="h1" className="text-cyan-500 h-[1000px]">
        Dashboard
      </Typography>
    </Box>
  );
};

export default Dashboard;
