const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const simulacaoRoutes = require('./routes/simulacao');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares de segurança
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Simulador aMORA - API funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api', simulacaoRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: `A rota ${req.originalUrl} não existe nesta API`
  });
});

module.exports = app;
