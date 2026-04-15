import {
	getTasks,
	countPendingTasks,
	addNewTask,
	updateTask,
	deleteTask,
	getTask,
} from '../data/tasksRepository.js'

export async function newTaskPageController(req, res, next) {
	const title = 'Crear nueva tarea'
	const pendingTasks = await countPendingTasks()

	res.render('task.html', {
		title,
		pendingTasks,
		errorMessage: null,
		values: {},
	})
}

export async function createTaskController(req, res, next) {
	const title = 'Crear nueva tarea'
	const pendingTasks = await countPendingTasks()
	// Si el usuario no mete titulo...
	if (!req.body.title || req.body.title === '') {
		const errorMessage = 'El título es obligatorio'
		// El usuario tiene que acabar de insertar los datos
		// Devolvemos el formulario de nuevo
		res.render('task.html', {
			title,
			pendingTasks,
			errorMessage,
			// si nos ha pasado el formulario incompleto, devolvemos todo el body para pintar los valores que si nos envió
			values: req.body,
		})
		return
	}

	const newTask = {
		title: req.body.title,
		done: req.body.done === 'on' ? true : false, //req.body.done!!
	}
	const createdTask = await addNewTask(newTask)
	console.log(createdTask)

	// Redirecciona la peticion
	res.redirect('/tasks/')
}

export async function tasksPageController(req, res, next) {
	const pendingTasks = await countPendingTasks()
	const tasks = await getTasks()

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
		pendingTasks: pendingTasks,
		tasks: filteredTasks,
	})
}

export async function taskPageController(req, res, next) {
	const title = 'Detalle de tarea'
	const pendingTasks = await countPendingTasks()
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
		pendingTasks,
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
		const pendingTasks = await countPendingTasks()

		// El usuario tiene que acabar de insertar los datos
		// Devolvemos el formulario de nuevo
		res.render('task.html', {
			title,
			pendingTasks,
			errorMessage,
			// Devolvemos todo el body junto con el id
			values: {
				id: taskId,
				...req.body,
			},
		})
		return
	}
	// Actualizar la tarea
	// le pasamos el nuevo objeto de tarea a sustituir, con el id
	await updateTask(taskId, {
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

	const newTasks = await deleteTask(taskId)

	// Devolvemos la nueva lista de tareas
	res.json(newTasks)
}
