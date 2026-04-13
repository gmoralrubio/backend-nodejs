import { getTasks, countPendingTasks, addNewTask } from '../data/tasksRepository.js'

export async function newTaskPageController(req, res, next) {
  const title = 'Crear nueva tarea'
  const pendingTasks = await countPendingTasks()

  res.render('new-task.html', {
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
    res.render('new-task.html', {
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
  res.redirect('/tasks')
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

  return
}
