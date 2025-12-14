# Webpack Frontend

Este é o ambiente configurado para estudar TypeScript com Webpack no frontend, separado do backend.

## Configuração

Este projeto está configurado para desenvolvimento frontend com:
- **TypeScript** para tipagem estática
- **Webpack 5** como bundler
- **Webpack Dev Server** para desenvolvimento com hot reload
- **ts-loader** para compilar TypeScript
- **HTML Webpack Plugin** para gerenciar o HTML

## Estrutura

- `src/index.ts`: Ponto de entrada do TypeScript
- `src/index.html`: Template HTML
- `webpack.config.js`: Configuração do Webpack
- `tsconfig.json`: Configuração do TypeScript
- `package.json`: Dependências e scripts npm

## Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em modo desenvolvimento
```bash
npm start
```
Ou:
```bash
npm run dev
```

Isso vai:
- Iniciar o webpack-dev-server na porta 3000
- Abrir o navegador automaticamente
- Ativar hot reload (mudanças são refletidas automaticamente)

### 3. Build para produção
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## Scripts disponíveis

- `npm start` - Inicia o servidor de desenvolvimento e abre o navegador
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção

## Observações

Este ambiente é **independente** e não depende de arquivos na raiz do projeto. Todas as configurações estão contidas nesta pasta para facilitar o estudo e exercícios futuros.
