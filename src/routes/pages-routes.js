// Al ser objetos de express, hay que importar express
import express from 'express'

export const pagesRouter = express.Router()

// Podemos tener todas las rutas aqui e importarlas en app.js
pagesRouter.get('/', (req, res, next) => {
  const title = 'Server con Express básico'
  const pendingTasks = 0
  const content =
    '<p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health</p>'
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
      <h1>${title}</h1>
      ${content}

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    </body>
    </html>
  `)
})

pagesRouter.get('/contact', (req, res, next) => {
  res.send('Contacto')
})
