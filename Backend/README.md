# aMORA - Backend API

API REST para o simulador de financiamento aMORA.

## 🚀 Funcionalidades

- ✅ Simulação de financiamento imobiliário
- ✅ Validação robusta de dados de entrada
- ✅ Cálculos financeiros precisos
- ✅ Formatação de valores monetários
- ✅ Tratamento de erros centralizado
- ✅ Testes automatizados

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` conforme necessário.

## 🎯 Uso

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

### Testes
```bash
npm test
```

## 📡 Endpoints

### Health Check
```
GET /health
```

**Resposta:**
```json
{
  "status": "ok",
  "message": "Simulador aMORA - API funcionando",
  "timestamp": "2025-08-06T20:30:00.000Z"
}
```

### Simulação de Financiamento
```
POST /api/simulacao
```

**Body:**
```json
{
  "valor_imovel": 500000,
  "percentual_entrada": 10,
  "anos_contrato": 3
}
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "valor_imovel": 500000,
    "percentual_entrada": 10,
    "anos_contrato": 3,
    "valor_entrada": 50000,
    "valor_financiado": 450000,
    "total_a_guardar": 90000,
    "parcela_mensal": 2500,
    "meses_contrato": 36,
    "formatted": {
      "valor_imovel": "R$ 500.000,00",
      "valor_entrada": "R$ 50.000,00",
      "valor_financiado": "R$ 450.000,00",
      "total_a_guardar": "R$ 90.000,00",
      "parcela_mensal": "R$ 2.500,00"
    }
  }
}
```

## 📝 Validações

- **valor_imovel**: Número positivo obrigatório
- **percentual_entrada**: Entre 5% e 20% (obrigatório)
- **anos_contrato**: Entre 1 e 5 anos (obrigatório)

## 🔒 Segurança

- Helmet.js para headers de segurança
- CORS configurado
- Validação de entrada com Joi
- Tratamento de erros centralizado

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/     # Controladores da API
├── services/        # Lógica de negócio
├── routes/          # Definição das rotas
├── middlewares/     # Middlewares personalizados
└── utils/           # Utilitários e helpers
```

## 🧪 Testes

Os testes cobrem:
- Endpoints da API
- Validações de entrada
- Cálculos financeiros
- Tratamento de erros

Cobertura atual: ~91%
