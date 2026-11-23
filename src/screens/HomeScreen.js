import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleTextChange(text) {
    setSearchText(text);
    if (errorMessage) {
      setErrorMessage('');
    }
  }

  function handleSearch() {
    Keyboard.dismiss();
    const term = searchText.trim();
    if (!term) {
      setErrorMessage('Digite o nome de uma receita para pesquisar.');
      return;
    }
    setErrorMessage('');
    navigation.navigate('Results', { term });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodUMJ: Receitas</Text>
      <Text style={styles.subtitle}>Encontre sua próxima receita</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da receita"
        value={searchText}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSearch}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('Favorites')}
        activeOpacity={0.7}
      >
        <Text style={styles.favoritesButtonText}>Ver favoritos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e23744',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  error: {
    color: '#e23744',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#e23744',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoritesButton: {
    padding: 8,
  },
  favoritesButtonText: {
    color: '#e23744',
    fontSize: 16,
    fontWeight: '600',
  },
});
