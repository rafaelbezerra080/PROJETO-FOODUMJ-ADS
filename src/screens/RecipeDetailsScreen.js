import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function RecipeDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Receita</Text>
      <Text style={styles.subtitle}>Tela de Detalhes (Provisória)</Text>
    </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
