import { Box, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  LoggedIn,
} from '.';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';

const App = () => {
  const openWidth = 200;
  const closedWidth = 56;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const loginStatus = useSelector((state) => state.auth.status);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, [loginStatus]);
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
          <Route path="/login" element={
            loggedIn ? <LoggedIn /> : <Login />
          } />
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
