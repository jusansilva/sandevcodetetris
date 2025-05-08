# Tetris Expo App

Este é um projeto do jogo Tetris desenvolvido com [Expo](https://expo.dev) e React Native.

## Funcionalidades

- Jogo Tetris clássico com controles por teclado e gestos (mobile)
- Cadastro de usuário com nome e e-mail
- Persistência de usuário local (AsyncStorage/localStorage)
- Integração com backend para salvar dados do usuário
- Interface responsiva para web e mobile

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repo-tetris.git
   cd seu-repo-tetris
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o app:

   ```bash
   npx expo start
   ```

## Como jogar

- **Web:** Use as setas do teclado para mover e girar as peças. Barra de espaço para queda rápida.
- **Mobile:** Use gestos (arrastar para os lados, para cima e para baixo) para controlar as peças.

## Cadastro de Usuário

Ao iniciar o app, informe seu nome e e-mail. Os dados são salvos localmente e enviados para o backend (ver seção Backend).

## Backend (opcional)

Para salvar os dados do usuário em um banco MongoDB, utilize um backend Node.js/Express. Exemplo básico:

```js
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/tetris');
const User = mongoose.model('User', { name: String, email: String, point: String, level: String });
app.post('/api/user', async (req, res) => {
  const user = await User.create(req.body);
  res.json({ user });
});
app.listen(21029, () => console.log('Backend rodando na porta 21029'));
```

## Estrutura do Projeto

- **/app**: Código principal do app e rotas
- **/components**: Componentes reutilizáveis (Menu, ThemedView, etc)
- **/hooks**: Hooks customizados (ex: usePlayer)
- **/business**: Lógica do jogo e utilitários (Input, Tetrominoes, etc)
- **/assets**: Imagens e recursos estáticos

## Personalização

- Edite os arquivos em **/app** e **/components** para modificar o visual ou regras do jogo.
- Para alterar a lógica das peças, veja **/business/Tetrominoes.ts**.

## Recursos

- [Documentação Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)

## Licença

MIT

---
Desenvolvido por [Seu Nome]
