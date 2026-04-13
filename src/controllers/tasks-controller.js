import { getTasks, countPendingTasks } from '../data/tasksRepository.js'

// TODO:
// enviar el htmlTask como variable
export async function tasksPageController(req, res, next) {
  const pendingTasks = await countPendingTasks()
  const tasks = await getTasks()

  res.render('tasks.html', {
    title: 'Tasks',
    pendingTasks: pendingTasks,
    tasks: tasks,
  })

  return
}
