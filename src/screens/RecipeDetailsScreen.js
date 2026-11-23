import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getRecipeById } from '../services/mealApi';
import { useFavorites } from '../context/FavoritesContext';

function extractIngredients(recipe) {
  if (!recipe) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(
        `${measure && measure.trim() ? `${measure.trim()} ` : ''}${ingredient.trim()}`
      );
    }
  }
  return ingredients;
}

export default function RecipeDetailsScreen({ navigation, route }) {
  const { idMeal } = route.params || {};
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isMounted = useRef(true);

  async function loadRecipe() {
    if (!idMeal) {
      if (isMounted.current) {
        setError('Identificador de receita inválido.');
        setLoading(false);
      }
      return;
    }

    if (isMounted.current) {
      setLoading(true);
      setError('');
    }

    try {
      const result = await getRecipeById(idMeal);
      if (isMounted.current) {
        setRecipe(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Não foi possível carregar a receita.');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    isMounted.current = true;
    loadRecipe();

    return () => {
      isMounted.current = false;
    };
  }, [idMeal]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e23744" />
        <Text style={styles.info}>Carregando receita...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadRecipe}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Receita não encontrada.</Text>
        {navigation?.canGoBack?.() ? (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Voltar</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  const favorite = isFavorite(recipe.idMeal);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={{ uri: recipe.strMealThumb }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{recipe.strMeal}</Text>
      <TouchableOpacity
        style={[
          styles.favoriteButton,
          favorite && styles.favoriteButtonActive,
        ]}
        onPress={() => {
          if (favorite) {
            removeFavorite(recipe.idMeal);
          } else {
            addFavorite(recipe);
          }
        }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.favoriteButtonText,
            favorite && styles.favoriteButtonTextActive,
          ]}
        >
          {favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {extractIngredients(recipe).map((item, index) => (
        <Text key={`${item}-${index}`} style={styles.ingredient}>
          • {item}
        </Text>
      ))}
      <Text style={styles.sectionTitle}>Modo de preparo</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 16,
    color: '#e23744',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#e23744',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    borderWidth: 2,
    borderColor: '#e23744',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  favoriteButtonActive: {
    backgroundColor: '#e23744',
  },
  favoriteButtonText: {
    color: '#e23744',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButtonTextActive: {
    color: '#fff',
  },
});
