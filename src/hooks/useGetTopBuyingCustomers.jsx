import React from 'react';
import {
  useGetCartsQuery,
  useGetMultipleUsersByIdsQuery,
} from '../services/FakeApi';

const useGetTopBuyingCustomers = () => {
  //This is an excellent opportunity for me to further expand my knowledge of
  //RTK Query by attempting to create a custom hook instead of using the RTK Query
  //built-in functionality. While I am aware that RTK Query provides an easier way to accomplish this (chain queries),
  //I am motivated to challenge myself and learn more by taking the harder route.
  const { data, isSuccess } = useGetCartsQuery();
  const [topBuyingCustomers, setTopBuyingCustomers] = React.useState([]);
  const [topCarts, setTopCarts] = React.useState([]);

  React.useEffect(() => {
    if (isSuccess) {
      const newTopCarts = [...data.carts].sort(
        (a, b) => b.discountedTotal - a.discountedTotal,
      );
      setTopCarts(newTopCarts);
    }
  }, [data, isSuccess]);

  const { data: customers, ...rest } = useGetMultipleUsersByIdsQuery(
    isSuccess ? topCarts.map((cart) => cart.userId) : [],
  );

  React.useEffect(() => {
    if (rest.isSuccess) {
      setTopBuyingCustomers(
        topCarts.map((cart) => {
          const customer = customers.find((user) => user.id === cart.userId);
          if (!customer) {
            return {
              firstName: 'Loading...',
              lastName: '',
              totalSpent: cart.discountedTotal,
              totalOrders: cart.totalQuantity,
            };
          }
          const { firstName, lastName } = customer;
          return {
            firstName,
            lastName,
            totalSpent: cart.discountedTotal,
            totalOrders: cart.totalQuantity,
          };
        }),
      );
    }
  }, [customers, rest.isSuccess, topCarts]);

  return { topBuyingCustomers, ...rest };
};

export default useGetTopBuyingCustomers;
