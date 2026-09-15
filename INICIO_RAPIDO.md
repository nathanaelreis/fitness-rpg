# 🚀 GUIA RÁPIDO - Fitness RPG com XAMPP

## ⚡ Instalação em 5 Minutos

### Windows

```bash
# 1. Execute o script de cópia
copiar-para-xampp.bat

# 2. Escolha opção 1 (recomendado)
# 3. Aguarde...
# 4. Pressione qualquer tecla para sair
```

### macOS/Linux

```bash
# 1. Dê permissão ao script
chmod +x copiar-para-xampp.sh

# 2. Execute o script
./copiar-para-xampp.sh

# 3. Escolha opção 1 (recomendado)
# 4. Aguarde...
```

---

## ⚙️ Configurando Apache

1. Abra **XAMPP Control Panel**
2. Clique em **Config** (XAMPP, não Apache)
3. Abre arquivo `httpd.conf`
4. Procure por: `#LoadModule rewrite_module`
5. **Remova o `#`** da frente
6. Salve o arquivo
7. Volte e clique **Start** em Apache
8. Aguarde aparecer "Running" em verde

---

## 🌐 Acessar Aplicação

Abra seu navegador:

```
http://localhost/
```

Ou se criou pasta:

```
http://localhost/fitness-rpg/
```

---

## 🐛 Algo não funcionou?

### Página branca?
- [ ] Verificou se Apache está rodando?
- [ ] mod_rewrite está ativado?
- [ ] Reiniciou Apache depois de alterar httpd.conf?

### Erro 404?
- [ ] Verifique se .htaccess está em `C:\xampp\htdocs` ou `C:\xampp\htdocs\fitness-rpg`
- [ ] Limpe cache do navegador (Ctrl+F5)

### Arquivos CSS/JS não carregam?
- [ ] Verifique a URL no console do navegador (F12 → Console)
- [ ] Certifique-se de estar acessando a URL correta

---

## 📖 Documentação Completa

- **README.md** - Visão geral
- **GUIA_XAMPP.md** - Guia detalhado
- **CONFIGURACAO_TECNICA.md** - Referência técnica
- **CHECKLIST_VERIFICACAO.md** - Verificação de configuração

---

## 🔄 Desenvolvimento

Se quiser fazer alterações:

```bash
# Editar código
npm run dev

# Quando pronto, compilar
npm run build

# Copiar para XAMPP novamente
copiar-para-xampp.bat  # Windows
./copiar-para-xampp.sh # macOS/Linux
```

---

**Fitness RPG está pronto para rodar! 🎮**
