const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchRecipes(query) {
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;

  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error('Falha de conexão. Verifique sua internet e tente novamente.');
  }

  if (!response.ok) {
    throw new Error(`Erro ao buscar receitas (código ${response.status}).`);
  }

  const data = await response.json();
  return data.meals ?? [];
}
