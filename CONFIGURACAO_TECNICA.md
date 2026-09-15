# Configuração do Projeto Fitness RPG para XAMPP

## 📌 Informações do Projeto

- **Nome:** Fitness RPG
- **Versão:** 0.0.1
- **Tipo:** Single Page Application (SPA)
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Linguagem:** TypeScript

## 🏗️ Estrutura

```
fitness-rpg/
├── apps/                 # Aplicações
│   └── web/             # Aplicação web React
│       ├── src/         # Código fonte
│       ├── dist/        # Build compilado (copiar para XAMPP)
│       ├── index.html   # Template HTML
│       └── vite.config.ts
├── packages/            # Pacotes compartilhados
│   └── shared/         # Código compartilhado entre projetos
├── node_modules/        # Dependências
└── package.json         # Configuração root
```

## 🚀 Scripts Disponíveis

### No diretório raiz

```bash
# Instalar dependências
npm install

# Compilar para produção
npm run build

# Iniciar em desenvolvimento (hot reload)
npm run dev

# Pré-visualizar build de produção
npm run preview
```

### No diretório apps/web

Os mesmos comandos acima funcionam com escopo:

```bash
npm run --workspace=apps/web dev
npm run --workspace=apps/web build
```

## 📦 Dependências

### Produção
- `react@18.3.1` - Biblioteca UI
- `react-dom@18.3.1` - Renderização DOM
- `@fitness-rpg/shared` - Pacote compartilhado

### Desenvolvimento
- `typescript@5.4.5` - Tipagem
- `vite@5.3.4` - Build tool
- `@vitejs/plugin-react@4.3.1` - Plugin React para Vite

## 🔧 Configuração XAMPP

### Arquivo .htaccess

O arquivo `apps/web/dist/.htaccess` é essencial para SPA routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

**Função:** Redireciona todas as requisições para `index.html`, permitindo que o React Router funcione corretamente.

### Módulos Apache Necessários

- ✅ `mod_rewrite` - Ativado (essencial para SPA routing)
- ✅ `mod_mime` - Geralmente ativado por padrão
- ✅ `mod_dir` - Geralmente ativado por padrão

## 📝 Arquivo vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
	alias: { "@fitness-rpg/shared": "../../packages/shared/src/index.ts" },
  },
});
```

**Configuração:**
- Plugin React para JSX e Fast Refresh
- Alias para importar código compartilhado facilmente

## 🔄 Fluxo de Desenvolvimento

### 1. Desenvolvimento Local
```bash
npm run dev
```
- Acessa em `http://localhost:5173` (porta padrão Vite)
- Hot reload automático
- Mapa de erro detalhado

### 2. Build para Produção
```bash
npm run build
```
- Compila TypeScript
- Otimiza com Vite
- Gera arquivos em `apps/web/dist`
- Pronto para XAMPP

### 3. Deploy em XAMPP
```bash
# Windows
copiar-para-xampp.bat

# macOS/Linux
chmod +x copiar-para-xampp.sh
./copiar-para-xampp.sh
```

### 4. Acessar via Navegador
```
http://localhost/ (ou http://localhost/fitness-rpg/)
```

## 🐛 Possíveis Problemas

### Problema: Página branca ao acessar
- **Causa:** Arquivo `.htaccess` não encontrado ou `mod_rewrite` desativado
- **Solução:** Verifique o `.htaccess` em `dist/` e ative `mod_rewrite` no Apache

### Problema: Erro 404 em rotas específicas
- **Causa:** `mod_rewrite` não está habilitado
- **Solução:** Edite `httpd.conf` e descomente `LoadModule rewrite_module`

### Problema: Assets CSS/JS não carregam
- **Causa:** Caminho relativo incorreto
- **Solução:** Verifique se está acessando via raiz correta (com ou sem `/fitness-rpg/`)

### Problema: Permissão negada ao copiar
- **Causa:** Pasta `htdocs` sem permissão de escrita
- **Solução:** Execute script como administrador (Windows) ou com `sudo` (macOS/Linux)

## 📊 Build Output

Tamanho dos arquivos compilados:
- `index.html` - ~0.76 KB (0.41 KB gzip)
- `assets/index-C5prYeIk.css` - 18.63 KB (4.20 KB gzip)
- `assets/index-B0gc-CQm.js` - 156.10 KB (50.37 KB gzip)

**Total:** ~175 KB (55 KB comprimido)

## 🔐 Segurança

- TypeScript garante segurança de tipos
- React.StrictMode para detectar problemas
- Dependências auditadas (`npm audit`)
- Compilação otimizada para produção

## 📚 Referências

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)
- [XAMPP Documentation](https://www.apachefriends.org/docs/index.html)

## ✅ Checklist de Setup

- [ ] Node.js e npm instalados
- [ ] XAMPP instalado e funcionando
- [ ] `npm install` executado
- [ ] `npm run build` executado com sucesso
- [ ] Arquivos copiados para `htdocs`
- [ ] `mod_rewrite` ativado no Apache
- [ ] `.htaccess` presente em `dist/`
- [ ] Apache reiniciado após alterações
- [ ] Aplicação acessível em navegador
- [ ] Todas as rotas funcionando corretamente

---

**Projeto: Fitness RPG | Framework: React + Vite | Deploy: XAMPP Apache**
