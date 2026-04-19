import { Task } from '../models/task-model.js'

export async function getTasks() {
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
	const count = Task.countDocuments({
		done: false,
	})
	return count
}

export async function getTask(_id) {
	const task = await Task.findById(_id)
	return task
}

export async function addNewTask(task) {
	const newTask = new Task(task)
	await newTask.save()

	return newTask
}

export async function updateTask(taskId, ownerId, updatedTask) {
	const task = await Task.findOneAndUpdate(
		{
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
	const deleteResult = await Task.findOneAndDelete({
		_id: taskId,
		owner: ownerId,
	})

	return deleteResult
}
