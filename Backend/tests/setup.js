// Setup global para testes
process.env.NODE_ENV = 'test';

// Configurações globais para testes
global.console = {
  ...console,
  // Suprimir logs durante testes, mas manter para depuração se necessário
  log: process.env.DEBUG_TESTS ? console.log : jest.fn(),
  debug: process.env.DEBUG_TESTS ? console.debug : jest.fn(),
  info: process.env.DEBUG_TESTS ? console.info : jest.fn(),
  warn: process.env.DEBUG_TESTS ? console.warn : jest.fn(),
  error: process.env.DEBUG_TESTS ? console.error : jest.fn(),
};
