# FoodUMJ: Receitas

Aplicativo móvel de consulta de receitas desenvolvido como projeto final da disciplina de Programação de Dispositivos Móveis do curso de ADS do Centro Universitário Mário Pontes Jucá (UMJ).

## Funcionalidades

- Pesquisa de receitas por nome, com validação de campo vazio
- Lista de resultados com imagem e nome de cada receita
- Tela de detalhes com imagem, ingredientes, medidas e modo de preparo
- Favoritar e desfavoritar receitas, compartilhado entre telas
- Tela de favoritos com remoção individual
- Indicadores de carregamento, mensagens de erro com nova tentativa e estados vazios

## Stack

- React Native + Expo (SDK 58), JavaScript
- React Navigation (native stack)
- Context API (`useContext` + `useState`) para os favoritos
- API externa **TheMealDB** (endpoints públicos para uso educacional)

## API utilizada

- Busca por nome: `https://www.themealdb.com/api/json/v1/1/search.php?s=<termo>`
- Detalhes por ID: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=<id>`

## Estrutura de pastas

```
src/
  components/
    RecipeCard.js          # card com imagem e nome da receita
  context/
    FavoritesContext.js    # provider e hook useFavorites
  navigation/
    AppNavigator.js        # stack com as 4 telas
  screens/
    HomeScreen.js          # tela inicial com pesquisa
    ResultsScreen.js       # lista de resultados
    RecipeDetailsScreen.js # detalhes, ingredientes e preparo
    FavoritesScreen.js     # lista de favoritos
  services/
    mealApi.js             # searchRecipes e getRecipeById
```

## Requisitos

- Node.js LTS
- Aplicativo **Expo Go** instalado no celular (Android ou iOS)
- Celular e computador na mesma rede Wi-Fi

## Instalação e execução

```bash
git clone https://github.com/rafaelbezerra080/PROJETO-FOODUMJ-ADS.git
cd PROJETO-FOODUMJ-ADS
npm install
npx expo start
```

Depois escaneie o QR code exibido no terminal com o Expo Go.

## Limitações

- Os favoritos ficam apenas em memória: a lista é esvaziada ao fechar o app (persistência não faz parte do escopo).
- Os nomes, ingredientes e instruções das receitas podem vir em inglês, pois dependem do conteúdo da API; a interface do app está em português.
- O funcionamento depende da disponibilidade da TheMealDB.

## Contribuições

- **Rafael Bezerra:** tela inicial com pesquisa, serviço de busca na API, tela de resultados e documentação.
- **Jullyane Dué:** inicialização do projeto Expo, navegação e telas base, revisão da integração entre telas e tratamento de erros.
- **Mateus Vinícius Montenegro Costa:** consulta de receita por ID, tela de detalhes, ingredientes e medidas.
- **Luan Monteiro:** contexto global de favoritos, botão de favoritar nos detalhes e tela de favoritos.

## Roteiro de demonstração

1. Na tela inicial, pesquise "chicken".
2. Abra uma receita nos resultados.
3. Toque em "Adicionar aos favoritos".
4. Navegue até Favoritos, abra a receita novamente e remova.
5. Faça uma busca sem resultados para ver o estado vazio.
