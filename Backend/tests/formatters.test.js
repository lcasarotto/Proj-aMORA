const { formatarMoeda, arredondarValor, formatarPercentual } = require('../src/utils/formatters');

describe('Formatters Utils', () => {
  describe('formatarMoeda', () => {
    it('deve formatar números inteiros corretamente', () => {
      const resultado1000 = formatarMoeda(1000);
      const resultado50000 = formatarMoeda(50000);
      const resultado1000000 = formatarMoeda(1000000);
      
      expect(resultado1000).toContain('R$');
      expect(resultado1000).toContain('1.000,00');
      expect(resultado50000).toContain('50.000,00');
      expect(resultado1000000).toContain('1.000.000,00');
    });

    it('deve formatar números decimais corretamente', () => {
      const resultado1 = formatarMoeda(1234.56);
      const resultado2 = formatarMoeda(999.99);
      const resultado3 = formatarMoeda(0.01);
      
      expect(resultado1).toContain('1.234,56');
      expect(resultado2).toContain('999,99');
      expect(resultado3).toContain('0,01');
    });

    it('deve lidar com zero', () => {
      const resultado = formatarMoeda(0);
      expect(resultado).toContain('R$');
      expect(resultado).toContain('0,00');
    });

    it('deve lidar com números negativos', () => {
      const resultado = formatarMoeda(-1000);
      expect(resultado).toContain('-');
      expect(resultado).toContain('1.000,00');
    });

    it('deve lidar com números muito grandes', () => {
      const resultado = formatarMoeda(1234567890.12);
      expect(resultado).toContain('1.234.567.890,12');
    });

    it('deve retornar string', () => {
      expect(typeof formatarMoeda(1000)).toBe('string');
    });

    it('deve usar padrão brasileiro', () => {
      const resultado = formatarMoeda(1234.56);
      expect(resultado).toMatch(/R\$\s[\d.,]+/);
    });
  });

  describe('arredondarValor', () => {
    it('deve arredondar para 2 casas decimais', () => {
      expect(arredondarValor(123.456)).toBe(123.46);
      expect(arredondarValor(123.454)).toBe(123.45);
      expect(arredondarValor(123.455)).toBe(123.46);
    });

    it('deve manter números inteiros', () => {
      expect(arredondarValor(1000)).toBe(1000);
      expect(arredondarValor(0)).toBe(0);
    });

    it('deve lidar com números muito pequenos', () => {
      expect(arredondarValor(0.001)).toBe(0);
      expect(arredondarValor(0.009)).toBe(0.01);
    });

    it('deve lidar com números negativos', () => {
      expect(arredondarValor(-123.456)).toBe(-123.46);
      expect(arredondarValor(-123.454)).toBe(-123.45);
    });

    it('deve lidar com divisões que geram muitas casas decimais', () => {
      const resultado = 1000 / 3;
      expect(arredondarValor(resultado)).toBe(333.33);
    });

    it('deve retornar número', () => {
      expect(typeof arredondarValor(123.456)).toBe('number');
    });
  });

  describe('formatarPercentual', () => {
    it('deve formatar percentual corretamente', () => {
      expect(formatarPercentual(5)).toBe('5%');
      expect(formatarPercentual(10)).toBe('10%');
      expect(formatarPercentual(20)).toBe('20%');
    });

    it('deve lidar com zero', () => {
      expect(formatarPercentual(0)).toBe('0%');
    });

    it('deve lidar com decimais', () => {
      expect(formatarPercentual(5.5)).toBe('5.5%');
      expect(formatarPercentual(12.75)).toBe('12.75%');
    });

    it('deve retornar string', () => {
      expect(typeof formatarPercentual(10)).toBe('string');
    });
  });
});
