import { Box, Card, Divider, Typography, useMediaQuery } from '@mui/material';
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

  const companyPersonCitesCount = useMemo(() => {
    const citiesData = [];
    if (customersData) {
      customersData.users.forEach((user) => {
        const companyCity = user.company.address.city;
        const personCity = user.address.city;
        const companyCityIndex = citiesData.findIndex(
          (data) => data.name === companyCity,
        );
        const personCityIndex = citiesData.findIndex(
          (data) => data.name === personCity,
        );
        if (companyCityIndex === -1 && personCityIndex === -1) {
          if (personCity === companyCity) {
            citiesData.push({
              name: personCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
          if (companyCity && personCity !== companyCity) {
            citiesData.push({
              name: companyCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
          if (personCity && personCity !== companyCity) {
            citiesData.push({
              name: personCity,
              personAddress: 0,
              companyAddress: 0,
            });
          }
        }
        citiesData.forEach((data) => {
          if (data.name && data.name === companyCity) {
            data.companyAddress += 1;
          }
          if (data.name && data.name === personCity) {
            data.personAddress += 1;
          }
        });
      });
    }
    return citiesData;
  }, [customersData]);
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
      <Box component={Card} className={`w-full ${width} overflow-x-auto`}>
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
