# Documento de Requisitos - Simulador de Compra de Imóvel aMORA

## 1. Visão Geral do Projeto

### 1.1 Objetivo
Desenvolver uma aplicação full-stack para simulação de compra de imóveis seguindo o modelo aMORA, com frontend em React e backend em Express.js.

### 1.2 Escopo
- **Backend**: API REST em Node.js/Express
- **Frontend**: Aplicação web responsiva em React
- **Arquitetura**: Full-stack com comunicação via API

### 1.3 Público-Alvo
Usuários interessados em simular a compra de imóveis através do modelo aMORA.

## 2. Requisitos Funcionais

### 2.1 Backend (API REST)

#### RF001 - Endpoint de Simulação
- **Descrição**: Implementar endpoint POST `/simulacao` para calcular simulação de compra
- **Entrada**:
  - `valor_imovel` (number): Valor do imóvel em reais
  - `percentual_entrada` (number): Percentual de entrada (5-20%)
  - `anos_contrato` (number): Duração do contrato (1-5 anos)
- **Saída**:
  ```json
  {
    "valor_entrada": number,
    "valor_financiado": number,
    "total_a_guardar": number,
    "parcela_mensal": number
  }
  ```

#### RF002 - Validação de Parâmetros
- **Descrição**: Validar todos os parâmetros de entrada
- **Regras**:
  - `valor_imovel`: obrigatório, número positivo
  - `percentual_entrada`: obrigatório, entre 5 e 20
  - `anos_contrato`: obrigatório, entre 1 e 5
- **Erro**: Retornar status 400 com mensagem descritiva para dados inválidos

#### RF003 - Cálculos Financeiros
- **Descrição**: Implementar fórmulas de cálculo conforme modelo aMORA
- **Fórmulas**:
  - Valor da entrada: `valor_imovel * (percentual_entrada / 100)`
  - Valor a financiar: `valor_imovel - valor_entrada`
  - Total a guardar: `valor_imovel * 0.15`
  - Valor mensal a guardar: `(valor_imovel * 0.15) / (anos_contrato * 12)`

### 2.2 Frontend (React)

#### RF004 - Interface de Entrada
- **Descrição**: Criar formulário para entrada de dados
- **Campos**:
  - Valor do imóvel (input numérico, obrigatório)
  - Percentual de entrada (input numérico, 5-20%, obrigatório)
  - Duração do contrato (input numérico, 1-5 anos, obrigatório)
  - Botão "Simular"

#### RF005 - Validação Frontend
- **Descrição**: Validar dados antes do envio
- **Validações**:
  - Campos obrigatórios preenchidos
  - Valores dentro dos limites estabelecidos
  - Apenas números aceitos
  - Feedback visual de erros

#### RF006 - Exibição de Resultados
- **Descrição**: Mostrar resultados da simulação
- **Informações**:
  - Valor da entrada formatado
  - Valor a financiar formatado
  - Total a guardar formatado
  - Valor mensal a guardar formatado

#### RF007 - Responsividade
- **Descrição**: Interface adaptável para diferentes dispositivos
- **Suporte**:
  - Desktop (1024px+)
  - Tablet (768px - 1023px)
  - Mobile (320px - 767px)

## 3. Requisitos Não Funcionais

### 3.1 Performance
- **RNF001**: Tempo de resposta da API ≤ 500ms
- **RNF002**: Carregamento inicial da página ≤ 3s

### 3.2 Usabilidade
- **RNF003**: Interface intuitiva e fácil de usar
- **RNF004**: Feedback claro de erros e validações
- **RNF005**: Formatação adequada de valores monetários

### 3.3 Compatibilidade
- **RNF006**: Suporte aos navegadores modernos (Chrome, Firefox, Safari, Edge)
- **RNF007**: Compatibilidade com dispositivos móveis

### 3.4 Segurança
- **RNF008**: Validação de entrada no backend
- **RNF009**: Sanitização de dados
- **RNF010**: Headers de segurança adequados

## 4. Especificações Técnicas

### 4.1 Backend
- **Tecnologia**: Node.js + Express.js
- **Arquitetura**: MVC Simplificada (recomendada)
- **Validação**: Joi ou express-validator
- **CORS**: Configurado para frontend
- **Middleware**: body-parser, cors, helmet
- **Estrutura**:
  ```
  backend/
  ├── src/
  │   ├── controllers/     # Recebem requests, delegam para services
  │   ├── services/        # Lógica de negócio e cálculos
  │   ├── validators/      # Validações de entrada
  │   ├── middleware/      # Middlewares personalizados
  │   ├── routes/          # Definição das rotas
  │   ├── utils/           # Utilitários e helpers
  │   └── app.js          # Configuração do Express
  ├── tests/              # Testes unitários e integração
  ├── package.json
  └── server.js           # Ponto de entrada
  ```

### 4.2 Frontend
- **Tecnologia**: React.js
- **Styling**: CSS Modules ou Styled Components
- **HTTP Client**: Axios ou Fetch API
- **Validação**: React Hook Form ou Formik
- **Estrutura**:
  ```
  frontend/
  ├── public/
  ├── src/
  │   ├── components/
  │   ├── services/
  │   ├── utils/
  │   ├── styles/
  │   └── App.js
  └── package.json
  ```

## 5. Casos de Uso

### 5.1 UC001 - Simular Compra de Imóvel
**Ator**: Usuário
**Pré-condições**: Aplicação carregada
**Fluxo Principal**:
1. Usuário acessa a aplicação
2. Usuário preenche valor do imóvel
3. Usuário define percentual de entrada
4. Usuário seleciona duração do contrato
5. Usuário clica em "Simular"
6. Sistema valida dados
7. Sistema calcula valores
8. Sistema exibe resultados

**Fluxos Alternativos**:
- FA001: Dados inválidos - sistema exibe mensagem de erro
- FA002: Erro de conexão - sistema exibe mensagem de erro de rede

## 6. Exemplo de Funcionamento

### 6.1 Entrada
```json
{
  "valor_imovel": 400000,
  "percentual_entrada": 5,
  "anos_contrato": 3
}
```

### 6.2 Saída Esperada
```json
{
  "valor_entrada": 20000,
  "valor_financiado": 380000,
  "total_a_guardar": 60000,
  "parcela_mensal": 1666.67
}
```

## 7. Critérios de Aceitação

### 7.1 Backend
- [ ] API responde corretamente no endpoint `/simulacao`
- [ ] Validações funcionam adequadamente
- [ ] Cálculos estão corretos
- [ ] Tratamento de erros implementado
- [ ] CORS configurado

### 7.2 Frontend
- [ ] Formulário funcional e responsivo
- [ ] Validações frontend implementadas
- [ ] Resultados exibidos corretamente
- [ ] Interface funciona em mobile e desktop
- [ ] Integração com API funcionando

## 8. Entregáveis

### 8.1 Código
- Repositório GitHub público
- Código backend em Express.js
- Código frontend em React
- Estrutura organizada

### 8.2 Documentação
- README detalhado com instruções
- Exemplos de uso da API
- Comandos para execução
- Descrição da arquitetura

### 8.3 Opcionais (Diferenciais)
- Docker e docker-compose
- Testes unitários
- Testes de integração
- Deploy em plataforma cloud

## 9. Cronograma Sugerido

- **Hora 1**: Setup do projeto e estrutura básica
- **Hora 2**: Implementação do backend (API + validações)
- **Hora 3**: Implementação do frontend (componentes + integração)
- **Hora 4**: Refinamentos, testes e documentação

## 10. Recursos e Dependências

### 10.1 Backend Dependencies
```json
{
  "express": "^4.18.x",
  "cors": "^2.8.x",
  "helmet": "^7.x.x",
  "joi": "^17.x.x"
}
```

### 10.2 Frontend Dependencies
```json
{
  "react": "^18.x.x",
  "axios": "^1.x.x",
  "react-hook-form": "^7.x.x"
}
```

## 11. Considerações de Implementação

### 11.1 Formatação de Valores
- Valores monetários formatados com separador de milhares
- Duas casas decimais para valores monetários
- Validação de entrada apenas numérica

### 11.2 User Experience
- Loading states durante requisições
- Feedback visual de validação
- Mensagens de erro claras e úteis
- Design clean e profissional

### 11.3 Estrutura de Resposta de Erro
```json
{
  "error": "Validation failed",
  "message": "Percentual de entrada deve estar entre 5 e 20",
  "code": 400
}
```

---

**Documento criado em**: {{ data_atual }}
**Versão**: 1.0
**Autor**: Equipe de Desenvolvimento aMORA
