// Creamos un servidor http nativo

// Cuando importo librerias, nombro el nombre del paquete o libreria
// Si importamos sin llaves, es porque se exporta como default
import http from 'node:http'

// Cuando importamos modulos internos de nuestra aplicación,
// tenemos que definir la ruta, de forma absoluta o relativa
// Si importamos con llaves, el modulo NO se exporta como default
import { PORT, HOST } from './config.js'
import { renderPage } from './renderUtils.js'
import { getTasks } from './tasksRepository.js'

// createServer recibe un callback que recibe dos parámetros
// request, objeto de peticion
// response, objeto de respuesta
// hacemos el callback asincrono ya que dentro consumimos las tareas
const server = http.createServer(async (req, res) => {
  // si no recibimos url, asumimos que es root
  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)

  // Variable para capturar un posible error
  let error
  // URL de Health -> GET /health
  // Va a devolver un json con {status: ok}
  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ status: 'ok' }))
    return // cerramos la peticion, ya que luego podría reescribirse el header
  }

  // Cuando navegamos a /tasks, devolvemos el listado de tareas en formato html
  // Devuelve las tareas en formato html (una lista de #id - {Nombre} - [x] / [x])
  // Esta lista es dinámica
  if (req.method === 'GET' && url.pathname === '/tasks') {
    // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // Si ocurre un error en este try, no falla todo, entra en el catch y continua la ejecucion
    try {
      // Obtenemos los query params
      // url es un Objeto URL, no req.url
      const params = url.searchParams
      console.log(params)
      // Esperamos a recibir las tasks
      const tasks = await getTasks()

      // Si existe el parametro status: pending - done - all, filtrar por su estado
      // si no pasa status, status es all
      const status = url.searchParams.get('status') ?? 'all'
      console.log(status)

      let filteredTasks
      if (status === 'pending') {
        filteredTasks = tasks.filter(t => t.done === false)
      } else if (status === 'done') {
        filteredTasks = tasks.filter(t => t.done === true)
      } else {
        filteredTasks = tasks
      }

      const htmlTasks = filteredTasks.map(
        task => `<li>#${task.id} - ${task.title} - ${task.done ? '[x]' : '[ ]'}`,
      )

      res.end(
        await renderPage({
          title: 'Tasks',
          content:
            htmlTasks.length === 0
              ? 'No se han encontrado tareas'
              : `<ul>${htmlTasks}</ul>`,
        }),
      )
      return
    } catch (exception) {
      // TODO: Captura de errores
      // Debemos capturar un posible error en json
      // Devolver un error 500 (error de servidor)
      console.log(exception)
      error = true
    }
  }

  // 1. En / devolver un contenido legible (HTML)
  if (req.method === 'GET' && url.pathname === '/') {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(
        await renderPage({
          title: 'Server HTTP básico',
          content:
            '<p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health</p>',
        }),
      )
      return
    } catch (exception) {
      console.log(exception)
      error = true
    }
  }

  if (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Internal Server Error')
    return
  }

  // 2. Asegurarnos que funcionan las rutas que nosotros definimos
  // Si no definimos que pasa con las rutas que no hemos creado, el navegador acaba dando un timeout, para esto creamos un handler 404

  // Handler 404
  // No tengo ninguna ruta que conteste a la petición, devuelvo un 404
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Ruta no encontrada')
})

// Le pasamos el puerto, el host y un callback que se ejecuta cuando se levante el servidor
server.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://${HOST}:${PORT}`)
})
