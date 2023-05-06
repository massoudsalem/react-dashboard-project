import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard, Navbar, Products } from '.';

const App = () => {
  const openWidth = 200;
  const closedWidth = 56;
  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <>
      <Navbar changeWidth={{ openWidth, closedWidth }} openState={{ drawerOpen, setDrawerOpen }} />
      <CssBaseline />
      <Box
        component="main"
        sx={{
          marginLeft: `${drawerOpen ? openWidth : closedWidth}px`,
        }}
        className="p-4 transition-all duration-500"
      >
        <Box className="h-[80px]" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
