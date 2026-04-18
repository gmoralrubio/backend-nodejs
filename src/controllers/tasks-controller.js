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

	// Si el usuario no mete titulo...
	if (!req.body.title || req.body.title === '') {
		const errorMessage = 'El título es obligatorio'
		// El usuario tiene que acabar de insertar los datos
		// Devolvemos el formulario de nuevo
		res.render('task.html', {
			title,
			errorMessage,
			// si nos ha pasado el formulario incompleto, devolvemos todo el body para pintar los valores que si nos envió
			values: req.body,
		})
		return
	}

	const newTask = {
		title: req.body.title,
		done: req.body.done === 'on' ? true : false, //req.body.done!!
		owner: userId, // creamos la tarea con un owner
	}
	const createdTask = await addNewTask(newTask)

	// Redirecciona la peticion
	res.redirect('/tasks/')
}

export async function tasksPageController(req, res, next) {
	// Filtramos las tareas para que solo aparezcan las del usuario logado,
	// no las de todos los usuarios
	const userId = req.session.userId
	const tasks = await getTasksByUser(userId)

	// Hay que usar el middleware app.use(express.urlencoded({ extended: true }))
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
	// Extraemos los parametros de la url de la peticion
	const taskId = req.params.taskId
	// Obtener la tarea
	const task = await getTask(taskId)
	console.log(task)

	if (!task) {
		// Devolver 404
		next()
		return
	}

	// Pasar los datos a la plantilla
	res.render('task.html', {
		title,
		errorMessage: null,
		values: { _id: task._id, title: task.title, done: task.done ? 'on' : '' },
	})
}

export async function editTaskController(req, res, next) {
	const title = 'Detalle de tarea'
	// Obtener la tarea
	const taskId = req.params.taskId
	const task = await getTask(taskId)
	if (!task) {
		// Devolver 404
		next()
		return
	}
	// Verificar datos
	if (!req.body.title || req.body.title === '') {
		const errorMessage = 'El título es obligatorio'
		// El usuario tiene que acabar de insertar los datos
		// Devolvemos el formulario de nuevo
		res.render('task.html', {
			title,
			errorMessage,
			// Devolvemos todo el body junto con el id
			values: {
				id: taskId,
				...req.body,
			},
		})
		return
	}

	// Verificar de que usuario es la tarea
	const userId = req.session.userId

	// Actualizar la tarea
	// le pasamos el nuevo objeto de tarea a sustituir, con el id y el id del owner
	await updateTask(taskId, userId, {
		id: taskId,
		title: req.body.title,
		done: req.body.done === 'on' ? true : false, //req.body.done!!
	})

	// Devolver algo -> redirect
	res.redirect('/tasks')
}

export async function deleteTaskController(req, res, next) {
	// Obtener la tarea
	const taskId = req.params.taskId
	const task = await getTask(taskId)
	if (!task) {
		// Devolver 404
		next()
		return
	}

	const userId = req.session.userId

	const newTasks = await deleteTask(taskId, userId)

	// Devolvemos la nueva lista de tareas
	res.json(newTasks)
}
