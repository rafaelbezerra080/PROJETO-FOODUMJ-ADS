# FoodUMJ: Receitas — Plano de implementação com vibe coding

## 1. Contexto e objetivo

Trabalho acadêmico em equipe (Rafael, Jullyane, Mateus e Luan). Desenvolver um aplicativo móvel simples de consulta de receitas em React Native com Expo. O usuário poderá pesquisar receitas por nome, visualizar resultados com imagem, abrir detalhes (nome, imagem, ingredientes e modo de preparo) e adicionar/remover receitas dos favoritos. O código deverá estar em um repositório público no GitHub; cada integrante precisa desenvolver sua parte, revisar as mudanças e registrar commits próprios, além de participar da apresentação.

## 2. Escopo mínimo e decisões técnicas

- React Native + Expo, JavaScript (sem TypeScript, para reduzir complexidade).
- React Navigation: stack para Início, Resultados e Detalhes; acesso à tela Favoritos por botão visível no início e nos resultados (ou por navegação compartilhada, se mais simples).
- API externa TheMealDB: `https://www.themealdb.com/api/json/v1/1/search.php?s=termo` para pesquisa e `https://www.themealdb.com/api/json/v1/1/lookup.php?i=id` para detalhes. Usar endpoints públicos disponíveis para uso educacional e verificar a política da API antes da apresentação.
- `useState`: texto pesquisado, carregamento, erros e resultados; estados locais onde apropriado.
- `useContext`: `FavoritesContext` + `FavoritesProvider` para compartilhar a lista de favoritos entre telas, sem prop drilling.
- Favoritos em memória durante a sessão; persistência após fechar o aplicativo não é exigida. Não adicionar AsyncStorage sem necessidade.
- Sem login, banco de dados, backend próprio, filtros avançados, categorias, notificações ou recursos extras.
- Tratamento de carregamento, falha de rede, busca vazia, ausência de resultados e receita inexistente.
- Interface limpa e funcional, em português, com componentes básicos do React Native.

### Estrutura sugerida

```
FoodUMJ/
  App.js
  src/
    components/
      RecipeCard.js
    context/
      FavoritesContext.js
    navigation/
      AppNavigator.js
    screens/
      HomeScreen.js
      ResultsScreen.js
      RecipeDetailsScreen.js
      FavoritesScreen.js
    services/
      mealApi.js
  assets/
  README.md
  package.json
```

A estrutura pode ser ajustada se a versão atual do Expo criar uma configuração diferente; evitar instalar Expo Router e React Navigation simultaneamente. Para este plano, usar o template blank e React Navigation.

## 3. Regras para trabalhar com a IA

1. Executar **um prompt por commit**, sempre na ordem deste documento. Não solicitar funcionalidades futuras antes da fase correspondente.
2. A IA deve examinar o código atual antes de alterar arquivos, preservar o que já funciona e limitar o escopo ao commit solicitado.
3. Após cada prompt, o integrante deve ler as alterações, executar o app, verificar os critérios e corrigir problemas antes de commitar.
4. A IA não deve executar `git commit`, `git push`, trocar autor de commits nem afirmar que algo foi testado sem ter executado o teste. O integrante faz o commit pessoalmente.
5. Usar o gerenciador de pacotes escolhido na inicialização e `npx expo install` para bibliotecas que dependem de compatibilidade com o SDK do Expo.
6. Não inventar respostas da API. Considerar que `meals` pode ser `null`; campos de ingredientes são `strIngredient1` a `strIngredient20` e medidas `strMeasure1` a `strMeasure20`.
7. Antes de começar o próximo commit, garantir que a versão atual abre sem erro. Se houver problema, corrigi-lo no commit responsável.

### Prompt-base para acrescentar antes de cada prompt específico

> Você está trabalhando em um projeto acadêmico React Native com Expo chamado FoodUMJ: Receitas. Leia os arquivos existentes e implemente **somente** a tarefa abaixo. Priorize a solução mais simples, código legível em JavaScript e textos de interface em português. Não implemente etapas futuras, não crie backend, não adicione bibliotecas desnecessárias e não altere arquivos sem necessidade. Ao final, informe os arquivos alterados, como testar manualmente e possíveis pendências. Não execute commit nem push.

## 4. Organização do Git e responsabilidades

Ordem obrigatória: **Rafael → Jullyane → Mateus → Luan → Rafael**. Um integrante conclui seu bloco de commits antes de o próximo começar. Para reduzir conflitos, usar a branch `main` e commits pequenos e sequenciais, com `git pull --ff-only` antes de começar e `git push` após cada commit validado. Não trabalhar simultaneamente nos mesmos arquivos. Cada integrante deve configurar `git config user.name` e `git config user.email` com sua identidade real, vinculada ao GitHub, e autenticar sua própria conta; nunca compartilhar credenciais ou atribuir artificialmente commits. Se a faculdade exigir branches ou pull requests, adaptar o fluxo mantendo a ordem e a autoria reais.

Comandos usuais (após criar o repositório):

```
git status
git add .
git commit -m "mensagem definida no plano"
git push origin main
```

**Importante:** os commits propostos são um plano de contribuição, não uma forma de simular participação. Cada integrante deve realmente executar, revisar e explicar o código que entrega.

## FASE 1 — Jullyane: inicialização e estrutura

### Commit 01 — Jullyane

**Implementação:** Criar o projeto Expo com template blank em JavaScript e confirmar execução no Expo Go.

**Prompt para a IA:**

> Inicialize o projeto FoodUMJ usando o template blank do Expo em JavaScript. Preserve a estrutura padrão gerada, ajuste o nome exibido do aplicativo para FoodUMJ e deixe App.js com uma tela inicial provisória contendo o texto “FoodUMJ: Receitas”. Não instale navegação nem implemente telas ainda.

**Mensagem do commit:** `chore: inicializa projeto Expo FoodUMJ`

**Verificação antes do commit:** `npx expo start` inicia e a tela provisória aparece no celular ou emulador.

### Commit 02 — Jullyane

**Implementação:** Instalar navegação e preparar diretórios e telas provisórias.

**Prompt para a IA:**

> Instale React Navigation com native stack e as dependências compatíveis com o Expo. Crie src/navigation/AppNavigator.js, as quatro telas HomeScreen, ResultsScreen, RecipeDetailsScreen e FavoritesScreen com textos provisórios, e conecte o App.js à navegação. Configure rotas Home, Results, Details e Favorites; a tela inicial deve abrir normalmente. Não implementar busca, API nem favoritos.

**Mensagem do commit:** `chore: configura navegacao e estrutura de telas`

**Verificação antes do commit:** App inicia sem erros; as quatro rotas existem e a Home é a inicial.

## FASE 2 — Rafael: pesquisa e resultados

### Commit 03 — Rafael

**Implementação:** Montar a tela inicial com título, campo e botão de pesquisa.

**Prompt para a IA:**

> Implemente HomeScreen com título FoodUMJ: Receitas, TextInput controlado por useState e botão Pesquisar. Ao pesquisar, valide texto não vazio, aplique trim e navegue para Results passando o termo como parâmetro. Mostre mensagem amigável se o campo estiver vazio. Inclua acesso à tela Favoritos na Home, sem implementar ainda sua lógica.

**Mensagem do commit:** `feat: cria tela inicial com pesquisa`

**Verificação antes do commit:** Pesquisa vazia não navega; pesquisa preenchida abre Resultados com o termo correto.

### Commit 04 — Rafael

**Implementação:** Criar serviço simples para consultar receitas por nome na API externa.

**Prompt para a IA:**

> Crie src/services/mealApi.js com uma função assíncrona searchRecipes(query) usando fetch e o endpoint TheMealDB search.php?s=. Use encodeURIComponent, confira response.ok, retorne um array vazio quando meals for null e lance erro legível para falhas de rede ou HTTP. Não faça a requisição na Home; não implemente detalhes ainda.

**Mensagem do commit:** `feat: adiciona servico de busca de receitas`

**Verificação antes do commit:** Verifique no código URL, tratamento de null e de erro; teste uma consulta real.

### Commit 05 — Rafael

**Implementação:** Exibir lista de receitas encontradas, estados de carregamento e erro.

**Prompt para a IA:**

> Implemente ResultsScreen lendo o termo da navegação, buscando dados com searchRecipes em useEffect e guardando lista, loading e error com useState. Use FlatList com RecipeCard exibindo imagem e nome; ao tocar, navegue para Details passando o idMeal. Exiba ActivityIndicator durante a consulta, mensagem para nenhum resultado e opção Tentar novamente em caso de erro. Inclua acesso a Favoritos. Não implemente a tela de detalhes agora.

**Mensagem do commit:** `feat: exibe resultados da pesquisa com estados de requisicao`

**Verificação antes do commit:** Busca conhecida mostra cards; busca inexistente mostra vazio; toque abre rota Details; falha mostra retry.

## FASE 3 — Mateus: detalhes e ingredientes

### Commit 06 — Mateus

**Implementação:** Adicionar consulta de receita por ID ao serviço externo.

**Prompt para a IA:**

> Amplie mealApi.js com getRecipeById(id), usando lookup.php?i= e fetch. Valide response.ok, retorne null quando meals for null ou vazio e trate erros com mensagem clara. Mantenha searchRecipes intacta.

**Mensagem do commit:** `feat: adiciona consulta de receita por id`

**Verificação antes do commit:** Consulta por ID válido retorna receita; ID inválido retorna null sem travar.

### Commit 07 — Mateus

**Implementação:** Construir a tela de detalhes com dados da receita.

**Prompt para a IA:**

> Implemente RecipeDetailsScreen recebendo idMeal da rota, chamando getRecipeById no useEffect e controlando recipe, loading e error com useState. Mostre nome, imagem e modo de preparo em ScrollView; trate loading, falha com botão Tentar novamente e receita não encontrada. Não implementar favoritos ainda.

**Mensagem do commit:** `feat: cria tela de detalhes da receita`

**Verificação antes do commit:** Detalhes abrem a partir de Resultados; loading, erro e inexistência têm interface.

### Commit 08 — Mateus

**Implementação:** Exibir ingredientes e medidas da receita.

**Prompt para a IA:**

> Na tela de detalhes, extraia os pares strIngredient1..20 e strMeasure1..20 da resposta TheMealDB, ignorando ingredientes vazios e espaços em branco. Mostre lista simples com medida e ingrediente, acima do modo de preparo. Não crie dependências extras; preserve os estados de carregamento e erro.

**Mensagem do commit:** `feat: apresenta ingredientes e medidas`

**Verificação antes do commit:** Ingredientes reais aparecem sem itens vazios e com medidas quando existirem.

## FASE 4 — Luan: favoritos compartilhados

### Commit 09 — Luan

**Implementação:** Criar contexto global de favoritos com useContext.

**Prompt para a IA:**

> Crie src/context/FavoritesContext.js com createContext, FavoritesProvider e hook useFavorites. Armazene array de receitas favoritas com useState. Exponha favorites, addFavorite(recipe), removeFavorite(idMeal) e isFavorite(idMeal); evite duplicatas por idMeal. Envolva AppNavigator com FavoritesProvider em App.js. Não use AsyncStorage nem API para favoritos.

**Mensagem do commit:** `feat: cria contexto global de favoritos`

**Verificação antes do commit:** Provider envolve navegação; adicionar duas vezes a mesma receita não duplica.

### Commit 10 — Luan

**Implementação:** Conectar botão de favoritar e desfavoritar nos detalhes.

**Prompt para a IA:**

> Na RecipeDetailsScreen, utilize useFavorites para mostrar botão “Adicionar aos favoritos” ou “Remover dos favoritos” de acordo com isFavorite(idMeal). Ao clicar, atualize o contexto com o objeto completo da receita, sem nova chamada à API. Não modifique a lógica de busca ou ingredientes.

**Mensagem do commit:** `feat: permite favoritar receitas nos detalhes`

**Verificação antes do commit:** Botão alterna corretamente e estado é compartilhado após navegar.

### Commit 11 — Luan

**Implementação:** Implementar tela de favoritos e remoção.

**Prompt para a IA:**

> Implemente FavoritesScreen consumindo useFavorites. Mostre FlatList com imagem e nome de cada receita salva; tocar abre Details com idMeal. Ofereça botão Remover em cada item e mensagem “Nenhuma receita favorita ainda” quando vazia. Garanta que os acessos à tela Favoritos já criados na Home e em Resultados funcionem.

**Mensagem do commit:** `feat: cria lista global de receitas favoritas`

**Verificação antes do commit:** Adicionar nos detalhes aparece na lista; remover atualiza a lista e o botão dos detalhes.

## FASE 5 — Jullyane e Rafael: integração, validação e entrega

### Commit 12 — Jullyane

**Implementação:** Revisar navegação e experiência mínima de ponta a ponta.

**Prompt para a IA:**

> Revise a integração de Home, Results, Details e Favorites. Corrija somente problemas de navegação, botões, textos em português, teclado na pesquisa, renderização de imagens e estados vazios. Não introduza recursos novos. Confirme o fluxo pesquisar → resultados → detalhes → favoritar → favoritos → remover.

**Mensagem do commit:** `fix: ajusta integracao e navegacao entre telas`

**Verificação antes do commit:** Fluxo completo funciona sem erros em dispositivo ou emulador.

### Commit 13 — Jullyane

**Implementação:** Reforçar tratamento de erros e verificar cenários obrigatórios.

**Prompt para a IA:**

> Audite as requisições e as telas existentes: loading visível, erro de rede com retry, HTTP não OK, resposta sem meals, pesquisa vazia, receita inexistente e ausência de favoritos. Faça apenas correções pequenas necessárias. Se for viável, evite atualizar estado após desmontagem da tela. Não adicionar bibliotecas de testes ou funcionalidades fora do escopo.

**Mensagem do commit:** `fix: melhora tratamento de erros e estados vazios`

**Verificação antes do commit:** Teste manualmente cada cenário; registre limitações que não puder reproduzir.

### Commit 14 — Rafael

**Implementação:** Finalizar README e orientações para apresentação.

**Prompt para a IA:**

> Crie ou atualize README.md com descrição, requisitos, stack, API utilizada, estrutura de pastas, instalação, execução com npx expo start, funcionalidades, limitações (favoritos apenas em memória), divisão real das contribuições, nomes Rafael/Jullyane/Mateus/Luan e roteiro breve de demonstração. Não declare testes que não foram executados e não invente links do GitHub. Revise package.json e .gitignore, sem alterações desnecessárias.

**Mensagem do commit:** `docs: documenta projeto e roteiro de apresentacao`

**Verificação antes do commit:** README permite rodar o app; repositório público tem código completo e histórico de quatro autores.

## 5. Critérios de aceite finais

- [ ] Aplicativo inicia pelo Expo sem erro.
- [ ] Tela inicial com campo de pesquisa e validação de texto vazio.
- [ ] Resultados obtidos da API externa, exibindo nome e imagem.
- [ ] Tela de detalhes com nome, imagem, ingredientes, medidas e modo de preparo.
- [ ] Favoritar e desfavoritar funcionam usando `useContext` e `useState`.
- [ ] Tela de favoritos atualiza imediatamente após inclusão/remoção.
- [ ] Navegação funcional entre as quatro telas.
- [ ] Indicador de carregamento, mensagens de erro e estados vazios.
- [ ] Repositório GitHub público, com commits reais dos quatro integrantes.
- [ ] Todos conseguem explicar o código e apresentar o aplicativo em funcionamento.

## 6. Roteiro de apresentação (divisão sugerida)

**Rafael (abertura e encerramento):** explicar objetivo, React Native, Expo, estrutura do projeto, navegação, integração final e execução. No encerramento, mostrar GitHub e histórico de commits.

**Jullyane:** demonstrar pesquisa na Home, passagem do termo, consumo do endpoint de busca, resultados e `useState`.

**Mateus:** abrir detalhes, explicar consulta por ID, extração de ingredientes/medidas e modo de preparo.

**Luan:** demonstrar adicionar/remover favoritos, explicar `FavoritesProvider`, `useContext` e estado compartilhado entre telas.

**Demonstração conjunta:** pesquisar “chicken”, abrir uma receita, favoritar, navegar até Favoritos, abrir a receita novamente e remover. Mostrar também busca sem resultados e carregamento/erro quando possível. Observação: a API pode retornar nomes e instruções em inglês; a interface do app permanece em português.

## 7. Checklist de Git antes da entrega

1. Confirmar que todos os commits representam trabalho real e têm autor correto: `git log --format="%h %an <%ae> %s"`.
2. Verificar que não há arquivos locais indevidos nem segredos versionados: `git status` e revisão de `.gitignore`.
3. Testar a instalação em outra máquina: `npm install` e `npx expo start`.
4. Confirmar que o repositório está **público** e que o README explica como executar.
5. Confirmar que todos os quatro integrantes sabem demonstrar e explicar suas implementações.

## 8. Observações e limites

A API TheMealDB oferece conteúdo externo, sujeito a disponibilidade e limites de uso. A busca por nome usa termos aceitos pela API; receitas podem vir em inglês. A lista de favoritos não persiste após reiniciar o app, pois a atividade exige compartilhamento global, não armazenamento permanente. Se o professor exigir persistência posteriormente, tratá-la como melhoria opcional separada, sem alterar o escopo dos 14 commits.
