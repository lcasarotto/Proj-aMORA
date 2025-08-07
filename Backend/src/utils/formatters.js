/**
 * Formatar número para moeda brasileira
 * @param {number} valor - Valor a ser formatado
 * @returns {string} - Valor formatado como R$ 1.234,56
 */
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

/**
 * Arredondar valor para 2 casas decimais
 * @param {number} valor - Valor a ser arredondado
 * @returns {number} - Valor arredondado
 */
const arredondarValor = (valor) => {
  return Math.round(valor * 100) / 100;
};

/**
 * Formatar percentual
 * @param {number} valor - Valor a ser formatado
 * @returns {string} - Valor formatado como 5%
 */
const formatarPercentual = (valor) => {
  return `${valor}%`;
};

module.exports = {
  formatarMoeda,
  arredondarValor,
  formatarPercentual
};
