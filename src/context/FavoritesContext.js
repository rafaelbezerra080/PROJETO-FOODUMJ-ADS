import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function addFavorite(recipe) {
    setFavorites((prev) => {
      if (prev.some((item) => item.idMeal === recipe.idMeal)) {
        return prev;
      }
      return [...prev, recipe];
    });
  }

  function removeFavorite(idMeal) {
    setFavorites((prev) => prev.filter((item) => item.idMeal !== idMeal));
  }

  function isFavorite(idMeal) {
    return favorites.some((item) => item.idMeal === idMeal);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
}
