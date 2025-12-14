# 📦 Guia de Instalação e Distribuição do RH-OS

## ✅ Status do Build

**Instalador criado com sucesso!**
- 📍 Localização: `dist/RH-OS-1.0.0.AppImage`
- 💾 Tamanho: **115 MB**
- 🖥️ Plataforma: Linux (AppImage - compatível com a maioria das distribuições)

## 🚀 Para o Usuário Final

### Instalação no Linux

1. **Faça o download do arquivo**:
   ```bash
   RH-OS-1.0.0.AppImage
   ```

2. **Torne o arquivo executável**:
   ```bash
   chmod +x RH-OS-1.0.0.AppImage
   ```

3. **Execute o aplicativo**:
   ```bash
   ./RH-OS-1.0.0.AppImage
   ```

   Ou simplesmente clique duas vezes no arquivo no gerenciador de arquivos.

### ⚠️ Pré-requisitos

**IMPORTANTE**: O aplicativo requer MySQL instalado e rodando no sistema.

#### Instalando MySQL no Ubuntu/Debian:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

#### Instalando MySQL no Fedora:
```bash
sudo dnf install mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

#### Configurando o Banco de Dados:

1. Acesse o MySQL:
```bash
sudo mysql -u root -p
```

2. Crie o banco de dados:
```sql
CREATE DATABASE rhos_db;
CREATE USER 'rhos_user'@'localhost' IDENTIFIED BY 'senha_segura';
GRANT ALL PRIVILEGES ON rhos_db.* TO 'rhos_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

3. Importe o schema do banco:
```bash
mysql -u rhos_user -p rhos_db < database.sql
```

## 🛠️ Para Desenvolvedores

### Criando Instaladores para Outras Plataformas

#### Windows (de um sistema Linux - requer Wine):

1. Instale dependências:
```bash
sudo apt install wine64  # Ubuntu/Debian
# ou
sudo dnf install wine    # Fedora
```

2. Crie o instalador:
```bash
npm run build:win
```

Resultado: `dist/RH-OS-1.0.0-Setup.exe`

#### macOS (requer um Mac):

```bash
npm run build:mac
```

Resultado: `dist/RH-OS-1.0.0.dmg`

#### Linux (AppImage + DEB):

```bash
npm run build:linux
```

Resultados:
- `dist/RH-OS-1.0.0.AppImage`
- `dist/RH-OS-1.0.0.deb` (se as dependências estiverem instaladas)

#### Todos de uma vez:

```bash
npm run dist
```

### Resolvendo Problemas de Build

#### Erro: "node-gyp does not support cross-compiling"

Este erro ocorre ao tentar compilar para Windows em um sistema Linux. Soluções:

1. **Use Wine** (recomendado para desenvolvimento):
   ```bash
   sudo apt install wine64
   ```

2. **Compile em um sistema Windows** (recomendado para produção)

3. **Desabilite rebuild de módulos nativos** (já configurado):
   ```yaml
   # electron-builder.yml
   npmRebuild: false
   ```

#### Erro: "libcrypt.so.1: cannot open shared object file"

Para criar pacotes .deb no Fedora, instale:
```bash
sudo dnf install libxcrypt-compat
```

## 📋 O que está Incluído no Instalador

✅ **Frontend React** (Interface do usuário)
✅ **Backend Node.js/Express** (API REST)
✅ **Electron** (Container desktop)
✅ **Todas as dependências Node.js**
✅ **Assets e recursos estáticos**

❌ **Não Incluído** (requer instalação separada):
- MySQL Server
- Node.js (não necessário no sistema final)

## 🎯 Como o Aplicativo Funciona

1. **Usuário executa o RH-OS.AppImage**
2. **Electron inicia o processo principal**
3. **Backend Express é iniciado automaticamente** na porta 4040
4. **Interface React carrega** e se conecta ao backend local
5. **Usuário faz login** e usa o sistema normalmente

Todo o processo é transparente para o usuário final!

## 🔧 Configuração Pós-Instalação

Após a primeira execução, o usuário pode precisar configurar:

1. **Conexão com banco de dados** (via arquivo de configuração ou interface)
2. **Porta do servidor** (se 4040 estiver ocupada)
3. **Primeiro usuário admin** (via script SQL)

### Criando Usuário Admin Inicial:

```sql
-- Senha: admin123 (hash bcrypt)
INSERT INTO users (full_name, email, login, password, cpf, birth_date, status)
VALUES (
  'Administrador',
  'admin@rhos.local',
  'admin',
  '$2b$10$XYZ...', -- hash bcrypt de "admin123"
  '00000000000',
  '1990-01-01',
  1
);

-- Atribuir perfil admin
INSERT INTO user_profiles (user_id, profile_id)
VALUES (LAST_INSERT_ID(), 1);
```

## 📤 Distribuindo o Instalador

### Opções de Distribuição:

1. **Download Direto**:
   - Hospede o .AppImage em seu servidor
   - Compartilhe via link direto

2. **GitHub Releases**:
   ```bash
   gh release create v1.0.0 dist/RH-OS-1.0.0.AppImage
   ```

3. **Servidor de Atualizações**:
   - Configure o electron-builder para auto-update
   - Hospede os arquivos em um servidor

4. **Intranet Corporativa**:
   - Compartilhe via rede interna
   - Deploy via sistemas de gestão de software

## 🔒 Segurança

- ✅ Tokens JWT para autenticação
- ✅ Senhas hasheadas com bcrypt
- ✅ CORS configurado
- ✅ Validação de inputs com Joi
- ✅ Sistema de logs e auditoria

## 📊 Tamanhos dos Instaladores

| Plataforma | Formato | Tamanho Estimado |
|------------|---------|------------------|
| Linux      | AppImage| ~115 MB          |
| Linux      | .deb    | ~105 MB          |
| Windows    | .exe    | ~130 MB          |
| macOS      | .dmg    | ~135 MB          |

## 🆘 Suporte

Para problemas ou dúvidas:

1. Verifique o README.md principal
2. Consulte os logs da aplicação
3. Abra uma issue no GitHub
4. Entre em contato com o desenvolvedor

---
