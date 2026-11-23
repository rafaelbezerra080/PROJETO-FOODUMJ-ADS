import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { idMeal: item.idMeal })}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.name} numberOfLines={2}>
            {item.strMeal}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.idMeal)}
          >
            <Text style={styles.removeButtonText}>Remover</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma receita favorita ainda</Text>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  list: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#e23744',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  empty: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
});
