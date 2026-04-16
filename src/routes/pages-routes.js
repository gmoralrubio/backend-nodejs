// Al ser objetos de express, hay que importar express
import express from 'express'
// importamos el controlador de la home
import { homePageController } from '../controllers/pages-controllers.js'

export const pagesRouter = express.Router()

// Podemos tener todas las rutas aqui e importarlas en app.js

// Delegamos al controlador
pagesRouter.get('/', homePageController)

pagesRouter.get('/contact', (req, res, next) => {
	res.send('Contacto')
})
