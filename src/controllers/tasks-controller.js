import { getTasks, countPendingTasks } from '../data/tasksRepository.js'

// TODO:
// enviar el htmlTask como variable
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
