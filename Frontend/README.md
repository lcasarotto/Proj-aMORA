# aMORA - Frontend

Interface web responsiva para o simulador de financiamento aMORA.

## 🎨 Características

- ✅ Design moderno e responsivo
- ✅ Interface intuitiva e acessível
- ✅ Validação em tempo real
- ✅ Feedback visual com animações
- ✅ Suporte offline (localStorage)
- ✅ Notificações toast
- ✅ Monitor de conectividade
- ✅ Máscaras de input para moeda

## 🚀 Funcionalidades

### Simulação de Financiamento
- Entrada de dados com validação
- Máscaras automáticas para valores monetários
- Slider interativo para percentual de entrada
- Cálculo em tempo real

### Resultados
- Exibição clara e organizada dos resultados
- Valores formatados em reais brasileiros
- Cards visuais com destaque para informações importantes
- Opção de salvar resultados localmente

### Experiência do Usuário
- Loading states durante requisições
- Mensagens de erro claras e informativas
- Notificações toast para feedback
- Navegação suave com scroll automático
- Design responsivo para mobile e desktop

## 📁 Estrutura

```
Frontend/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   ├── app.js          # Aplicação principal
│   ├── api.js          # Comunicação com API
│   └── utils.js        # Utilitários e helpers
└── assets/             # Recursos estáticos
```

## 🎯 Como Usar

1. Abra o arquivo `index.html` em um navegador
2. Certifique-se de que o backend está rodando em `http://localhost:3001`
3. Preencha os campos do formulário:
   - **Valor do Imóvel**: Digite o valor total do imóvel
   - **Percentual de Entrada**: Use o slider (5% a 20%)
   - **Anos de Contrato**: Selecione de 1 a 5 anos
4. Clique em "Simular Financiamento"
5. Visualize os resultados calculados
6. Opcionalmente, salve o resultado para consultar depois

## 🔧 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Grid e Flexbox
- **JavaScript ES6+**: Lógica da aplicação
- **Fetch API**: Comunicação com backend
- **LocalStorage**: Persistência local de dados

## 📱 Responsividade

O frontend é totalmente responsivo e funciona em:
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🎨 Design System

### Cores
- **Primária**: Azul (#2563eb)
- **Secundária**: Cinza (#64748b)
- **Sucesso**: Verde (#10b981)
- **Erro**: Vermelho (#ef4444)
- **Aviso**: Amarelo (#f59e0b)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- Cards com sombras suaves
- Botões com estados de hover/loading
- Inputs com foco visual
- Notificações toast
- Animações CSS suaves

## 🔌 Integração com Backend

O frontend se conecta com o backend via API REST:

### Endpoints Utilizados
- `GET /health` - Verificação de status
- `POST /api/simulacao` - Realizar simulação

### Tratamento de Erros
- Validação client-side
- Fallback para erros de rede
- Mensagens de erro amigáveis
- Retry automático em falhas

## 💾 Funcionalidades Offline

- Salvamento de resultados no localStorage
- Histórico das últimas 10 simulações
- Validação local de dados
- Interface funcional mesmo sem conexão

## 🧪 Testando

Para testar o frontend:

1. Inicie o backend na porta 3001
2. Abra `index.html` em um navegador
3. Teste diferentes cenários:
   - Valores válidos e inválidos
   - Desconexão de rede
   - Responsividade em diferentes telas

## 🐛 Debug

O frontend inclui ferramentas para debug:
- Console logs informativos
- Exposição de classes globais (`window.amoraApp`)
- Tratamento de erros globais
- Monitor de conectividade

