import {
	addNewTask,
	updateTask,
	deleteTask,
	getTask,
	getTasksByUser,
} from '../data/tasksRepository.js'

export async function newTaskPageController(req, res, next) {
	const title = 'Crear nueva tarea'

	res.render('task.html', {
		title,
		errorMessage: null,
		values: {},
	})
}

export async function createTaskController(req, res, next) {
	const title = 'Crear nueva tarea'

	const userId = req.session.userId

	if (!req.body.title || req.body.title === '') {
		const errorMessage = 'El título es obligatorio'

		res.render('task.html', {
			title,
			errorMessage,
			values: req.body,
		})
		return
	}

	const newTask = {
		title: req.body.title,
		done: req.body.done === 'on' ? true : false,
		owner: userId,
	}
	const createdTask = await addNewTask(newTask)

	res.redirect('/tasks/')
}

export async function tasksPageController(req, res, next) {
	const userId = req.session.userId
	const tasks = await getTasksByUser(userId)

	const status = req.query.status ?? 'all'
	let filteredTasks = tasks

	if (status === 'pending') {
		filteredTasks = tasks.filter(task => task.done === false)
	} else if (status === 'done') {
		filteredTasks = tasks.filter(task => task.done === true)
	}

	res.render('tasks.html', {
		title: 'Tasks',
		tasks: filteredTasks,
	})
}

export async function taskPageController(req, res, next) {
	const title = 'Detalle de tarea'
	const taskId = req.params.taskId
	const task = await getTask(taskId)

	if (!task) {
		next()
		return
	}

	res.render('task.html', {
		title,
		errorMessage: null,
		values: { _id: task._id, title: task.title, done: task.done ? 'on' : '' },
	})
}

export async function editTaskController(req, res, next) {
	const title = 'Detalle de tarea'
	const taskId = req.params.taskId
	const task = await getTask(taskId)

	if (!task) {
		next()
		return
	}

	if (!req.body.title || req.body.title === '') {
		const errorMessage = 'El título es obligatorio'

		res.render('task.html', {
			title,
			errorMessage,
			values: {
				id: taskId,
				...req.body,
			},
		})
		return
	}

	const userId = req.session.userId

	await updateTask(taskId, userId, {
		id: taskId,
		title: req.body.title,
		done: req.body.done === 'on' ? true : false,
	})

	res.redirect('/tasks')
}

export async function deleteTaskController(req, res, next) {
	const taskId = req.params.taskId
	const task = await getTask(taskId)

	if (!task) {
		next()
		return
	}

	const userId = req.session.userId

	const newTasks = await deleteTask(taskId, userId)

	res.json(newTasks)
}
