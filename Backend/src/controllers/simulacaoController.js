const Joi = require('joi');
const simulacaoService = require('../services/simulacaoService');

// Schema de validação usando Joi
const simulacaoSchema = Joi.object({
  valor_imovel: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'Valor do imóvel deve ser um número',
      'number.positive': 'Valor do imóvel deve ser maior que zero',
      'any.required': 'Valor do imóvel é obrigatório'
    }),
  
  percentual_entrada: Joi.number()
    .min(5)
    .max(20)
    .required()
    .messages({
      'number.base': 'Percentual de entrada deve ser um número',
      'number.min': 'Percentual de entrada deve ser no mínimo 5%',
      'number.max': 'Percentual de entrada deve ser no máximo 20%',
      'any.required': 'Percentual de entrada é obrigatório'
    }),
  
  anos_contrato: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'Anos de contrato deve ser um número',
      'number.integer': 'Anos de contrato deve ser um número inteiro',
      'number.min': 'Anos de contrato deve ser no mínimo 1 ano',
      'number.max': 'Anos de contrato deve ser no máximo 5 anos',
      'any.required': 'Anos de contrato é obrigatório'
    })
});

const simular = async (req, res, next) => {
  try {
    // Validar os dados de entrada
    const { error, value } = simulacaoSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    // Realizar os cálculos
    const resultado = simulacaoService.calcularSimulacao(value);

    // Retornar o resultado
    res.status(200).json({
      success: true,
      data: resultado
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  simular
};
