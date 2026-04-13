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
// app.use((req, res, next) => {
//   console.log('Nueva Petición!')
//   next()
// })

// Configuracion del motor de plantillas
app.set('view engine', 'html') // Definimos el motor de vistas
app.engine('html', ejs.renderFile) // Definimos el motor como html de ejs
app.set('views', join(appDir, 'views')) // Definimos directorio de vistas

// Routes
app.use('/', pagesRouter)
app.use('/', utilitiesRouter)
app.use('/tasks', tasksRouter)

// Handler 404
app.use((req, res) => {
  res.status(404).send('Resource not found')
})

// Exportamos la app que importaremos en www.js
export default app
