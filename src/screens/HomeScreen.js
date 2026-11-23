import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
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
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
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
  },
});
