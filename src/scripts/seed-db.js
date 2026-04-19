import { User } from '../models/user-model.js'
import { Task } from '../models/task-model.js'
import { connectToDB } from '../lib/database.js'

console.log('Init SeedDB')

const connection = await connectToDB()

console.log(`Connected to MongoDB: ${connection.name}`)

await seedUsers()
await seedTasks()

await connection.close()
process.exit(0)

async function seedUsers() {
	const USERS = [
		{
			name: 'John Doe',
			email: 'johndoe@email.com',
			password: await User.hashPassword('1234'),
		},
		{
			name: 'Admin',
			email: 'admin@email.com',
			password: await User.hashPassword('1234'),
		},
	]

	const deleteResult = await User.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] User`)

	const insertedUsers = await User.insertMany(USERS)
	console.log(`Inserted [${insertedUsers.length}] User`)
}

async function seedTasks() {
	const [jd, ad] = await Promise.all([
		User.findOne({ email: 'johndoe@email.com' }),
		User.findOne({ email: 'admin@email.com' }),
	])

	const TASKS = [
		{ title: 'Preparar la clase de asincronia', done: false, owner: jd._id },
		{ title: 'Revisar los ejemplos de fs/promises', done: true, owner: ad._id },
		{ title: 'Explicar Promise.all en directo', done: false, owner: jd._id },
	]

	const deleteResult = await Task.deleteMany({})
	console.log(`Deleted [${deleteResult.deletedCount}] Task`)

	const insertedTasks = await Task.insertMany(TASKS)
	console.log(`Inserted [${insertedTasks.length}] Task`)
}
