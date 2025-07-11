import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
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