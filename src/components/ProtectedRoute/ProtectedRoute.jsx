import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <Box className="flex flex-col justify-center items-center h-[50vh]">
        <Typography variant="h3" color="error">
        401 Unauthorized Error
      </Typography>
      <Typography variant="body1" align="center" mt={2}>
        You are not authorized to access this page. Please log in to continue.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login" mt={2}>
        Go to Login Page
      </Button>
      </Box>
    );
  }

  return children;
};



export default ProtectedRoute;
