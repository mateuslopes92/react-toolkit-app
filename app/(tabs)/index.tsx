import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Image } from 'expo-image';
import { useGetPokemonByNameQuery } from '../../src/api/pokemonApi';

export default function HomeScreen() {
  const [pokemonName, setPokemonName] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(pokemonName.trim().toLowerCase());
    }, 500); // wait 500ms

    return () => clearTimeout(handler); // cleanup
  }, [pokemonName]);

  const { data, error, isLoading } = useGetPokemonByNameQuery(debouncedName, {
    skip: debouncedName === "", // skip empty queries
  });


  return (
    <View style={{ padding: 60, justifyContent: 'center', alignItems: 'center', flex: 1, width: "100%" }}>
      <TextInput
        value={pokemonName}
        onChangeText={setPokemonName}
        placeholderTextColor="white"
        placeholder="Search a Pokémon"
        style={{ color: "white", borderBottomWidth: 1, borderColor: "white", width: "80%", marginBottom: 20 }}
      />

      {isLoading && (
        <ActivityIndicator color="white" />
      )}

      {error && (
        <Text style={{ color: 'red', marginTop: 10 }}>Pokémon not found</Text>
      )}

      {data?.sprites?.front_default && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            width: "100%",
            marginVertical: 8,
            justifyContent: 'space-between'
          }}
        >
          <Image
            source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
          />
        </View>
      )}
    </View>
  );
}