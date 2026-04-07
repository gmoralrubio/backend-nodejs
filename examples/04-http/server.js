// Creamos un servidor http nativo

// Cuando importo librerias, nombro el nombre del paquete o libreria
// Si importamos sin llaves, es porque se exporta como default
import http from 'node:http';

// Cuando importamos modulos internos de nuestra aplicación,
// tenemos que definir la ruta, de forma absoluta o relativa
// Si importamos con llaves, el modulo NO se exporta como default
import { PORT, HOST } from './config.js';
import { renderPage } from './renderUtils.js';
import { getTasks } from './tasksRepository.js';

// createServer recibe un callback que recibe dos parámetros
// request, objeto de peticion
// response, objeto de respuesta
// hacemos el callback asincrono ya que dentro consumimos las tareas
const server = http.createServer(async (req, res) => {
  // si no recibimos url, asumimos que es root
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);

  // URL de Health -> GET /health
  // Va a devolver un json con {status: ok}
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok' }));
    return; // cerramos la peticion, ya que luego podría reescribirse el header
  }

  // Cuando navegamos a /tasks, devolvemos el listado de tareas en formato html
  // Devuelve las tareas en formato html (una lista de #id - {Nombre} - [x] / [x])
  // Esta lista es dinámica
  if (req.method === 'GET' && url.pathname === '/tasks') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Esperamos a recibir las tasks
    const tasks = await getTasks();
    const htmlTasks = tasks.map(
      task => `<li>#${task.id} - ${task.title} - ${task.done ? '[x]' : '[ ]'}`,
    );
    res.end(
      renderPage({
        title: 'Tasks',
        content: `<ul>${htmlTasks}</ul>`,
      }),
    );
    return;
  }

  // 1. En / devolver un contenido legible (HTML)
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      renderPage({
        title: 'Server HTTP básico',
        content:
          '<p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health</p>',
      }),
    );
    return;
  }

  // 2. Asegurarnos que funcionan las rutas que nosotros definimos
  // Si no definimos que pasa con las rutas que no hemos creado, el navegador acaba dando un timeout, para esto creamos un handler 404

  // Handler 404
  // No tengo ninguna ruta que conteste a la petición, devuelvo un 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Ruta no encontrada');
});

// Le pasamos el puerto, el host y un callback que se ejecuta cuando se levante el servidor
server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});
