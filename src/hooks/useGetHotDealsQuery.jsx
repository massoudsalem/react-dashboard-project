import React from 'react';
import { useGetProductsQuery } from '../services/FakeApi';

const useGetHotDealsQuery = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const Products = data?.products;
  const [hotDeals, setHotDeals] = React.useState([]);

  React.useEffect(() => {
    if (Products) {
      const newHotDeals = [...Products]
        .sort((a, b) => b.discountPercentage - a.discountPercentage)
        .slice(0, 20);
      setHotDeals(newHotDeals);
    }
  }, [Products]);
  

  return { hotDeals, isLoading, isError, error };
};

export default useGetHotDealsQuery;
