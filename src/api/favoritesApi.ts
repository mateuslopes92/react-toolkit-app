import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => 'favorites',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation({
      query: (pokemon) => ({
        url: 'favorites',
        method: 'POST',
        body: pokemon,
      }),
      invalidatesTags: ['Favorites'],
    }),
    removeFavorite: builder.mutation({
      query: (id) => ({
        url: `favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation
} = favoritesApi;