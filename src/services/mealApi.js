const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query) {
  const trimmed = typeof query === 'string' ? query.trim() : '';
  if (!trimmed) {
    return [];
  }

  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(trimmed)}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Falha de conexão. Verifique sua internet e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`Erro ao buscar receitas (código ${response.status}).`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('Não foi possível processar os dados recebidos da API.');
  }

  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function getRecipeById(id) {
  if (!id) {
    return null;
  }

  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Falha de conexão. Verifique sua internet e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`Erro ao buscar a receita (código ${response.status}).`);
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    throw new Error('Não foi possível processar os dados recebidos da API.');
  }

  if (!Array.isArray(data?.meals) || data.meals.length === 0) {
    return null;
  }

  return data.meals[0];
}
