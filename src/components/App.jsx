import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Navbar, ProductDetails } from '.';

const App = () => {
  const openWidth = 200;
  const closedWidth = 56;
  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <>
      <Navbar
        changeWidth={{ openWidth, closedWidth }}
        openState={{ drawerOpen, setDrawerOpen }}
      />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          marginLeft: `${drawerOpen ? openWidth : closedWidth}px`,
        }}
        className="p-3 transition-all duration-500"
      >
        <Box className="h-[70px]" />
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="product-details/:id" element={<ProductDetails />} />
          </Route>
        </Routes>
      </Box>
    </>
  );
};

export default App;
