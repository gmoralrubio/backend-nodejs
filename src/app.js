// importamos el modulo
import express from 'express'

// En app.js inicializamos SOLO la app de express

// Creamos la aplicacion
const app = express()

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

// Exportamos la app que importaremos en www.js
export default app
