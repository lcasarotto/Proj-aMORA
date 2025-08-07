# 🤝 Guia de Contribuição - aMORA

Obrigado por considerar contribuir com o projeto aMORA! Este documento contém diretrizes para contribuições.

## 📋 Antes de Contribuir

- Verifique se não existe uma issue similar já aberta
- Leia a documentação do projeto
- Execute os testes para garantir que tudo está funcionando

## 🚀 Como Contribuir

### 1. Fork e Clone
```bash
# Fork este repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/amora.git
cd amora
```

### 2. Configure o Ambiente
```bash
# Backend
cd Backend
npm install

# Volte para a raiz
cd ..
```

### 3. Crie uma Branch
```bash
git checkout -b feature/nome-da-sua-feature
# ou
git checkout -b fix/nome-do-bug
```

### 4. Faça suas Alterações
- Mantenha o código limpo e bem documentado
- Siga os padrões existentes do projeto
- Adicione testes para novas funcionalidades
- Certifique-se de que todos os testes passam

### 5. Execute os Testes
```bash
cd Backend
npm test
```

### 6. Commit suas Alterações
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

**Padrões de Commit:**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` apenas documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` manutenção

### 7. Push e Pull Request
```bash
git push origin feature/nome-da-sua-feature
```

Abra um Pull Request no GitHub com:
- Título claro e descritivo
- Descrição detalhada das mudanças
- Screenshots se aplicável
- Referência a issues relacionadas

## 🧪 Executando Testes

```bash
# Testes do backend
cd Backend
npm test

# Para cobertura detalhada
npm test -- --coverage
```

## 📝 Padrões de Código

### JavaScript
- Use ES6+ features
- Prefira `const` e `let` ao invés de `var`
- Use arrow functions quando apropriado
- Mantenha funções pequenas e focadas

### CSS
- Use classes BEM quando possível
- Mantenha estilos organizados
- Use variáveis CSS para cores e espaçamentos

### Documentação
- Comente código complexo
- Mantenha READMEs atualizados
- Use JSDoc para funções importantes

## 🐛 Reportando Bugs

Use o template de issue para bugs:

**Descrição do Bug**
Descrição clara e concisa do bug.

**Para Reproduzir**
Passos para reproduzir o comportamento:
1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

**Comportamento Esperado**
Descrição clara do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 120]
- Node.js: [e.g. 18.17.0]

## 💡 Solicitando Funcionalidades

Para solicitar novas funcionalidades:

1. **Verifique** se não existe uma solicitação similar
2. **Descreva** a funcionalidade detalhadamente
3. **Explique** por que seria útil
4. **Considere** alternativas

## 📞 Dúvidas?

Se tiver dúvidas sobre contribuições:

1. Consulte a documentação em `/Documentação/`
2. Verifique issues existentes
3. Abra uma issue com a tag `question`

## 🏆 Reconhecimento

Todos os contribuidores serão listados no README principal do projeto.

---

**Obrigado por contribuir com o aMORA!** 🏠✨
