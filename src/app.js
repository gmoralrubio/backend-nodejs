import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs'

import { pagesRouter } from './routes/pages-routes.js'
import { utilitiesRouter } from './routes/utilities-routes.js'
import { tasksRouter } from './routes/tasks-routes.js'
import { authRouter } from './routes/auth-routes.js'
import { dataInViews } from './middleware/views-middleware.js'
import { guard, sessionInViews, sessionMiddleware } from './middleware/auth-middleware.js'

const app = express()
const appDir = dirname(fileURLToPath(import.meta.url))

// Global middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(appDir, '../public')))
app.use(morgan('tiny'))
app.use(dataInViews)
// Auth middlewares
app.use(sessionMiddleware)
app.use(sessionInViews)

// Configuracion del motor de plantillas
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.set('views', join(appDir, 'views'))

// Routes
app.use('/', pagesRouter)
app.use('/', utilitiesRouter)
app.use('/', authRouter)
app.use('/tasks', guard, tasksRouter)

// Handler 404
app.use((req, res) => {
	res.status(404).send('Resource not found')
})

export default app
