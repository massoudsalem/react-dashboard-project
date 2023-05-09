import { Box, Divider, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useGetCustomersQuery } from '../../services/FakeApi';
import CustomPieChart from '../Charts/CustomPieChart';
import ComposedCharts from '../Charts/ComposedCharts';

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

  const companyPersonCites = useMemo(() => {
    if (customersData) {
      const citiesData = [
        { name: 'Washington', companyAddress: 0, personAddress: 0 },
        { name: 'Nashville', companyAddress: 0, personAddress: 0 },
        { name: 'Anchorage', companyAddress: 0, personAddress: 0 },
        { name: 'Manchester', companyAddress: 0, personAddress: 0 },
        { name: 'Fayetteville', companyAddress: 0, personAddress: 0 },
      ];
      customersData.users.forEach((user) => {
        citiesData.forEach((cityData) => {
          if (cityData.name === user.address.city) {
            cityData.personAddress += 1;
          }
          if (cityData.name === user.company.address.city) {
            cityData.companyAddress += 1;
          }
        });
      });
      return citiesData;
    }
    return [];
  }, [customersData]);

  return (
    <>
      <Box component={Paper} className="w-[400px]">
        <Typography variant="h6" align="left" className="p-4">
          Customers Age Range
        </Typography>
        <Divider />
        <CustomPieChart
          data={customersAgeRangeCount}
          label="Customers"
        />
      </Box>
      <Box component={Paper} className="mt-9 w-[600px]">
        <Typography variant="h6" align="start" className="p-4">
          Composed Chart
        </Typography>
        <Divider />
        <ComposedCharts
          data={companyPersonCites}
          barLabel="Company Cities"
          barData="companyAddress" /*the key of data for object*/
          areaLabel="Person Cities"
          areaData="personAddress"
        />
      </Box>
    </>
  );
};

export default Reports;
