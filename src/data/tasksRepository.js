// Importamos ObjectId, de un string nos devuelve un objeto id de mongo
import { ObjectId } from 'mongodb'
import { Task } from '../models/task-model.js'
import { User } from '../models/user-model.js'

const dbClient = {}

const COLLECTION = 'tasks'

// El concepto es que ya no trabajamos contra la base de datos,
// si no contra el modelo de mongoose

// obtenemos las tareas de la DB
export async function getTasks() {
	// Usamos el modelo de mongoose
	// Con populate('owner') rellena los datos de owner en task
	// Tenemos que importar tambien el esquema de User
	const result = await Task.find({})
	// .populate('owner')
	return result
}

// Creamos un método para obtener las tareas de un usuario concreto
export async function getTasksByUser(userId) {
	return Task.find({
		owner: userId,
	})
}

export async function countPendingTasks() {
	// const tasks = await getTasks()
	// return tasks.filter(task => task.done === false).length

	// Usamos mongo para contar los documentos de una coleccion
	// a countDocuments le pasamos un filtro ({done: false})
	// const count = await dbClient.collection(COLLECTION).countDocuments({
	//   done: false,
	// })

	// Contamos documentos con el modelo de mongoose
	const count = Task.countDocuments({
		done: false,
	})
	return count
}

export async function getTask(_id) {
	// Obtenemos una tarea
	// const task = await dbClient.collection(COLLECTION).findOne({
	// 	_id: new ObjectId(_id),
	// })

	// Con findById, buscamos por id
	const task = await Task.findById(_id)
	return task
}

export async function addNewTask(task) {
	// // Obtener el json
	// const tasks = await getTasks()
	// // Crear una nueva tarea (dar id)
	// const lastId = tasks.sort((a, b) => a - b)[tasks.length - 1].id // último elemento
	// const newTask = { id: lastId + 1, ...task }
	// // Guardar ese fichero
	// const fileUrl = new URL('./tasks.json', import.meta.url)
	// // Añadir esa nueva tarea a la lista
	// tasks.push(newTask)
	// await writeFile(fileUrl, JSON.stringify(tasks))
	// // Devolver el objeto creado
	// return newTask

	// const newTask = await dbClient.collection(COLLECTION).insertOne(task)

	// new Task espera un objeto que tenga la misma forma que task y devuelve on objeto de task con el _id
	const newTask = new Task(task)
	// Guardamos la tarea
	await newTask.save()
	console.log(newTask)

	return newTask
}

// Verificamos que la tarea a actualizar sea del usuario
export async function updateTask(taskId, ownerId, updatedTask) {
	// const tasks = await getTasks()
	// const taskIdx = tasks.findIndex(i => i.id === taskId)

	// // Verificamos el id
	// if (taskIdx === -1) {
	//   return
	// }
	// // Reemplazamos la tarea por su indice dentro de tasks
	// tasks[taskIdx] = newTask
	// const fileUrl = new URL('./tasks.json', import.meta.url)
	// await writeFile(fileUrl, JSON.stringify(tasks))

	// const task = await dbClient.collection(COLLECTION).updateOne(
	// 	{ _id: new ObjectId(taskId) },
	// 	{
	// 		$set: {
	// 			title: updatedTask.title,
	// 			done: updatedTask.done,
	// 		},
	// 	},
	// )

	// Solo filtra por taskId
	// const task = await Task.findByIdAndUpdate(taskId, {
	// 	$set: {
	// 		title: updatedTask.title,
	// 		done: updatedTask.done,
	// 	},
	// })

	// Le pasamos el un filtro (id tarea y id owner) y un update query
	const task = await Task.findOneAndUpdate(
		{
			// Filtramos por tarea y owner
			_id: taskId,
			owner: ownerId,
		},
		{
			$set: {
				title: updatedTask.title,
				done: updatedTask.done,
			},
		},
	)

	return task
}

export async function deleteTask(taskId, ownerId) {
	// const tasks = await getTasks()
	// const taskIdx = tasks.findIndex(i => i.id === taskId)
	// if (taskIdx === -1) {
	//   return
	// }

	// // Eliminamos la tarea con splice (modifica tasks in-place)
	// tasks.splice(taskIdx, 1)
	// const fileUrl = new URL('./tasks.json', import.meta.url)
	// await writeFile(fileUrl, JSON.stringify(tasks))

	// const deleteResult = dbClient.collection(COLLECTION).deleteOne({
	// 	_id: new ObjectId(taskId),
	// })

	// const deleteResult = await Task.findByIdAndDelete(taskId)

	// Filtramos por tarea y usuario, no solo por tarea
	const deleteResult = await Task.findOneAndDelete({
		_id: taskId,
		owner: ownerId,
	})

	return deleteResult
}
