import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/FakeApi';
import DataTable from '../DataTable/DataTable';
import FilterSection from '../FiltersSection/FilterSection';

const Image = ({ src }) => (
  <Box className="flex items-center justify-center p-1">
    <img src={src} alt="product" width="100%" height="80px" />
  </Box>
);

const Products = () => {
  //const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
  const { data: productsData, isFetching } = useGetProductsQuery();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (productsData) {
      setProducts(productsData.products);
    }
  }, [productsData]);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  //useEffect(() => {
  //if (productsData) {
  //setProducts(productsData.products);
  //}
  //}, [productsLoading]);

  //console.log(productsLoading);
  //if (products.length <= 0 && productsLoading) {
  //return (
  //<Box display="flex" justifyContent="center">
  //<CircularProgress size="4rem" />
  //</Box>
  //);
  //}
  //if (productsError) {
  //return (
  //<h1> Sorry, Something went wrong.. </h1>
  //);
  //}

  //const products = productsData.products || [];
  //const columns = [
  //{ field: 'title', headerName: 'Title' },
  //{ field: 'price', headerName: 'Price' },
  //{ field: 'category', headerName: 'Category' },
  //{ field: 'description', headerName: 'Description' },
  //{ field: 'image',
  //headerName: 'Image',
  //width: 130,
  //renderCell: (params) => (
  //<Box className="flex justify-center items-center p-1">
  //<img src={params.value} alt="product" width="100%" height="80px" />
  //</Box>
  //),
  //cellClassName: 'justify-center',
  //},
  //{ field: 'rating', headerName: 'Rating' },
  //];
  const columns = [
    { name: 'Title', id: 'title' },
    { name: 'Price', id: 'price' },
    { name: 'Category', id: 'category' },
    { name: 'Description', id: 'description' },
    { name: 'Image', id: 'image' },
    { name: 'Rating', id: 'rating' },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: `${product.price} $`,
    category: product.category,
    description: product.description,
    image: <Image src={product.thumbnail} />,
    rating: `⭐️${product.rating}`,
  }));
  return (
    //TODo:fix flex starching
    <Box className="flex flex-col md:flex-row">
      <FilterSection data={productsData.products} setProducts={setProducts} />
      <DataTable
        rows={rows}
        columns={columns}
        rowOnClick={(id) => navigate(`/product/${id}`)}
      />
    </Box>
  );
};

export default Products;
