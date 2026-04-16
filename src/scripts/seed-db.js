import { User } from '../models/user-model.js'
import { Task } from '../models/task-model.js'
import { connectToDB } from '../lib/database.js'

console.log('Init SeedDB')

// Conectamos a DB
const connection = await await connectToDB()

console.log(`Connected to MongoDB: ${connection.name}`)

// Estaría bien lanzar una confirmación al usuario (scripting .sh)
// Oye, esto lo elimina todo, seguimos?

// Importante que primero se llame a Users, ya que Task depende de Users
await seedUsers()
await seedTasks()

// Al final del proceso cerramos la conexión y terminamos el proceso
// 0    -> Ha finalizado ok
// != 0 -> Ha finalizado con errores
await connection.close()
process.exit(0)

async function seedUsers() {
	const USERS = [
		{ name: 'John Doe', email: 'johndoe@email.com', password: '1234' },
		{ name: 'Admin', email: 'admin@email.com', password: '1234' },
	]

	// Eliminamos los posibles usuarios
	const deleteResult = await User.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] User`)

	// Insertamos usuarios mock
	const insertedUsers = await User.insertMany(USERS)
	console.log(`Inserted [${insertedUsers.length}] User`)
}

async function seedTasks() {
	// Traemos los mock de usuario para pasarselo como owner a Task, creando la relacion entre los dos modelos
	const [jd, ad] = await Promise.all([
		User.findOne({ email: 'johndoe@email.com' }),
		User.findOne({ email: 'admin@email.com' }),
	])

	const TASKS = [
		{ title: 'Preparar la clase de asincronia', done: false, owner: jd._id },
		{ title: 'Revisar los ejemplos de fs/promises', done: true, owner: ad._id },
		{ title: 'Explicar Promise.all en directo', done: false, owner: jd._id },
	]

	// Eliminamos los posibles usuarios
	const deleteResult = await Task.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] Task`)

	// Insertamos usuarios mock
	const insertedTasks = await Task.insertMany(TASKS)
	console.log(`Inserted [${insertedTasks.length}] Task`)
}
