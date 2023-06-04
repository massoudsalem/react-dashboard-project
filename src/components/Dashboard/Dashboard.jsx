import { Box, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import { Customers, InfoBox, Products } from '..';
import { useGetProductsQuery } from '../../services/FakeApi';

const Dashboard = () => {
  
  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex items-center justify-center">
        <Typography variant="h4">Welcome to Dashboard</Typography>
      </Box>

      <Box className="flex justify-around gap-5 flex-wrap">
        <InfoBox
          title="Total Sales"
          count="1,534"
          icon="local_mall"
          color="info"
          titleColor="text-blue-800"
          subtitleIcon="trending_up"
          subtitle="+2.5 %"
        />
        <InfoBox
          title="Total Profit"
          count="506,5 k"
          icon="attach_money"
          color="warning"
          titleColor="text-red-500"
          subtitleIcon="trending_down"
          subtitle="-11.4 %"
        />
        <InfoBox
          title="Total Orders"
          count="2,156"
          icon="shopping_cart"
          color="error"
          titleColor="text-gray-500"
          subtitleIcon="trending_flat"
          subtitle="+0.0 %"
        />
        <InfoBox
          title="Total Customers"
          count="1,234"
          icon="people"
          color="success"
          titleColor="text-green-500"
          subtitleIcon="trending_up"
          subtitle="+1.5 %"
        />
      </Box>
      <Box className="flex gap-4">
        <Box component={Paper} className="overflow-x-auto w-1/2 p-4">
        <Typography variant="h4">Products</Typography>
        <Divider className='-mx-4 mb-2'/>
        <Products productsTableOnly className='-m-4 mt-4'/>
        </Box>
        <Box className="overflow-x-auto w-1/2 p-4">
        <Typography variant="h4">Customers</Typography>
        <Divider className='-mx-4 mb-2'/>
        <Customers customersTableOnly className='-m-4 mt-4'/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
