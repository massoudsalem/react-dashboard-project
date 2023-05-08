import { Box, Divider, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useGetCustomersQuery } from '../../services/FakeApi';
import CustomPieChart from '../Charts/CustomPieChart';

const Reports = () => {
  const { data: customersData } = useGetCustomersQuery();

  const customersAgeRangeCount = useMemo(() => {
    if (customersData) {
      const customersAgeRange = [
        { name: '0-20', value: 0 },
        { name: '21-30', value: 0 },
        { name: '31-40', value: 0 },
        { name: '41-60', value: 0 },
      ];
      customersData.users.forEach((user) => {
        if (user.age <= 20) {
          customersAgeRange[0].value += 1;
        } else if (user.age <= 30) {
          customersAgeRange[1].value += 1;
        } else if (user.age <= 40) {
          customersAgeRange[2].value += 1;
        } else {
          customersAgeRange[3].value += 1;
        }
      });
      return customersAgeRange;
    }
    return [];
  }, [customersData]);
  console.log('Reports');
  return (
    <Box component={Paper} className="w-[400px]">
      <Typography variant="h6" align="start" className="p-4">
        Customers Age Range
      </Typography>
      <Divider />
      <CustomPieChart data={customersAgeRangeCount} label="Customers" />
    </Box>
  );
};

export default Reports;
