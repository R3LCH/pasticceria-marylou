import http from 'http';
import fs from 'fs/promises';
import path from 'path';
const PORT = 8086;
const BASE = 'dist';
const server = http.createServer(async (req, res) => {
  let url = req.url.startsWith('/pasticceria-marylou') ? req.url.slice(20) : req.url;
  if (url === '' || url === '/') url = '/index.html';
  const filePath = path.join(BASE, url);
  try {
    const data = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const mime = {'.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json'}[ext] || 'text/html';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  } catch (e) {
    res.writeHead(404);
    res.end('404: ' + url);
  }
});
server.listen(PORT, '127.0.0.1', () => console.log(`Ready: http://127.0.0.1:${PORT}/pasticceria-marylou/`));
