import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  // prepareHeader is being called before each request and can be used to handle tokens and headers in general
  // we also can getState inside of headers preparation
  // prepareHeaders: (headers, { getState }) => {
  //     const token = (getState() as any).auth.token;
  //     if (token) {
  //       headers.set('authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<object, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query({
      query: ({ limit = 20, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
      transformResponse: (response) => response.results, // [{ name, url }]
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi