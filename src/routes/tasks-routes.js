import express from 'express'
import {
	tasksPageController,
	createTaskController,
	newTaskPageController,
	taskPageController,
	editTaskController,
	deleteTaskController,
} from '../controllers/tasks-controller.js'

export const tasksRouter = express.Router()

// C:
tasksRouter.get('/new', newTaskPageController)
tasksRouter.post('/', createTaskController)

// R:
tasksRouter.get('/', tasksPageController)

// U:
tasksRouter.get('/:taskId', taskPageController)
tasksRouter.post('/edit/:taskId', editTaskController)

// D:
tasksRouter.delete('/:taskId', deleteTaskController)
