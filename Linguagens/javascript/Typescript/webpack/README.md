# Webpack - Frontend e Backend# Webpack Frontend



Esta pasta contém dois projetos independentes para estudar TypeScript:Este é o ambiente configurado para estudar TypeScript com Webpack no frontend, separado do backend.



## 📁 Estrutura## Configuração



```Este projeto está configurado para desenvolvimento frontend com:

webpack/- **TypeScript** para tipagem estática

├── frontend/     # Aplicação frontend com Webpack- **Webpack 5** como bundler

└── backend/      # Servidor backend com Node.js + Express- **Webpack Dev Server** para desenvolvimento com hot reload

```- **ts-loader** para compilar TypeScript

- **HTML Webpack Plugin** para gerenciar o HTML

## 🎯 Frontend

## Estrutura

Ambiente configurado para desenvolvimento frontend com:

- TypeScript- `src/index.ts`: Ponto de entrada do TypeScript

- Webpack 5- `src/index.html`: Template HTML

- Webpack Dev Server (porta 3000)- `webpack.config.js`: Configuração do Webpack

- HTML Webpack Plugin- `tsconfig.json`: Configuração do TypeScript

- CSS/Style Loaders- `package.json`: Dependências e scripts npm



**Como usar:**## Como usar

```bash

cd frontend### 1. Instalar dependências

npm install```bash

npm startnpm install

``````



Ver mais detalhes em: [frontend/README.md](./frontend/README.md)### 2. Rodar em modo desenvolvimento

```bash

## 🚀 Backendnpm start

```

Ambiente configurado para desenvolvimento backend com:Ou:

- TypeScript```bash

- Node.jsnpm run dev

- Express```

- ts-node para desenvolvimento

Isso vai:

**Como usar:**- Iniciar o webpack-dev-server na porta 3000

```bash- Abrir o navegador automaticamente

cd backend- Ativar hot reload (mudanças são refletidas automaticamente)

npm install

npm run dev### 3. Build para produção

``````bash

npm run build

Ver mais detalhes em: [backend/README.md](./backend/README.md)```



## 🔄 Executando ambosOs arquivos otimizados serão gerados na pasta `dist/`.



Para rodar frontend e backend simultaneamente, abra dois terminais:## Scripts disponíveis



**Terminal 1 (Frontend):**- `npm start` - Inicia o servidor de desenvolvimento e abre o navegador

```bash- `npm run dev` - Inicia o servidor de desenvolvimento

cd frontend- `npm run build` - Gera build de produção

npm start

```## Observações



**Terminal 2 (Backend):**Este ambiente é **independente** e não depende de arquivos na raiz do projeto. Todas as configurações estão contidas nesta pasta para facilitar o estudo e exercícios futuros.

```bash
cd backend
npm run dev
```

- Frontend estará em: http://localhost:3000
- Backend estará em: http://localhost:3001

## 📝 Observações

Ambos os projetos são **totalmente independentes** e não compartilham dependências. Cada um tem seu próprio:
- `package.json`
- `tsconfig.json`
- `node_modules/`
- Configurações específicas

Isso permite estudar e modificar cada um separadamente sem interferir no outro.
