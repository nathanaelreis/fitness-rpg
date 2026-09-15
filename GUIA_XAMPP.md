# 🎮 Fitness RPG - Guia de Execução Local com XAMPP

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **XAMPP** (versão 7.4 ou superior)
  - [Download XAMPP](https://www.apachefriends.org/)
- **Node.js** (versão 16 ou superior)
  - [Download Node.js](https://nodejs.org/)
- **npm** (incluído com Node.js)

## 🚀 Passo 1: Compilar o Projeto

O projeto já foi compilado e os arquivos estão em `apps/web/dist/`.

Se precisar recompilar em qualquer momento, execute:

```bash
npm run build
```

## 📁 Passo 2: Configurar no XAMPP

### Windows

1. **Localize o diretório XAMPP**
   - Padrão: `C:\xampp\htdocs`

2. **Crie uma pasta para a aplicação** (opcional, mas recomendado)
   ```
   C:\xampp\htdocs\fitness-rpg
   ```

3. **Copie os arquivos compilados**
   - Copie todo o conteúdo de `apps/web/dist/` para:
	 - Se criou pasta: `C:\xampp\htdocs\fitness-rpg/`
	 - Se copiou direto: `C:\xampp\htdocs/`

### macOS/Linux

1. **Localize o diretório XAMPP**
   - Padrão: `/Applications/XAMPP/htdocs`

2. **Crie uma pasta para a aplicação** (opcional)
   ```bash
   mkdir -p /Applications/XAMPP/htdocs/fitness-rpg
   ```

3. **Copie os arquivos compilados**
   ```bash
   cp -r apps/web/dist/* /Applications/XAMPP/htdocs/fitness-rpg/
   ```

## 🔧 Passo 3: Iniciar o XAMPP

### Windows

1. Abra o **XAMPP Control Panel**
2. Clique em **Start** para o Apache
   - Aguarde até ver "Running" em verde

### macOS/Linux

```bash
sudo /Applications/XAMPP/bin/xampp start
```

## 🌐 Passo 4: Acessar a Aplicação

Abra seu navegador e acesse:

**Se copiou os arquivos diretamente para htdocs:**
```
http://localhost/
http://localhost:80/
```

**Se criou a pasta fitness-rpg:**
```
http://localhost/fitness-rpg/
http://localhost/fitness-rpg/index.html
```

## 📝 Arquivo .htaccess

O arquivo `.htaccess` (incluído em `apps/web/dist/`) é essencial para que a aplicação funcione corretamente. Ele:

- Ativa o módulo de reescrita de URLs (`mod_rewrite`)
- Redireciona todas as requisições para `index.html`
- Permite que as rotas da aplicação React funcionem adequadamente

**Certifique-se de que:**
- O arquivo `.htaccess` está no mesmo diretório que `index.html`
- O Apache tem o módulo `mod_rewrite` habilitado

### Verificar se mod_rewrite está habilitado

1. Abra o XAMPP Control Panel
2. Clique em **Config** → **Apache (httpd.conf)**
3. Procure por: `#LoadModule rewrite_module`
4. Se estiver comentado (começar com `#`), remova o `#`:
   ```
   LoadModule rewrite_module modules/mod_rewrite.so
   ```
5. Salve e reinicie o Apache

## 🛠️ Comandos Úteis

### Desenvolvimento Local (com Hot Reload)

Se quiser desenvolver com recarregamento automático:

```bash
npm run dev
```

Isso abre a aplicação em `http://localhost:5173/` com reload automático.

### Compilar Novamente

```bash
npm run build
```

### Limpar Build Anterior

```bash
rm -r apps/web/dist
npm run build
```

## ❌ Resolução de Problemas

### Página branca ou erro 404

**Problema:** A aplicação exibe página branca ou erro de rota.

**Solução:**
1. Verifique se o arquivo `.htaccess` está no diretório correto
2. Verifique se o `mod_rewrite` está habilitado no Apache
3. Reinicie o Apache no XAMPP Control Panel
4. Limpe o cache do navegador (Ctrl+F5 ou Cmd+Shift+R)

### Erro: "Cannot GET /"

**Problema:** Apache não consegue encontrar os arquivos.

**Solução:**
1. Verifique o caminho dos arquivos em `htdocs`
2. Certifique-se de que `index.html` existe
3. Verifique as permissões da pasta

### Erro: "mod_rewrite not enabled"

**Solução:**
1. Abra `C:\xampp\apache\conf\httpd.conf` (Windows)
2. Procure por `LoadModule rewrite_module`
3. Remova o `#` no início da linha se presente
4. Salve e reinicie o Apache

## 📚 Estrutura do Projeto

```
fitness-rpg/
├── apps/
│   └── web/
│       ├── src/          # Código fonte React
│       ├── dist/         # Build compilado (copiar para XAMPP)
│       │   ├── index.html
│       │   ├── .htaccess
│       │   └── assets/
│       └── vite.config.ts
├── packages/
│   └── shared/           # Código compartilhado
└── package.json
```

## 🎯 Próximos Passos

1. Confirmou que Apache está rodando? ✓
2. Copiou os arquivos para `htdocs`? ✓
3. Acessou no navegador? ✓
4. Vendo a aplicação Fitness RPG? 🎉

Se tudo funcionou, você está pronto para usar a aplicação!

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12 → Console)
2. Verifique os logs do Apache em XAMPP Control Panel
3. Certifique-se de que porta 80 (ou configurada) não está em uso
4. Tente acessar `http://localhost/xampp/` para verificar se XAMPP está funcionando

---

**Desenvolvido com ❤️ usando React + Vite**
