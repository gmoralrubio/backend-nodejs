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

// Handler 404
// Si ha llegado hasta aqui es que no hay ninguna ruta que lo capture
app.use((req, res) => {
  // Con res.status seteamos el status de la response, por defecto es 200
  res.status(404).send('Resource not found')
})

// Exportamos la app que importaremos en www.js
export default app
