import { ActivityIndicator, Text, View } from 'react-native';

import { Image } from 'expo-image';
import React from 'react';
import { useGetPokemonByNameQuery } from '../../src/api/pokemonApi';

export default function HomeScreen() {
 const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

 if(isLoading){
  return (
    <View style={{ padding: 60, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="white" />
    </View>
  )
 }

 if(error){
  return (
    <View style={{ padding: 60, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color: 'white'}}>Error Fetching</Text>
    </View>
  )
 }

  return (
    <View style={{ padding: 60, justifyContent: 'center', alignItems: 'center', flex: 1, width: "100%" }}>
      <Text style={{color: 'white'}}>{data.species.name}</Text>
      <Image source={data.sprites.front_shiny}  contentFit="cover" style={{   flex: 1,
    width: '50%'}} />
    </View>
  );
}
