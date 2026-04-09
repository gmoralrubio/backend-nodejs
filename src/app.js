// En app.js inicializamos SOLO la app de express
// modulo de node para obtener el directorio real de un path en concreto
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
// importamos el modulo express
import express from 'express'
import morgan from 'morgan'

// Importamos el router
import { pagesRouter } from './routes/pages-routes.js'
import { utilitiesRouter } from './routes/utilities-routes.js'
import { tasksRouter } from './routes/tasks-routes.js'

// Creamos la aplicacion
const app = express()
const appDir = dirname(fileURLToPath(import.meta.url)) // url del archivo actual
console.log(appDir)
console.log(import.meta.url) // Lleva el file//

// Middleware propio de express que transforma en objeto datos de formulario
// o query strings
app.use(express.urlencoded({ extended: true }))
// Middleware para usar archivos estaticos
app.use(express.static(join(appDir, '../public'))) // Crea la ruta a /public
// morgan es un middleware de terceros para logs
app.use(morgan('tiny'))

// Custom middleware para todas las rutas
app.use((req, res, next) => {
  console.log('Nueva Petición!')
  // un middleware siempre tiene que contestar a la peticion o llamar a next
  next()
})

// Routes
// Todas las rutas que empiecen por / entran por los routers
app.use('/', pagesRouter)
app.use('/', utilitiesRouter)
app.use('/tasks', tasksRouter)

// Middleware para generar el plantillado html
app.use((req, res, next) => {
  // locals permite definir variables en cualquier parte de la peticion
  // Estaran disponibles en todos los middlewares
  const renderHtml = res.locals.html

  if (!renderHtml) {
    next()
    return
  }

  const title = res.locals.title || 'Express App'
  const pendingTasks = res.locals.pendingTasks || 0
  const content = res.locals.content || '<p>Default</p>'

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/app.css"/>
      <link rel="icon" href="/icon.webp" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    </head>
    <body>
      <nav class="container">
        <a href="/">Home</a>
        <a href="/tasks">Tasks (${pendingTasks})</a>
        <a href="/health">Health</a>
      </nav>
      <h1>${title}</h1>
      ${content}

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </body>
    </html>
  `)
})

// Handler 404
// Si ha llegado hasta aqui es que no hay ninguna ruta que lo capture
app.use((req, res) => {
  // Con res.status seteamos el status de la response, por defecto es 200
  res.status(404).send('Resource not found')
})

// Exportamos la app que importaremos en www.js
export default app
