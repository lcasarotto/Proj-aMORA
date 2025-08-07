# 🚀 Como Rodar o Sistema aMORA

Este guia completo mostra como configurar e executar o sistema aMORA - Simulador de Financiamento Imobiliário.

## 📋 Pré-requisitos

### Software Necessário
- **Node.js** versão 14 ou superior
  - Baixe em: https://nodejs.org/
  - Verifique a instalação: `node --version`
- **npm** (vem junto com Node.js)
  - Verifique a instalação: `npm --version`
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)

### Sistema Operacional
- Windows 10/11
- macOS 10.15+
- Linux Ubuntu 18.04+

## 📁 Estrutura do Projeto

```
aMORA/
├── Backend/                 # API REST (Node.js + Express)
│   ├── src/                # Código fonte
│   ├── tests/              # Testes automatizados
│   ├── package.json        # Dependências
│   └── server.js           # Servidor principal
├── Frontend/               # Interface web
│   ├── index.html         # Página principal
│   ├── css/               # Estilos
│   ├── js/                # JavaScript
│   └── assets/            # Recursos
└── Documentação/          # Docs do projeto
```

## 🎯 Passo a Passo Completo

### 1. Preparação Inicial

#### 1.1 Clone ou Baixe o Projeto
```bash
# Se usando Git
git clone <url-do-repositorio>
cd amora

# Ou baixe o ZIP e extraia
```

#### 1.2 Navegue até a Pasta do Projeto
```powershell
# No Windows (PowerShell)
cd C:\Users\SeuUsuario\Desktop\Amora

# No macOS/Linux
cd ~/Desktop/Amora
```

### 2. Configuração do Backend

#### 2.1 Instalar Dependências
```powershell
# Entre na pasta do backend
cd Backend

# Instale as dependências
npm install
```

**O que será instalado:**
- `express` - Framework web
- `cors` - Habilitação de CORS
- `helmet` - Segurança HTTP
- `joi` - Validação de dados
- `dotenv` - Variáveis de ambiente
- `jest` - Framework de testes
- `nodemon` - Auto-reload em desenvolvimento
- `supertest` - Testes de API

#### 2.2 Configurar Variáveis de Ambiente (Opcional)
```powershell
# Copie o arquivo de exemplo (se existir)
copy .env.example .env

# Ou crie um novo arquivo .env
echo "PORT=3001" > .env
```

#### 2.3 Iniciar o Backend
```powershell
# Modo desenvolvimento (recomendado)
npm run dev

# Ou modo produção
npm start
```

**Resultado esperado:**
```
✅ Servidor rodando na porta 3001
✅ API aMORA iniciada com sucesso
✅ Endpoints disponíveis:
   - GET  /health
   - POST /api/simulacao
```

### 3. Configuração do Frontend

#### 3.1 Abrir o Frontend

**Opção 1: Diretamente no Navegador**
```powershell
# Em uma nova aba do terminal
cd ..\Frontend

# Abra o arquivo HTML
start index.html
```

**Opção 2: Servidor Local (Recomendado)**
```powershell
# Com Python (se instalado)
python -m http.server 3000

# Ou com Node.js
npx serve . -p 3000

# Ou com PHP (se instalado)
php -S localhost:3000
```

**Acesse:** http://localhost:3000

### 4. Verificar se Tudo Funciona

#### 4.1 Teste o Backend
```powershell
# Teste o health check
curl http://localhost:3001/health

# Ou abra no navegador: http://localhost:3001/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "Simulador aMORA - API funcionando",
  "timestamp": "2025-08-06T..."
}
```

#### 4.2 Teste o Frontend
1. Abra http://localhost:3000 (ou o arquivo HTML)
2. Preencha o formulário:
   - **Valor do Imóvel:** R$ 500.000,00
   - **Percentual de Entrada:** 10%
   - **Anos de Contrato:** 3 anos
3. Clique em "Simular Financiamento"
4. Verifique se os resultados aparecem

## 🧪 Executar Testes

### Testes do Backend
```powershell
cd Backend
npm test
```

**Cobertura esperada:** ~91%

**Testes incluem:**
- ✅ Validação de entrada
- ✅ Cálculos financeiros
- ✅ Endpoints da API
- ✅ Tratamento de erros

## 🔧 Scripts Disponíveis

### Backend
```powershell
npm start      # Inicia em modo produção
npm run dev    # Inicia em modo desenvolvimento (auto-reload)
npm test       # Executa todos os testes
```

### Frontend
```powershell
# Não há scripts npm, apenas abra o HTML
start index.html

# Ou use um servidor local
npx serve . -p 3000
```

## 🌐 URLs do Sistema

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Backend API | http://localhost:3001 | API REST |
| Frontend | http://localhost:3000 | Interface web |
| Health Check | http://localhost:3001/health | Status da API |
| Simulação | http://localhost:3001/api/simulacao | Endpoint principal |

## 🐛 Solução de Problemas

### ❌ Problema: "npm não é reconhecido"
**Solução:** Instale o Node.js de https://nodejs.org/

### ❌ Problema: "Porta 3001 já está em uso"
```powershell
# Encontre o processo
netstat -ano | findstr :3001

# Mate o processo (substitua PID)
taskkill /PID <numero-do-pid> /F

# Ou mude a porta no Backend
```

### ❌ Problema: "CORS error" no Frontend
**Solução:** 
1. Certifique-se que o backend está rodando
2. Use um servidor local para o frontend (não abra o HTML diretamente)

### ❌ Problema: "fetch failed" no Frontend
**Verificações:**
1. Backend está rodando? `curl http://localhost:3001/health`
2. URL da API está correta no Frontend?
3. Firewall bloqueando a conexão?

### ❌ Problema: Testes falhando
```powershell
# Limpe o cache do npm
npm cache clean --force

# Reinstale dependências
rm -rf node_modules package-lock.json
npm install

# Execute novamente
npm test
```

## 📱 Testando em Dispositivos Móveis

### 1. Encontre seu IP local
```powershell
ipconfig | findstr IPv4
```

### 2. Acesse via IP
- Frontend: `http://SEU-IP:3000`
- Backend: `http://SEU-IP:3001`

### 3. Configure o firewall (se necessário)
```powershell
# Abra as portas no Windows Firewall
netsh advfirewall firewall add rule name="aMORA Frontend" dir=in action=allow protocol=TCP localport=3000
netsh advfirewall firewall add rule name="aMORA Backend" dir=in action=allow protocol=TCP localport=3001
```

## 🔒 Segurança e Configurações

### Variáveis de Ambiente Disponíveis
```env
PORT=3001                    # Porta do servidor
NODE_ENV=development         # Ambiente (development/production)
CORS_ORIGIN=*               # Origem permitida para CORS
```

### Headers de Segurança
O sistema inclui automaticamente:
- CORS configurado
- Helmet.js para headers de segurança
- Validação rigorosa de entrada
- Tratamento seguro de erros

## 📊 Exemplo de Uso Completo

### 1. Dados de Entrada
```json
{
  "valor_imovel": 500000,
  "percentual_entrada": 10,
  "anos_contrato": 3
}
```

### 2. Resultado Esperado
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

## 🚀 Próximos Passos

Após conseguir rodar o sistema:

1. **Explore as funcionalidades** - Teste diferentes valores
2. **Verifique os logs** - Observe o console para entender o fluxo
3. **Execute os testes** - Rode `npm test` para ver a cobertura
4. **Leia a documentação** - Explore os arquivos em `/Documentação/`
5. **Customize** - Modifique cores, textos ou funcionalidades

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs** no terminal
2. **Consulte a documentação** em `/Documentação/`
3. **Execute os testes** para validar o ambiente
4. **Verifique as dependências** com `npm list`

---

**🎉 Pronto!** O sistema aMORA está rodando e funcionando perfeitamente!

**URLs importantes:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:3001
- ❤️ Health Check: http://localhost:3001/health

Aproveite o simulador de financiamento! 🏠✨
