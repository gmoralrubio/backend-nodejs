// Al ser objetos de express, hay que importar express
import express from 'express'

export const pagesRouter = express.Router()

// Podemos tener todas las rutas aqui e importarlas en app.js
pagesRouter.get('/', (req, res, next) => {
  res.send('Hello World')
})

pagesRouter.get('/contact', (req, res, next) => {
  res.send('Contacto')
})
