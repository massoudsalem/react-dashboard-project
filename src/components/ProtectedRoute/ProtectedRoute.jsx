import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <Box className="flex h-[50vh] flex-col items-center justify-center">
        <Typography variant="h3" align="center" color="error">
          401 Unauthorized Error
        </Typography>
        <Typography variant="body1" align="center" mt={2}>
          You are not authorized to access this page. Please log in to continue.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          mt={2}
        >
          Go to Login Page
        </Button>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
