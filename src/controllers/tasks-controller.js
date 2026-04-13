import { getTasks, countPendingTasks } from '../data/tasksRepository.js'

export async function newTaskPageController(req, res, next) {
  const pendingTasks = await countPendingTasks()

  res.render('new-task.html', {
    title: 'Crear nueva tarea',
    pendingTasks: pendingTasks,
  })
}

export async function createTaskController(req, res, next) {
  console.log(req.body)

  const newTask = req.body

  // Redirecciona la peticion
  res.redirect('/tasks/new')
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
