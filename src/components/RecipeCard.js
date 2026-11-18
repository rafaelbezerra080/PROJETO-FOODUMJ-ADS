import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function RecipeCard({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.name} numberOfLines={2}>
        {recipe.strMeal}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
