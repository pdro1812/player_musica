const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Obter o caminho absoluto do arquivo solicitado
    const filePath = path.join(__dirname, 'screen', req.url);

    // Verificar se o arquivo solicitado existe
    fs.exists(filePath, (exists) => {
        if (exists) {
            // Ler o conteúdo do arquivo solicitado
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    // Se ocorrer um erro ao ler o arquivo
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Erro interno do servidor');
                } else {
                    // Definir o tipo MIME com base na extensão do arquivo
                    const ext = path.extname(filePath).toLowerCase();
                    const mimeTypes = {
                        '.html': 'text/html',
                        '.css': 'text/css',
                        '.js': 'text/javascript',
                        // Adicione mais extensões conforme necessário
                    };
                    const contentType = mimeTypes[ext] || 'application/octet-stream';

                    // Se a leitura for bem-sucedida, enviar o conteúdo do arquivo com o tipo MIME apropriado
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                }
            });
        } else {
            // Se o arquivo não existir, responder com 404 - Not Found
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página não encontrada');
        }
    });
});

// Definir a porta na qual o servidor deve escutar
const port = 8080;
server.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});