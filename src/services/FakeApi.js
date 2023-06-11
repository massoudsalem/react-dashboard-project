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
    getCarts: builder.query({
      query: () => 'carts',
    }),
    getMultipleUsersByIds: builder.query({
      //eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const users = _arg.map(async (id) => {
          const response = await fetchWithBQ(`users/${id}`);
          return response.data;
        });
        const resolvedUsers = await Promise.all(users);
        return { data: resolvedUsers };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCustomersQuery,
  useGetCategoriesQuery,
  useGetCartsQuery,
  useGetMultipleUsersByIdsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAddUserMutation,
} = fakeApi;
