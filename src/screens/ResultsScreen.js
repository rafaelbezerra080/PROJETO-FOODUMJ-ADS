import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RecipeCard from '../components/RecipeCard';
import { searchRecipes } from '../services/mealApi';

export default function ResultsScreen({ navigation, route }) {
  const { term = '' } = route.params || {};
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isMounted = useRef(true);

  async function loadRecipes() {
    const cleanTerm = term ? term.trim() : '';
    if (!cleanTerm) {
      if (isMounted.current) {
        setRecipes([]);
        setLoading(false);
      }
      return;
    }

    if (isMounted.current) {
      setLoading(true);
      setError('');
    }

    try {
      const results = await searchRecipes(cleanTerm);
      if (isMounted.current) {
        setRecipes(results);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Não foi possível carregar as receitas.');
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    isMounted.current = true;
    loadRecipes();

    return () => {
      isMounted.current = false;
    };
  }, [term]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e23744" />
        <Text style={styles.info}>Buscando receitas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadRecipes}
          activeOpacity={0.8}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('Favorites')}
        activeOpacity={0.7}
      >
        <Text style={styles.favoritesButtonText}>Ver favoritos</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.idMeal)}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('Details', { idMeal: item.idMeal })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.info}>
              {term.trim()
                ? `Nenhuma receita encontrada para "${term.trim()}".`
                : 'Nenhum termo de pesquisa informado.'}
            </Text>
          </View>
        }
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 16,
  },
  center: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  list: {
    flexGrow: 1,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
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
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
  favoritesButtonText: {
    color: '#e23744',
    fontSize: 16,
    fontWeight: '600',
  },
});
