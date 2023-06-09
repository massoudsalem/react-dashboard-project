import { Box, Card, Divider, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  Customers,
  HotDealsTable,
  InfoBox,
  Products,
  TopBuyingCustomersTable,
} from '..';
import useGetHotDealsQuery from '../../hooks/useGetHotDealsQuery';
import useGetTopBuyingCustomers from '../../hooks/useGetTopBuyingCustomers';

const Dashboard = () => {
  const { hotDeals, isLoading, isError, error } = useGetHotDealsQuery();
  const { topBuyingCustomers } = useGetTopBuyingCustomers();

  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex items-center justify-center">
        <Typography variant="h4">Welcome to Dashboard</Typography>
      </Box>

      <Box className="flex flex-wrap justify-around gap-5">
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
      <Box className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex flex-1 flex-col items-center bg-red-200">
          <Typography variant="h5" align='center'>Hot Deals</Typography>
          <Divider />
          <HotDealsTable className="flex-1" />
        </Card>
        <Card className="flex flex-1 flex-col items-center bg-green-200">
          <Typography variant="h5" align='center'>Top Buying Customers</Typography>
          <Divider />
          <TopBuyingCustomersTable className="flex-1" />
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
