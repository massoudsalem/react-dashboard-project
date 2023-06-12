import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
  return (
    <Box className="flex flex-col gap-4 h-[50vh] items-center justify-center">
      <Typography variant="h3" color="error">
        404 Not Found
      </Typography>
      <Typography variant="body1" align="center" mt={2}>
        The requested page could not be found.
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

export default NotFound;
