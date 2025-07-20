import { useAddFavoriteMutation, useGetFavoritesQuery } from '@/src/api/favoritesApi';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { useGetPokemonListQuery } from '@/src/api/pokemonApi';
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



const PAGE_SIZE = 10;

export default function TabTwoScreen() {
  const [offset, setOffset] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [addFavorite] = useAddFavoriteMutation();
  const { data: favorites } = useGetFavoritesQuery("favorites");
  const favoriteListName = favorites?.map(fav => fav.name);
  const { data, isLoading, isFetching, error } = useGetPokemonListQuery({
    limit: PAGE_SIZE,
    offset,
  });

  useEffect(() => {
    if (data?.length) {
      setPokemons((prev) => [...prev, ...data]);
    }
  }, [data]);

  const loadMore = () => {
    if (!isFetching) {
      setOffset((prev) => prev + PAGE_SIZE);
    }
  };

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
      <TouchableHighlight onPress={() => addFavorite(item)}>
        <Ionicons name={favoriteListName?.includes(item.name) ? "heart" : "heart-outline"} size={32} color="white" />
      </TouchableHighlight>
    </View>
  );


  if(error){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Error getting pokemons {error}</Text>
      </View>
    )
  }

  if (isLoading && offset === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All pokemons</Text>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item?.name}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator /> : null}
        style={{flex: 1, width: "90%", borderTopColor: "#7159c1", borderTopWidth: 1 }}
      />
    </View>
  );
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
