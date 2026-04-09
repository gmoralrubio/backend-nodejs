// importamos el modulo
import express from 'express'
// modulo de node para obtener el directorio real de un path en concreto
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import morgan from 'morgan'
// En app.js inicializamos SOLO la app de express

// Creamos la aplicacion
const app = express()
const appDir = dirname(fileURLToPath(import.meta.url)) // url del archivo actual
console.log(appDir)
console.log(import.meta.url) // Lleva el file//

// Middleware propio de express que transforma en objeto datos de formulario
// o query strings
app.use(express.urlencoded({ extended: true }))
// Middleware para usar archivos estaticos
// Crea la ruta a /public
app.use(express.static(join(appDir, '../public')))

// morgan es un middleware de terceros
// HTTP request logger middleware for node.js
app.use(morgan('tiny'))

// Custom middleware para todas las rutas
app.use((req, res, next) => {
  console.log('Nueva Petición!')
  // un middleware siempre tiene que contestar a la peticion o llamar a next
  next()
})

// Ruta get
// Cada ruta recibe un callback con request y response
app.get('/', (req, res) => {
  // Escribe el header por defecto
  res.send('Hello World!')
})

// Recurso correspondiente a /health
app.get('/health', (req, res) => {
  // No hay que hacer JSON.stringify
  res.send({ status: 'ok' })
})

// Handler 404
// Si ha llegado hasta aqui es que no hay ninguna ruta que lo capture
app.use((req, res) => {
  // Con res.status seteamos el status de la response, por defecto es 200
  res.status(404).send('Resource not found')
})

// Exportamos la app que importaremos en www.js
export default app
