const errorHandler = (err, req, res, next) => {
  // Só loga erros se não estiver em ambiente de teste
  if (process.env.NODE_ENV !== 'test') {
    console.error('Erro capturado:', err);
  }

  // Erro de validação do Joi
  if (err.isJoi) {
    return res.status(400).json({
      error: 'Dados inválidos',
      message: 'Os dados enviados não atendem aos critérios de validação',
      details: err.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  // Erro de JSON malformado
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'JSON inválido',
      message: 'O corpo da requisição contém JSON malformado'
    });
  }

  // Erro interno do servidor
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
