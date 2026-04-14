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

// Estamos bajo el dominio de tasks
//   GET / (obtener todas)
//   GET /id (obtener por id)
//   POST / (crear una)
//   PUT /id (actualizar una) //! /update/id (evitar)
//   DELETE /id (eliminar una) //! /delete/id (evitar)

// CRUD de Tareas

// C:
// Creamos ruta
tasksRouter.get('/new', newTaskPageController)
tasksRouter.post('/', createTaskController)

// R:
// Esta ruta es relativa a /task
// El router ya incluye la ruta declarada en app
tasksRouter.get('/', tasksPageController)

// U:
// Creamos una ruta get por id
// Nosotros damos el nombre por el cual luego accederemos en el req.params
tasksRouter.get('/:taskId', taskPageController)
tasksRouter.post('/edit/:taskId', editTaskController)

// D:
tasksRouter.delete('/:taskId', deleteTaskController)
