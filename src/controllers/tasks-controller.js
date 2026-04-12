import { getTasks, countPendingTasks } from '../data/tasksRepository.js'

// TODO:
// Refactorizar este controlador para usar el middleware
export async function tasksPageController(req, res, next) {
  res.locals.title = 'Tasks'
  res.locals.pendingTasks = await countPendingTasks()
  const tasks = await getTasks()
  const htmlTasks = tasks.map(
    task => `<li>#${task.id} - ${task.title} - ${task.done ? '[x]' : '[ ]'}`,
  )
  res.locals.content = `<ul style="display:flex; gap: 1rem; list-style: none;">
      <li><a href="/tasks?status=pending">Pending</a></li>
      <li><a href="/tasks?status=done">Done</a></li>
      <li><a href="/tasks?status=all">All</a></li>
    </ul>
    <ul style="list-style: none;">
      ${htmlTasks}
    </ul>`

  res.locals.html = true
  next()
  return
}
