# API Specification - Simulador aMORA

## Endpoint: POST /simulacao

### Base URL
```
http://localhost:3001/api
```

### Request

#### Headers
```
Content-Type: application/json
```

#### Body
```json
{
  "valor_imovel": number,      // Valor do imóvel (obrigatório, > 0)
  "percentual_entrada": number, // Percentual de entrada (obrigatório, 5-20)
  "anos_contrato": number      // Anos de contrato (obrigatório, 1-5)
}
```

### Response

#### Success (200)
```json
{
  "success": true,
  "data": {
    "valor_entrada": number,     // valor_imovel * (percentual_entrada / 100)
    "valor_financiado": number,  // valor_imovel - valor_entrada
    "total_a_guardar": number,   // valor_imovel * 0.15
    "parcela_mensal": number     // (valor_imovel * 0.15) / (anos_contrato * 12)
  },
  "input": {
    "valor_imovel": number,
    "percentual_entrada": number,
    "anos_contrato": number
  }
}
```

#### Error (400 - Bad Request)
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Descrição específica do erro",
  "details": [
    {
      "field": "campo_com_erro",
      "message": "Mensagem específica do campo"
    }
  ]
}
```

#### Error (500 - Internal Server Error)
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Erro interno do servidor"
}
```

### Validation Rules

#### valor_imovel
- **Tipo**: number
- **Obrigatório**: Sim
- **Validação**: Deve ser > 0
- **Exemplo**: 400000

#### percentual_entrada
- **Tipo**: number
- **Obrigatório**: Sim
- **Validação**: Deve estar entre 5 e 20 (inclusive)
- **Exemplo**: 5

#### anos_contrato
- **Tipo**: number
- **Obrigatório**: Sim
- **Validação**: Deve estar entre 1 e 5 (inclusive)
- **Exemplo**: 3

### Examples

#### Exemplo 1: Requisição Válida
**Request:**
```bash
POST http://localhost:3001/api/simulacao
Content-Type: application/json

{
  "valor_imovel": 400000,
  "percentual_entrada": 5,
  "anos_contrato": 3
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valor_entrada": 20000,
    "valor_financiado": 380000,
    "total_a_guardar": 60000,
    "parcela_mensal": 1666.67
  },
  "input": {
    "valor_imovel": 400000,
    "percentual_entrada": 5,
    "anos_contrato": 3
  }
}
```

#### Exemplo 2: Erro de Validação
**Request:**
```bash
POST http://localhost:3001/api/simulacao
Content-Type: application/json

{
  "valor_imovel": -100000,
  "percentual_entrada": 25,
  "anos_contrato": 10
}
```

**Response:**
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Dados de entrada inválidos",
  "details": [
    {
      "field": "valor_imovel",
      "message": "Valor do imóvel deve ser maior que zero"
    },
    {
      "field": "percentual_entrada",
      "message": "Percentual de entrada deve estar entre 5 e 20"
    },
    {
      "field": "anos_contrato",
      "message": "Anos de contrato deve estar entre 1 e 5"
    }
  ]
}
```

### CURL Examples

#### Simulação válida
```bash
curl -X POST http://localhost:3001/api/simulacao \
  -H "Content-Type: application/json" \
  -d '{
    "valor_imovel": 400000,
    "percentual_entrada": 5,
    "anos_contrato": 3
  }'
```

#### Teste de validação
```bash
curl -X POST http://localhost:3001/api/simulacao \
  -H "Content-Type: application/json" \
  -d '{
    "valor_imovel": 0,
    "percentual_entrada": 3,
    "anos_contrato": 10
  }'
```

### Status Codes

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso - Simulação calculada |
| 400 | Bad Request - Dados inválidos |
| 404 | Not Found - Endpoint não encontrado |
| 500 | Internal Server Error - Erro interno |

### Rate Limiting
- Nenhum rate limiting implementado inicialmente
- Pode ser adicionado posteriormente se necessário

### CORS
- API configurada para aceitar requisições do frontend
- Origem permitida: `http://localhost:3000` (desenvolvimento)

### Security Headers
- Helmet.js configurado para headers básicos de segurança
- Content Security Policy básica
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
