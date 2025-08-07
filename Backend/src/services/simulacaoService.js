const { formatarMoeda, arredondarValor } = require('../utils/formatters');

const calcularSimulacao = ({ valor_imovel, percentual_entrada, anos_contrato }) => {
  // Cálculo do valor da entrada
  const valor_entrada = arredondarValor((valor_imovel * percentual_entrada) / 100);
  
  // Cálculo do valor a ser financiado
  const valor_financiado = arredondarValor(valor_imovel - valor_entrada);
  
  // Cálculo do total a guardar (15% do valor do imóvel - conforme especificação)
  const total_a_guardar = arredondarValor(valor_imovel * 0.15);
  
  // Cálculo da parcela mensal
  // 15% do valor do imóvel dividido pelo número de meses do contrato
  const meses_contrato = anos_contrato * 12;
  const parcela_mensal = arredondarValor(total_a_guardar / meses_contrato);

  return {
    valor_imovel: arredondarValor(valor_imovel),
    percentual_entrada,
    anos_contrato,
    valor_entrada,
    valor_financiado,
    total_a_guardar,
    parcela_mensal,
    meses_contrato,
    // Versões formatadas para exibição
    formatted: {
      valor_imovel: formatarMoeda(valor_imovel),
      valor_entrada: formatarMoeda(valor_entrada),
      valor_financiado: formatarMoeda(valor_financiado),
      total_a_guardar: formatarMoeda(total_a_guardar),
      parcela_mensal: formatarMoeda(parcela_mensal)
    }
  };
};

module.exports = {
  calcularSimulacao
};
