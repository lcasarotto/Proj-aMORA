# aMORA - Simulador de Financiamento Imobiliário

<div align="center">
  
  ![aMORA Logo](Frontend/assets/logo_amora_blue.png)
  
  **Um simulador completo de financiamento imobiliário desenvolvido com arquitetura full-stack moderna**
  
  [![Node.js](https://img.shields.io/badge/Node.js-18.17+-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
  [![Jest](https://img.shields.io/badge/Jest-30.0+-red.svg)](https://jestjs.io/)
  [![Coverage](https://img.shields.io/badge/Coverage-91.66%25-brightgreen.svg)](./Backend/coverage)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
  
  [🚀 Demonstração](#-como-executar) •
  [📖 Documentação](#-documentação) •
  [🧪 Testes](#-executar-testes) •
  [🤝 Contribuir](./CONTRIBUTING.md)
  
</div>

---

## 🚀 Características

- ✅ **API REST robusta** com validações completas
- ✅ **Interface moderna e responsiva** para todos os dispositivos  
- ✅ **Cálculos financeiros precisos** seguindo a especificação
- ✅ **Validação client/server-side** para máxima confiabilidade
- ✅ **Testes automatizados** com alta cobertura (91.66%)
- ✅ **Documentação completa** para desenvolvedores
- ✅ **Tratamento de erros robusto** em todas as camadas
- ✅ **UX polida** com loading states e notificações


> **💡 Dica:** Acesse a [demonstração ao vivo](#-como-executar) para testar todas as funcionalidades!

## 📋 Funcionalidades

### Simulação de Financiamento
- Entrada de valor do imóvel (qualquer valor positivo)
- Seleção de percentual de entrada (5% a 20%)
- Escolha do prazo de contrato (1 a 5 anos)
- Cálculo automático de:
  - Valor da entrada
  - Valor a ser financiado
  - Total a guardar (20% do valor financiado)
  - Parcela mensal para guardar

### Interface do Usuário
- Design responsivo e moderno
- Máscaras automáticas para valores monetários
- Slider interativo para percentual
- Feedback visual com loading states
- Notificações toast informativas
- Salvamento local de resultados

### API Backend
- Validação robusta de dados de entrada
- Tratamento de erros padronizado
- Documentação completa dos endpoints
- Testes unitários abrangentes
- Middleware de segurança (CORS, Helmet)

## 🛠️ Tecnologias

<div align="center">

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

**Node.js** • **Express.js** • **Joi** • **Jest** • **Helmet** • **CORS**

### Frontend
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)

**HTML5** • **CSS3** • **JavaScript ES6+** • **Fetch API** • **LocalStorage**

### Ferramentas
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://code.visualstudio.com/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

</div>

### 🎯 Detalhes Técnicos

#### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Joi** - Validação de schemas robusta
- **Jest** - Framework de testes com coverage
- **Helmet** - Middleware de segurança HTTP
- **CORS** - Cross-Origin Resource Sharing

#### Frontend  
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilos modernos com Grid/Flexbox
- **JavaScript ES6+** - Lógica da aplicação modular
- **Fetch API** - Comunicação HTTP assíncrona
- **LocalStorage** - Persistência local de dados

## 📁 Estrutura do Projeto

```
aMORA/
├── Backend/                 # API REST em Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── routes/          # Definição das rotas
│   │   ├── middlewares/     # Middlewares customizados
│   │   └── utils/           # Utilitários e helpers
│   ├── tests/              # Testes automatizados
│   ├── package.json        # Dependências do backend
│   └── README.md           # Documentação específica
│
├── Frontend/               # Interface web
│   ├── css/               # Estilos CSS
│   ├── js/                # JavaScript modular
│   ├── assets/            # Recursos estáticos
│   ├── index.html         # Página principal
│   └── README.md          # Documentação específica
│
└── Documentação/          # Documentação do projeto
    ├── API_SPEC.md        # Especificação da API
    ├── CHECKLIST.md       # Lista de tarefas
    ├── ESTRUTURA_PROJETO.md # Arquitetura
    └── REQUISITOS.md      # Requisitos funcionais
```

## 🚦 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Navegador web moderno

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd amora
```

### 2. Configure o Backend
```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3. Configure o Frontend
```bash
cd ../Frontend
# Abra o index.html em um navegador ou use um servidor local
# Exemplo com Python:
python -m http.server 3000
# Ou com Node.js:
npx serve . -p 3000
```

O frontend estará acessível em `http://localhost:3000`

### 4. Teste a aplicação
1. Acesse o frontend no navegador
2. Preencha o formulário com:
   - Valor do imóvel: R$ 400.000,00
   - Percentual de entrada: 5%
   - Anos de contrato: 3 anos
3. Clique em "Simular Financiamento"
4. Verifique os resultados calculados

## 🧪 Executar Testes

### Backend
```bash
cd Backend
npm test
```

Os testes cobrem:
- Validações de entrada
- Cálculos financeiros
- Tratamento de erros
- Endpoints da API

## 📊 Exemplo de Uso

### Entrada
```json
{
  "valor_imovel": 400000,
  "percentual_entrada": 5,
  "anos_contrato": 3
}
```

### Saída
```json
{
  "success": true,
  "data": {
    "valor_imovel": 400000,
    "percentual_entrada": 5,
    "anos_contrato": 3,
    "valor_entrada": 20000,
    "valor_financiado": 380000,
    "total_a_guardar": 76000,
    "parcela_mensal": 2111.11,
    "meses_contrato": 36,
    "formatted": {
      "valor_imovel": "R$ 400.000,00",
      "valor_entrada": "R$ 20.000,00",
      "valor_financiado": "R$ 380.000,00",
      "total_a_guardar": "R$ 76.000,00",
      "parcela_mensal": "R$ 2.111,11"
    }
  }
}
```

## 📈 Estatísticas do Projeto

<div align="center">

| Métrica | Valor | Badge |
|---------|-------|-------|
| **Cobertura de Testes** | 91.66% | ![Coverage](https://img.shields.io/badge/Coverage-91.66%25-brightgreen) |
| **Linhas de Código** | ~2.000 | ![LOC](https://img.shields.io/badge/LOC-2000+-blue) |
| **Arquivos** | 15+ | ![Files](https://img.shields.io/badge/Files-15+-orange) |
| **Tempo de Resposta** | <50ms | ![Response](https://img.shields.io/badge/Response-<50ms-green) |
| **Responsividade** | 320px+ | ![Mobile](https://img.shields.io/badge/Mobile-Ready-purple) |

</div>

## 🔧 Comandos Úteis

### Backend
```bash
npm run dev      # Modo desenvolvimento com auto-reload
npm start        # Modo produção
npm test         # Executar testes
npm test:watch   # Testes em modo watch
```

### Verificação de Health
```bash
curl http://localhost:3001/health
```

## 🔐 Segurança

- Validação rigorosa de entrada (client + server)
- Headers de segurança com Helmet.js
- CORS configurado adequadamente
- Tratamento seguro de erros
- Sanitização de dados de entrada

## 📱 Responsividade

O frontend é totalmente responsivo e funciona perfeitamente em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+) 
- 💻 Notebooks (1024px+)
- 🖥️ Desktops (1440px+)

## 🐛 Solução de Problemas

### Backend não inicia
1. Verifique se o Node.js está instalado: `node --version`
2. Instale as dependências: `npm install`
3. Verifique se a porta 3001 está livre

### Frontend não carrega dados
1. Verifique se o backend está rodando
2. Abra o console do navegador para ver erros
3. Verifique se há bloqueios de CORS

### Testes falhando
1. Certifique-se de que não há outros processos na porta 3001
2. Execute `npm install` novamente
3. Verifique se o arquivo `.env` existe

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.


## 👨‍💻 Desenvolvedor

<div align="center">


Demonstrando habilidades em:
- 🔧 **Desenvolvimento Full-Stack**
- 🏗️ **Arquitetura de Software**
- 🧪 **Testes Automatizados**
- 📚 **Documentação Técnica**
- 🎨 **UX/UI Design**

</div>

## 🙏 Agradecimentos

- **Express.js** pela simplicidade e robustez
- **Jest** pelo framework de testes excepcional
- **Joi** pela validação elegante
- **MDN Web Docs** pela documentação impecável
- **VS Code** pela melhor IDE do mundo

---

<div align="center">

**🏠 aMORA - Simplificando o financiamento imobiliário com tecnologia moderna! ✨**

[⬆ Voltar ao topo](#amora---simulador-de-financiamento-imobiliário)

</div>
