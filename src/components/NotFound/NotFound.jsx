import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
  return (
    <Box className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <Typography variant="h3" align="center" color="error">
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
