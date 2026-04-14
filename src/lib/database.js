// Se encarga de conectarse a BBDD
// Lo hacemos con npm mongodb driver
import { MongoClient } from 'mongodb'

// Traemos la uri de la db
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// Creamos y exportamos el cliente
// El cliente se importará donde sea que queramos usarlo
export const client = new MongoClient(MONGODB_URI)

// La db siempre está conectada, nos conectaremos cuando levantemos el servidor (www.js)
export async function connectToDB() {
  // Conectamos a la db
  await client.connect()
  console.log('Connected to MongoDB')
}
