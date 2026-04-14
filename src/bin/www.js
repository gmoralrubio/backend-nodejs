// Importamos la aplicación
import app from '../app.js'
// Importamos la conexion a db
import { connectToDB } from '../lib/database.js'

// Configuramos el servidor a partir de las variables de entorno .env
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

// Si no se conecta, el servidor no se levanta por el await
await connectToDB()

// Ponemos el servidor a escuchar en el puerto definido
app.listen(PORT, HOST, () => {
  // Una vez arrancado el server, ejecuta el cb
  console.log(`Express.js app listening on http://${HOST}:${PORT}`)
})
