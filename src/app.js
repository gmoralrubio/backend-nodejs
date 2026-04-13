import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs' // importamos el motor de plantillas

import { pagesRouter } from './routes/pages-routes.js'
import { utilitiesRouter } from './routes/utilities-routes.js'
import { tasksRouter } from './routes/tasks-routes.js'

// Creamos la aplicacion
const app = express()
const appDir = dirname(fileURLToPath(import.meta.url)) // url del archivo actual
console.log(appDir)
console.log(import.meta.url) // Lleva el file//

// Global middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(appDir, '../public'))) // Crea la ruta a /public
app.use(morgan('tiny'))

// Custom middleware para todas las rutas
app.use((req, res, next) => {
  console.log('Nueva Petición!')
  next()
})

// Configuracion del motor de plantillas
app.set('view engine', 'html') // Definimos el motor de vistas
app.engine('html', ejs.renderFile) // Definimos el motor como html de ejs
app.set('views', join(appDir, 'views')) // Definimos directorio de vistas

// Routes
app.use('/', pagesRouter)
app.use('/', utilitiesRouter)
app.use('/tasks', tasksRouter)

// Middleware para generar el plantillado html
app.use((req, res, next) => {
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
  <title>Server HTTP básico</title>
  <link rel="stylesheet" href="/app.css" />
  <link rel="icon" href="/icon.webp" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
</head>

<body>
  <nav class="container">
    <a href="/">Home</a>
    <a href="/tasks">Tasks (0)</a>
    <a href="/health">Health</a>
  </nav>
  <h1>Server HTTP básico</h1>
  <p>
    Renderizado con ejs. Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health
  </p>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>

</html>
  `)
})

// Handler 404
app.use((req, res) => {
  res.status(404).send('Resource not found')
})

// Exportamos la app que importaremos en www.js
export default app
