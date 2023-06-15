import { Box, CircularProgress, Fab, Skeleton } from '@mui/material';
import { Add } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable, TextContent, FilterSection } from '..';
import { useGetProductsQuery } from '../../services/FakeApi';

const Image = ({ src }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Box className="flex h-[80px] w-[120px] items-center justify-center overflow-hidden p-1">
      {loading && (
        <Skeleton
          variant="rectangular"
          width={120}
          height={90}
          animation="wave"
        />
      )}
      <img
        onLoad={() => setLoading(false)}
        className={`max-h-[90px] max-w-[120px] object-contain ${
          loading ? 'hidden' : ''
        }`}
        src={src}
        alt="product"
      />
    </Box>
  );
};

const Products = ({ productsTableOnly = false, className = '' }) => {
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
    title: <TextContent content={product.title} width={90} warp />,
    price: (
      <TextContent content={`${product.price}$`} width={50} disableTooltip />
    ),
    category: <TextContent content={product.category} width={120} />,
    description: <TextContent content={product.description} width={170} />,
    image: <Image src={product.thumbnail} />,
    rating: `⭐️${product.rating}`,
  }));
  return (
    <Box className={`flex flex-col md:flex-row ${className}`}>
      {!productsTableOnly && (
        <FilterSection
          data={productsData.products}
          setProducts={setProducts}
          className="mb-4 md:mb-0 md:mr-4 md:w-[220px]"
        />
      )}
      <DataTable
        rows={rows}
        columns={columns}
        rowOnClick={(id) => navigate(`/product/${id}`)}
        className="max-h-[700px] overflow-y-auto"
      />
      {!productsTableOnly && (
        <Fab
          onClick={() => navigate('/create-product')}
          size="small"
          className="fixed bottom-10 right-10 -translate-x-5 -translate-y-5"
          color="primary"
          aria-label="add"
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};

export default Products;
