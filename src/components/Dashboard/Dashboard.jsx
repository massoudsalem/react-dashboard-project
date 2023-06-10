import {
  Box,
  Card,
  Divider,
  Typography,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import {
  HotDealsTable,
  InfoBox,
  TopBuyingCustomersTable,
  ComposedCharts,
  CustomPieChart,
} from '..';
import {
  useGetCompanyPersonCitesCount,
  useGetCustomersAgeRangeCount,
} from '../../hooks';

const Dashboard = () => {
  const { customersAgeRangeCount, isLoading: customersAgeRangeCountIsLoading } =
    useGetCustomersAgeRangeCount();
  const {
    companyPersonCitesCount,
    isLoading: companyPersonCitesCountIsLoading,
  } = useGetCompanyPersonCitesCount();

  const isMD = useMediaQuery('(min-width:960px)');
  const width = isMD ? 'max-w-[600px]' : 'max-w-[500px]';

  return (
    <Box className="flex flex-col gap-5">
      <Box className="flex flex-col items-start">
        <Typography variant="h5">Good Morning, Mo!</Typography>
        <Typography variant="subtitle1" className="text-gray-500">
          Here&apos;s what&apos;s happening with your store today.
        </Typography>
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
      <Box className="flex flex-col items-center justify-evenly gap-4 lg:flex-row lg:items-stretch">
        <Box component={Card} className="w-full max-w-[300px] overflow-x-auto">
          <Typography variant="h6" align="left" className="p-4">
            Customers Age Range
          </Typography>
          <Divider />
          {customersAgeRangeCountIsLoading ? (
            <Box className="flex items-center justify-center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomPieChart data={customersAgeRangeCount} label="Customers" />
          )}
        </Box>
        <Box
          component={Card}
          className={`w-full ${width} overflow-x-auto lg:overflow-hidden`}
        >
          <Typography variant="h6" align="left" className="p-4">
            Composed Chart
          </Typography>
          <Divider />
          {companyPersonCitesCountIsLoading ? (
            <Box className="flex items-center justify-center">
              <CircularProgress />
            </Box>
          ) : (
            <ComposedCharts
              data={companyPersonCitesCount}
              barLabel="Company Cities"
              barData="companyAddress" /*the key of data for object*/
              areaLabel="Person Cities"
              areaData="personAddress"
            />
          )}
        </Box>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex flex-1 flex-col items-center bg-red-200">
          <Typography variant="h5" align="center">
            Hot Deals
          </Typography>
          <Divider />
          <HotDealsTable className="flex-1" />
        </Card>
        <Card className="flex flex-1 flex-col items-center bg-green-200">
          <Typography variant="h5" align="center">
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
