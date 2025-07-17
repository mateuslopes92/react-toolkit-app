import { useGetFavoritesQuery, useRemoveFavoriteMutation } from '@/src/api/favoritesApi';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';

const getIdFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

const getImageUrl = (url) => {
  const id = getIdFromUrl(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};


const Favorites: React.FC = () => {
  const { data, error, isLoading, refetch } = useGetFavoritesQuery("favorites");
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (data?.length) {
      setFavorites(data);
    } else {
      setFavorites([])
    }
  }, [data]);

  if(error){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Error getting pokemons {error}</Text>
      </View>
    )
  }

  if(!favorites.length){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>No favorite pokemons</Text>
      </View>
    )
  }

  if(error){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Error getting pokemons {error}</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

    const renderItem = ({ item }) => (
      <View
        key={item.name}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          borderWidth: 1,
          borderColor: '#7159c1',
          width: "100%",
          marginVertical: 8,
          borderRadius: 8,
          justifyContent: 'space-between'
        }}
      >
        <Image
          source={{ uri: getImageUrl(item.url) }}
          style={{ width: 90, height: 90 }}
          contentFit="contain"
        />
        <Text style={{ fontSize: 30, color: "white", textTransform: 'uppercase' }}>{item.name}</Text>
        <TouchableHighlight onPress={() => {
          removeFavorite(item.id)
          refetch()
        }}>
          <Ionicons name={"heart"} size={32} color="white" />
        </TouchableHighlight>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite pokemons</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item?.name}
        renderItem={renderItem}
        style={{flex: 1, width: "90%", borderTopColor: "#7159c1", borderTopWidth: 1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    color: "white",
    marginBottom: 40
  }
});

export default Favorites;
