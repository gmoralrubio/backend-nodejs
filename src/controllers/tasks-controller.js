import { getTasks, countPendingTasks } from '../data/tasksRepository.js'

// TODO:
// Refactorizar este controlador para usar el middleware
export async function tasksPageController(req, res, next) {
  const title = 'Tasks'
  const pendingTasks = await countPendingTasks()
  const tasks = await getTasks()
  const htmlTasks = tasks.map(
    task => `<li>#${task.id} - ${task.title} - ${task.done ? '[x]' : '[ ]'}`,
  )
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/app.css"/>
      <link rel="icon" href="/icon.webp" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    </head>
    <body>
      <nav class="container">
        <a href="/">Home</a>
        <a href="/tasks">Tasks (${pendingTasks})</a>
        <a href="/health">Health</a>
      </nav>
      <div class="container">
        <h1>${title}</h1>
        <ul style="display:flex; gap: 1rem; list-style: none;">
          <li><a href="/tasks?status=pending">Pending</a></li>
          <li><a href="/tasks?status=done">Done</a></li>
          <li><a href="/tasks?status=all">All</a></li>
        </ul>
        <ul style="list-style: none;">
          ${htmlTasks}
        </ul>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </body>
    </html>
  `)
}
