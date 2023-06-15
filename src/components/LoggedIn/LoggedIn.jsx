import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = () => {
  return (
    <Box className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <Typography variant="h3" color="green">
        You are Already Logged In
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to=".."
        mt={2}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default LoggedIn;
