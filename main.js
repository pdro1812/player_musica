const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Obter o caminho absoluto do arquivo HTML
    const filePath = path.join(__dirname, 'index.html');

    // Ler o conteúdo do arquivo HTML
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Se ocorrer um erro ao ler o arquivo
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro interno do servidor');
        } else {
            // Se a leitura for bem-sucedida, enviar o conteúdo do arquivo como resposta
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Definir a porta na qual o servidor deve escutar
const port = 3000;
server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});