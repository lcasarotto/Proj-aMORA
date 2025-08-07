const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

// Mapa de tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Rota padrão para o index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  // Verificar se o arquivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Arquivo não encontrado</h1>');
      return;
    }

    // Obter extensão do arquivo
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Ler e servir o arquivo
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Erro interno do servidor</h1>');
        return;
      }

      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🌐 Frontend servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos de: ${__dirname}`);
});

// Tratamento de erros
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já está em uso. Tente outra porta.`);
  } else {
    console.error('❌ Erro no servidor:', err);
  }
});
