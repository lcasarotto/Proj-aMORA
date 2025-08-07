# Estrutura do Projeto - Simulador aMORA

## Arquitetura Geral

```
Amora/
├── Backend/                 # API Express.js
│   ├── src/
│   │   ├── controllers/     # Controladores da API
│   │   ├── middleware/      # Middlewares personalizados
│   │   ├── routes/          # Definição das rotas
│   │   ├── services/        # Lógica de negócio
│   │   ├── utils/           # Utilitários e helpers
│   │   ├── validators/      # Validadores de entrada
│   │   └── app.js          # Configuração do Express
│   ├── tests/              # Testes unitários e integração
│   ├── .env.example        # Exemplo de variáveis de ambiente
│   ├── .gitignore
│   ├── package.json
│   ├── server.js           # Ponto de entrada da aplicação
│   ├── REQUISITOS.md       # Este documento
│   ├── API_SPEC.md         # Especificação da API
│   └── README.md           # Instruções do backend
│
└── Frontend/               # Aplicação React
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── components/     # Componentes React
    │   │   ├── common/     # Componentes reutilizáveis
    │   │   ├── forms/      # Componentes de formulário
    │   │   └── layout/     # Componentes de layout
    │   ├── services/       # Comunicação com API
    │   ├── utils/          # Utilitários e helpers
    │   ├── styles/         # Estilos CSS
    │   ├── hooks/          # Custom hooks
    │   ├── App.js          # Componente principal
    │   ├── App.css         # Estilos globais
    │   └── index.js        # Ponto de entrada
    ├── .env.example        # Exemplo de variáveis de ambiente
    ├── .gitignore
    ├── package.json
    └── README.md           # Instruções do frontend
```

## Detalhamento da Estrutura

### Backend (Express.js)

#### `/src/controllers/`
- `simulacaoController.js` - Controlador principal para simulações

#### `/src/middleware/`
- `errorHandler.js` - Middleware para tratamento de erros
- `validation.js` - Middleware para validação de entrada
- `cors.js` - Configuração de CORS

#### `/src/routes/`
- `index.js` - Rota principal da API
- `simulacao.js` - Rotas específicas de simulação

#### `/src/services/`
- `simulacaoService.js` - Lógica de cálculo das simulações

#### `/src/validators/`
- `simulacaoValidator.js` - Validações específicas para simulação

#### `/src/utils/`
- `calculator.js` - Funções de cálculo financeiro
- `formatter.js` - Formatação de valores
- `constants.js` - Constantes da aplicação

### Frontend (React)

#### `/src/components/common/`
- `Button.js` - Componente de botão reutilizável
- `Input.js` - Componente de input reutilizável
- `Loading.js` - Componente de loading
- `ErrorMessage.js` - Componente para exibir erros

#### `/src/components/forms/`
- `SimulacaoForm.js` - Formulário principal de simulação
- `InputGroup.js` - Grupo de inputs com label e validação

#### `/src/components/layout/`
- `Header.js` - Cabeçalho da aplicação
- `Footer.js` - Rodapé da aplicação
- `Container.js` - Container responsivo

#### `/src/services/`
- `api.js` - Configuração do cliente HTTP
- `simulacaoService.js` - Serviços relacionados à simulação

#### `/src/utils/`
- `formatters.js` - Formatação de valores e textos
- `validators.js` - Validações do frontend
- `constants.js` - Constantes da aplicação

#### `/src/hooks/`
- `useSimulacao.js` - Hook personalizado para simulação
- `useValidation.js` - Hook para validações

## Tecnologias e Dependências

### Backend
```json
{
  "name": "amora-backend",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "joi": "^17.9.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3"
  }
}
```

### Frontend
```json
{
  "name": "amora-frontend",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0",
    "react-hook-form": "^7.45.2"
  },
  "devDependencies": {
    "react-scripts": "5.0.1",
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.4"
  }
}
```

## Configuração de Ambiente

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=5000
```

## Scripts de Desenvolvimento

### Backend (package.json)
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Frontend (package.json)
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Comandos de Setup

### 1. Clonar o repositório
```bash
git clone <repository-url>
cd Amora
```

### 2. Setup do Backend
```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

### 3. Setup do Frontend (novo terminal)
```bash
cd Frontend
npm install
cp .env.example .env
npm start
```

## Fluxo de Dados

```
[Frontend Form] 
    ↓ (POST /api/simulacao)
[Express API] 
    ↓ (Validation)
[Joi Validator] 
    ↓ (Business Logic)
[Simulacao Service] 
    ↓ (Calculations)
[Calculator Utils] 
    ↓ (Response)
[Frontend Results]
```

## Padrões de Código

### Backend
- Arquitetura MVC
- Separation of Concerns
- Error-first callbacks
- Async/await para operações assíncronas
- Validação centralizada com Joi

### Frontend
- Componentes funcionais com hooks
- Separation of Concerns
- Custom hooks para lógica reutilizável
- CSS Modules ou Styled Components
- Tratamento de estado local com useState

## Considerações de Performance

### Backend
- Middleware de compressão (se necessário)
- Rate limiting (se necessário)
- Caching de respostas (se necessário)

### Frontend
- Code splitting (se necessário)
- Lazy loading de componentes (se necessário)
- Memoização de cálculos (se necessário)
- Debounce em inputs (se necessário)

## Testes

### Backend
- Testes unitários dos services
- Testes de integração das rotas
- Testes de validação

### Frontend
- Testes de componentes
- Testes de integração
- Testes de hooks personalizados

## Deploy (Opcional)

### Backend
- Heroku, Railway, ou similar
- Variáveis de ambiente configuradas
- Build otimizado

### Frontend
- Vercel, Netlify, ou similar
- Build otimizado
- Variáveis de ambiente configuradas
