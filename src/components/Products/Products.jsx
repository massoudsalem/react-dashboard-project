import { Box, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/FakeStore';
import FilterSection from '../FiltersSection/FilterSection';

const Products = () => {
  const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
  const [products, setProducts] = useState(
    productsData || [],
  );
  useEffect(() => {
    setProducts(productsData || []);
  }, [productsLoading]);
  if (productsLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (productsError) {
    return (
      <h1> Sorry, Something went wrong.. </h1>
    );
  }
  const columns = [
    { field: 'title', headerName: 'Title' },
    { field: 'price', headerName: 'Price' },
    { field: 'category', headerName: 'Category' },
    { field: 'description', headerName: 'Description' },
    { field: 'image',
      headerName: 'Image',
      width: 130,
      renderCell: (params) => (
        <Box className="flex justify-center items-center p-1">
          <img src={params.value} alt="product" width="100%" height="80px" />
        </Box>
      ),
      cellClassName: 'justify-center',
    },
    { field: 'rating', headerName: 'Rating' },
  ];
  const rows = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
    rating: `⭐️${product.rating.rate} (${product.rating.count})`,
  }));
  //console.log(columns, rows);
  console.log(products);
  return (
    <Box className="flex flex-col md:flex-row">
      <FilterSection data={productsData} setProducts={setProducts} />
      <Box className="flex max-w-[800px] w-full">
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={130}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          className="flex-grow"
        />
      </Box>
    </Box>
  );
};

export default Products;
