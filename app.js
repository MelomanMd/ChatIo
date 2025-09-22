const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3010;
const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let filePath = path.join(publicDir, url.pathname);

  if (filePath.endsWith(path.sep)) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      serveFile(path.join(publicDir, 'index.html'), 'text/html; charset=utf-8', res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    serveFile(filePath, contentType, res);
  });
});

server.listen(port, () => {
  console.log(`Codex running on port ${port}`);
});

function serveFile(filePath, contentType, res) {
  fs.createReadStream(filePath)
    .on('open', () => {
      res.writeHead(200, { 'Content-Type': contentType });
    })
    .on('error', () => {
      res.writeHead(500);
      res.end('Internal Server Error');
    })
    .pipe(res);
}
