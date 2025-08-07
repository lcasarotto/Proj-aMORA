const simulacaoService = require('../src/services/simulacaoService');

describe('SimulacaoService', () => {
  describe('calcularSimulacao', () => {
    it('deve calcular corretamente simulação básica', () => {
      const dados = {
        valor_imovel: 400000,
        percentual_entrada: 5,
        anos_contrato: 3
      };

      const resultado = simulacaoService.calcularSimulacao(dados);

      expect(resultado.valor_imovel).toBe(400000);
      expect(resultado.percentual_entrada).toBe(5);
      expect(resultado.anos_contrato).toBe(3);
      expect(resultado.valor_entrada).toBe(20000);
      expect(resultado.valor_financiado).toBe(380000);
      expect(resultado.total_a_guardar).toBe(60000);
      expect(resultado.parcela_mensal).toBe(1666.67);
      expect(resultado.meses_contrato).toBe(36);
    });

    it('deve formatar valores corretamente', () => {
      const dados = {
        valor_imovel: 500000,
        percentual_entrada: 10,
        anos_contrato: 2
      };

      const resultado = simulacaoService.calcularSimulacao(dados);

      expect(resultado.formatted).toHaveProperty('valor_imovel');
      expect(resultado.formatted).toHaveProperty('valor_entrada');
      expect(resultado.formatted).toHaveProperty('valor_financiado');
      expect(resultado.formatted).toHaveProperty('total_a_guardar');
      expect(resultado.formatted).toHaveProperty('parcela_mensal');
      
      // Verifica se contém R$ e formato brasileiro
      expect(resultado.formatted.valor_imovel).toContain('R$');
      expect(resultado.formatted.valor_imovel).toContain('500.000,00');
      expect(resultado.formatted.valor_entrada).toContain('R$');
      expect(resultado.formatted.valor_entrada).toContain('50.000,00');
    });

    it('deve lidar com valores decimais corretamente', () => {
      const dados = {
        valor_imovel: 333333,
        percentual_entrada: 7,
        anos_contrato: 4
      };

      const resultado = simulacaoService.calcularSimulacao(dados);

      expect(resultado.valor_entrada).toBe(23333.31);
      expect(resultado.valor_financiado).toBe(309999.69);
      expect(resultado.total_a_guardar).toBe(49999.95);
      expect(resultado.parcela_mensal).toBe(1041.67);
    });

    it('deve calcular com percentual mínimo', () => {
      const dados = {
        valor_imovel: 100000,
        percentual_entrada: 5,
        anos_contrato: 1
      };

      const resultado = simulacaoService.calcularSimulacao(dados);

      expect(resultado.valor_entrada).toBe(5000);
      expect(resultado.valor_financiado).toBe(95000);
      expect(resultado.total_a_guardar).toBe(15000);
      expect(resultado.parcela_mensal).toBe(1250);
      expect(resultado.meses_contrato).toBe(12);
    });

    it('deve calcular com percentual máximo', () => {
      const dados = {
        valor_imovel: 200000,
        percentual_entrada: 20,
        anos_contrato: 5
      };

      const resultado = simulacaoService.calcularSimulacao(dados);

      expect(resultado.valor_entrada).toBe(40000);
      expect(resultado.valor_financiado).toBe(160000);
      expect(resultado.total_a_guardar).toBe(30000);
      expect(resultado.parcela_mensal).toBe(500);
      expect(resultado.meses_contrato).toBe(60);
    });
  });
});
