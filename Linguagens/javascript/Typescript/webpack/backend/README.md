# Webpack Backend

Este é o ambiente configurado para estudar TypeScript com Node.js no backend, separado do frontend.

## Configuração

Este projeto está configurado para desenvolvimento backend com:
- **TypeScript** para tipagem estática
- **Node.js** como runtime
- **Express** como framework web
- **ts-node** para executar TypeScript diretamente sem compilar

## Estrutura

- `src/index.ts`: Ponto de entrada do servidor
- `tsconfig.json`: Configuração do TypeScript
- `package.json`: Dependências e scripts npm

## Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo desenvolvimento
```bash
npm run dev
```

Isso vai iniciar o servidor com **ts-node** na porta 3001.

### 3. Build para produção
```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `dist/`.

### 4. Rodar a versão compilada
```bash
npm start
```

## Scripts disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com ts-node
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a versão compilada
- `npm run watch` - Compila em modo watch (recompila ao salvar)

## Rotas de exemplo

- `GET /` - Rota principal com mensagem de boas-vindas
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Busca um usuário por ID

## Observações

Este ambiente é **independente** e não depende de arquivos na raiz do projeto. Todas as configurações estão contidas nesta pasta para facilitar o estudo e exercícios futuros.

O servidor roda por padrão na porta **3001** para não conflitar com o frontend que roda na porta 3000.
