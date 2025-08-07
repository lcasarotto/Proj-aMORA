const express = require('express');
const { simular } = require('../controllers/simulacaoController');

const router = express.Router();

// Rota para simular financiamento
router.post('/simulacao', simular);

module.exports = router;
