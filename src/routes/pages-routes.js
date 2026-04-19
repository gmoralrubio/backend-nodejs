import express from 'express'
import { homePageController } from '../controllers/pages-controllers.js'

export const pagesRouter = express.Router()

pagesRouter.get('/', homePageController)

pagesRouter.get('/contact', (req, res, next) => {
	res.send('Contacto')
})
