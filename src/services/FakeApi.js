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
    updateUser: builder.mutation({
      query: ({ id, newData }) => ({
        url: `users/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(newData),
      }),
    }),
    addUser: builder.mutation({
      query: (newData) => ({
        url: `users/add`,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(newData),
      }),
    }),
    getProducts: builder.query({
      query: () => 'products?limit=100',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCustomers: builder.query({
      query: () => 'users?limit=100',
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
  useUpdateUserMutation,
  useAddUserMutation,
} = fakeApi;
