// Creamos un servidor http nativo

import http from 'node:http';

const port = 8000;
const host = '127.0.0.1'; // ip interna, equivalente a localhost

// createServer recibe un callback que recibe dos parámetros
// request, objeto de peticion
// response, objeto de respuesta
const server = http.createServer((req, res) => {
  console.log(req.headers);
  console.log(req.url);

  // si no recibimos url, asumimos que es root
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  // URL de Health -> GET /health
  // Va a devolver un json con {status: ok}

  // En cualquier otro caso va a devolver texto plano 'Servidor HTTP funcionando'

  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok' }));
    return; // cerramos la peticion, ya que luego podría reescribirse el header
  }

  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Servidor HTTP funcionando');

  // Escribimos los headers
  // Todos los headers que no sean http, se prefijan con X
  // const serverDate = new Date();
  // res.writeHead(200, {
  //   'Content-Type': 'application/json',
  //   'X-Author': 'Guille',
  //   'X-Server-Date': serverDate,
  // });
  // res.end(
  //   JSON.stringify({
  //     data: 'Hello World',
  //     serverDate,
  //   }),
  // );
});

// Le pasamos el puerto, el host y un callback que se ejecuta cuando se levante el servidor
server.listen(port, host, () => {
  console.log(`Servidor escuchando en http://${host}:${port}`);
});
