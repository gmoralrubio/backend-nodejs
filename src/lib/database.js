// Mongoose se enecarga de la consexion, mongo sigue ahi
import mongoose from 'mongoose'

// Traemos la uri de la db
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

// La db siempre está conectada, nos conectaremos cuando levantemos el servidor (www.js)
export async function connectToDB() {
  // Conectamos a la db
  // Instanciamos mongoose, pasándole el nombre de la db
  const mongooseInstance = await mongoose.connect(MONGODB_URI, {
    dbName: process.env.DB_NAME || 'demo',
  })

  console.log('Connected to MongoDB')

  return mongooseInstance.connection
}
