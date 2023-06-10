import { Box, Card, Divider, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { ComposedCharts, CustomPieChart } from '..';
import { useGetCompanyPersonCitesCount, useGetCustomersAgeRangeCount } from '../../hooks';

const Reports = () => {
  const {customersAgeRangeCount} = useGetCustomersAgeRangeCount();
  const {companyPersonCitesCount} = useGetCompanyPersonCitesCount();

  const isMD = useMediaQuery('(min-width:960px)');
  const width = isMD ? 'max-w-[600px]' : 'max-w-[500px]';

  return (
    <Box className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-start">
      <Box component={Card} className="w-full max-w-[300px] overflow-x-auto">
        <Typography variant="h6" align="left" className="p-4">
          Customers Age Range
        </Typography>
        <Divider />
        <CustomPieChart data={customersAgeRangeCount} label="Customers" />
      </Box>
      <Box component={Card} className={`w-full ${width} overflow-x-auto lg:overflow-hidden`}>
        <Typography variant="h6" align="left" className="p-4">
          Composed Chart
        </Typography>
        <Divider />
        <ComposedCharts
          data={companyPersonCitesCount}
          barLabel="Company Cities"
          barData="companyAddress" /*the key of data for object*/
          areaLabel="Person Cities"
          areaData="personAddress"
        />
      </Box>
    </Box>
  );
};

export default Reports;
