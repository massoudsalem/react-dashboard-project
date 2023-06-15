import { Box, Card, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { HotDealsTable, InfoBox, TopBuyingCustomersTable, Reports } from '..';

const Dashboard = () => {
  const theme = useTheme();

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex flex-col items-start">
        <Typography variant="h5">
          Good Morning, {user?.firstName ?? 'name'}!
        </Typography>
        <Typography variant="subtitle1" className="opacity-80">
          Here&apos;s what&apos;s happening with your store today.
        </Typography>
      </Box>
      <Box className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <InfoBox
          title="Total Sales"
          count="1,534"
          icon="local_mall"
          color="info"
          titleColor="text-blue-400"
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
      <Reports />
      <Box className="flex flex-col gap-4 lg:flex-row">
        <Card
          sx={{
            backgroundColor: theme.palette.warning.main,
          }}
          className="flex flex-1 flex-col items-center"
        >
          <Typography
            color={theme.palette.primary.contrastText}
            variant="h5"
            align="center"
          >
            Hot Deals
          </Typography>
          <Divider />
          <HotDealsTable className="flex-1" />
        </Card>
        <Card
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
          className="flex flex-1 flex-col items-center"
        >
          <Typography
            color={theme.palette.primary.contrastText}
            variant="h5"
            align="center"
          >
            Top Buying Customers
          </Typography>
          <Divider />
          <TopBuyingCustomersTable className="flex-1" />
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
