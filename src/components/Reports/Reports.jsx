import { Box, Card, CircularProgress, Divider, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { ComposedCharts, CustomPieChart } from '..';
import {
  useGetCompanyPersonCitesCount,
  useGetCustomersAgeRangeCount,
} from '../../hooks';

const Reports = () => {
  const { customersAgeRangeCount, isLoading:customersAgeRangeCountIsLoading } = useGetCustomersAgeRangeCount();
  const { companyPersonCitesCount, isLoading:companyPersonCitesCountIsLoading } = useGetCompanyPersonCitesCount();

  return (
    <Box className="grid grid-cols-1 justify-evenly gap-4 lg:grid-cols-[1fr_2fr]">
        <Box
          component={Card}
          className="flex flex-col items-center overflow-x-auto"
        >
          <Typography variant="h6" align="left" className="p-4">
            Customers Age Range
          </Typography>
          <Divider flexItem />
          {customersAgeRangeCountIsLoading ? (
            <Box className="flex items-center justify-center">
              <CircularProgress />
            </Box>
          ) : (
            <CustomPieChart data={customersAgeRangeCount} label="Customers" />
          )}
        </Box>
        <Box component={Card} className="flex flex-col items-center overflow-x-auto xl:overflow-hidden">
          <Typography variant="h6" align="left" className="p-4">
            Customers Cities
          </Typography>
          <Divider flexItem/>
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
  );
};

export default Reports;
