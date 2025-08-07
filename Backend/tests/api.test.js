const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('deve retornar status 200 e informações de saúde', async () => {
      const res = await request(app)
        .get('/health')
        .expect(200);

      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('message', 'Simulador aMORA - API funcionando');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/simulacao', () => {
    it('deve calcular simulação corretamente com dados válidos', async () => {
      const dadosSimulacao = {
        valor_imovel: 500000,
        percentual_entrada: 10,
        anos_contrato: 3
      };

      const res = await request(app)
        .post('/api/simulacao')
        .send(dadosSimulacao)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('valor_imovel', 500000);
      expect(res.body.data).toHaveProperty('valor_entrada', 50000);
      expect(res.body.data).toHaveProperty('valor_financiado', 450000);
      expect(res.body.data).toHaveProperty('total_a_guardar', 75000);
      expect(res.body.data).toHaveProperty('parcela_mensal', 2083.33);
      expect(res.body.data).toHaveProperty('meses_contrato', 36);
      expect(res.body.data).toHaveProperty('formatted');
    });

    it('deve retornar erro 400 para dados inválidos', async () => {
      const dadosInvalidos = {
        valor_imovel: -100,
        percentual_entrada: 25,
        anos_contrato: 10
      };

      const res = await request(app)
        .post('/api/simulacao')
        .send(dadosInvalidos)
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Dados inválidos');
      expect(res.body).toHaveProperty('details');
      expect(res.body.details).toHaveLength(3);
      expect(res.body.details[0]).toHaveProperty('field', 'valor_imovel');
      expect(res.body.details[1]).toHaveProperty('field', 'percentual_entrada');
      expect(res.body.details[2]).toHaveProperty('field', 'anos_contrato');
    });

    it('deve retornar erro 400 para campos obrigatórios ausentes', async () => {
      const dadosIncompletos = {
        valor_imovel: 500000
      };

      const res = await request(app)
        .post('/api/simulacao')
        .send(dadosIncompletos)
        .expect(400);

      expect(res.body).toHaveProperty('error', 'Dados inválidos');
      expect(res.body).toHaveProperty('details');
      expect(res.body.details).toHaveLength(2);
    });

    it('deve retornar erro 400 para JSON malformado', async () => {
      const res = await request(app)
        .post('/api/simulacao')
        .send('{"valor_imovel": 500000,}') // JSON inválido
        .set('Content-Type', 'application/json')
        .expect(400);

      expect(res.body).toHaveProperty('error', 'JSON inválido');
      expect(res.body).toHaveProperty('message');
    });

    it('deve calcular corretamente com valores limítrofes', async () => {
      const dadosLimitrofes = {
        valor_imovel: 50000,
        percentual_entrada: 5,
        anos_contrato: 1
      };

      const res = await request(app)
        .post('/api/simulacao')
        .send(dadosLimitrofes)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('valor_entrada', 2500);
      expect(res.body.data).toHaveProperty('valor_financiado', 47500);
      expect(res.body.data).toHaveProperty('total_a_guardar', 7500);
      expect(res.body.data).toHaveProperty('parcela_mensal', 625);
      expect(res.body.data).toHaveProperty('meses_contrato', 12);
    });

    it('deve calcular corretamente com valores máximos', async () => {
      const dadosMaximos = {
        valor_imovel: 2000000,
        percentual_entrada: 20,
        anos_contrato: 5
      };

      const res = await request(app)
        .post('/api/simulacao')
        .send(dadosMaximos)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('valor_entrada', 400000);
      expect(res.body.data).toHaveProperty('valor_financiado', 1600000);
      expect(res.body.data).toHaveProperty('total_a_guardar', 300000);
      expect(res.body.data).toHaveProperty('parcela_mensal', 5000);
      expect(res.body.data).toHaveProperty('meses_contrato', 60);
    });
  });

  describe('Rota não encontrada', () => {
    it('deve retornar erro 404 para rota inexistente', async () => {
      const res = await request(app)
        .get('/rota-inexistente')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Rota não encontrada');
    });

    it('deve retornar erro 404 para método não permitido', async () => {
      const res = await request(app)
        .delete('/api/simulacao')
        .expect(404);

      expect(res.body).toHaveProperty('error', 'Rota não encontrada');
    });
  });

  describe('Middleware de Erro', () => {
    it('deve lidar com erros internos do servidor', async () => {
      // Vamos simular um erro interno criando uma rota de teste
      const express = require('express');
      const testApp = express();
      const errorHandler = require('../src/middlewares/errorHandler');
      
      testApp.get('/test-error', (req, res, next) => {
        const error = new Error('Erro interno simulado');
        next(error);
      });
      
      testApp.use(errorHandler);
      
      const res = await request(testApp)
        .get('/test-error')
        .expect(500);

      expect(res.body).toHaveProperty('error', 'Erro interno do servidor');
      expect(res.body).toHaveProperty('message');
    });
  });
});
