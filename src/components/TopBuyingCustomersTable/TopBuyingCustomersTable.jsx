import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import useGetTopBuyingCustomers from '../../hooks/useGetTopBuyingCustomers';
import { DataTable, TextContent } from '..';

const TopBuyingCustomersTable = ({ className = '' }) => {
  const { topBuyingCustomers, isLoading, error } = useGetTopBuyingCustomers();

  const tableHeadings = [
    {
      name: 'Name',
      id: 'name',
    },
    {
      name: 'Total Spent',
      id: 'totalSpent',
    },
    {
      name: 'Total Orders',
      id: 'totalOrders',
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    console.log(error);
    return <h1> Sorry, Something went wrong.. </h1>;
  }

  const rows = topBuyingCustomers.map((customer) => ({
    id: customer.id,
    name: (
      <TextContent
        content={`${customer.firstName} ${customer.lastName}`}
        width={120}
      />
    ),
    totalSpent: <TextContent content={customer.totalSpent} width={50} />,
    totalOrders: customer.totalOrders,
  }));

  return (
    <DataTable columns={tableHeadings} rows={rows} className={className} />
  );
};

export default TopBuyingCustomersTable;
