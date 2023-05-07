import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fakeApi = createApi({
  reducerPath: 'fakeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    getProducts: builder.query({
      query: () => 'products?limit=100',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCustomers: builder.query({
      query: () => 'users',
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCustomersQuery,
  useGetCategoriesQuery,
  useDeleteUserMutation,
} = fakeApi;
