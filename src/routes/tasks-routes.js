import express from 'express'
import { tasksPageController } from '../controllers/tasks-controller.js'

export const tasksRouter = express.Router()

// Esta ruta es relativa a /task
// El router ya incluye la ruta declarada en app
tasksRouter.get('/', tasksPageController)
