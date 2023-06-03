import {
  Box,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/FakeApi';
import DataTable from '../DataTable/DataTable';
import FilterSection from '../FiltersSection/FilterSection';
import TextContent from '../TextContent/TextContent';

const Image = ({ src }) => {
  const [loading, setLoading] = useState(true);
  return (
    <Box className="flex h-[90px] w-[120px] items-center justify-center overflow-hidden p-1">
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
    title: <TextContent content={product.title} width={100} warp />,
    price: <TextContent content={`${product.price}$`} width={50} disableTooltip/>,
    category: <TextContent content={product.category} width={120} />,
    description: <TextContent content={product.description} width={170} />,
    image: <Image src={product.thumbnail} />,
    rating: `⭐️${product.rating}`,
  }));
  return (
    //TODo:fix flex starching

    <Box className="flex flex-col md:flex-row">
      <FilterSection
        data={productsData.products}
        setProducts={setProducts}
        className="mb-4 md:mb-0 md:mr-4 md:w-[220px]"
      />
      <DataTable
        rows={rows}
        columns={columns}
        rowOnClick={(id) => navigate(`/product/${id}`)}
        className="mr-2 flex-grow"
      />
    </Box>
  );
};

export default Products;
