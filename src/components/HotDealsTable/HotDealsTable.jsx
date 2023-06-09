import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetHotDealsQuery from '../../hooks/useGetHotDealsQuery';
import { TextContent, DataTable } from '..';

const HotDealsTable = ({ className = '' }) => {
  const { hotDeals, isLoading, isError, error } = useGetHotDealsQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (isError) {
    console.log(error);
    return <h1> Sorry, Something went wrong.. </h1>;
  }

  const tableHeadings = [
    {
      name: 'Name',
      id: 'name',
    },
    {
      name: 'Price',
      id: 'price',
    },
    {
      name: 'Discount',
      id: 'discount',
    },
  ];

  const rows = hotDeals.map((product) => ({
    id: product.id,
    name: <TextContent content={product.title} width={120} />,
    price: <TextContent content={product.price} width={50} />,
    discount: <TextContent content={product.discountPercentage} width={50} />,
  }));

  return (
      <DataTable
        columns={tableHeadings}
        rows={rows}
        rowOnClick={(id) => navigate(`/product/${id}`)}
        className={className}
      />
  );
};

export default HotDealsTable;
