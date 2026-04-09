// importamos el modulo
import express from 'express'

// Creamos la aplicacion
const app = express()
// Definimos el puerto
const port = 3000

// Ruta get
// Cada ruta recibe un callback con request y response
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Ponemos la aplicación a escuchar en el puerto definido
app.listen(port, () => {
  // Una vez arrancado el server, ejecuta el cb
  console.log(`App listening on port ${port}`)
})
