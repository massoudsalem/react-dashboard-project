import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  CreateProduct,
  Customers,
  Dashboard,
  Navbar,
  ProductDetails,
  Products,
  Reports,
  Login,
  Profile,
  NotFound,
} from '.';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

const App = () => {
  const openWidth = 200;
  const closedWidth = 56;
  const [drawerOpen, setDrawerOpen] = useState(true);
  const loggedIn = !!localStorage.getItem('token');
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
        className="p-4 pr-7 transition-all duration-500"
      >
        <Routes>
          <Route path="/" element={loggedIn ? <Dashboard /> : <Login />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <CreateProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </>
  );
};

export default App;
