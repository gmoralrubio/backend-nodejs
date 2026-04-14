import { readFile, writeFile } from 'node:fs/promises'

export async function getTasks() {
  const fileUrl = new URL('./tasks.json', import.meta.url)
  const fileContents = await readFile(fileUrl, 'utf-8')
  return JSON.parse(fileContents)
}

export async function countPendingTasks() {
  const tasks = await getTasks()
  console.log()

  return tasks.filter(task => task.done === false).length
}

export async function addNewTask(task) {
  // Obtener el json
  const tasks = await getTasks()
  // Crear una nueva tarea (dar id)
  const lastId = tasks.sort((a, b) => a - b)[tasks.length - 1].id // último elemento
  const newTask = { id: lastId + 1, ...task }
  // Guardar ese fichero
  const fileUrl = new URL('./tasks.json', import.meta.url)
  // Añadir esa nueva tarea a la lista
  tasks.push(newTask)
  await writeFile(fileUrl, JSON.stringify(tasks))
  // Devolver el objeto creado
  return newTask
}

export async function updateTask(taskId, newTask) {
  const tasks = await getTasks()
  const taskIdx = tasks.findIndex(i => i.id === taskId)

  // Verificamos el id
  if (taskIdx === -1) {
    return
  }
  // Reemplazamos la tarea por su indice dentro de tasks
  tasks[taskIdx] = newTask
  const fileUrl = new URL('./tasks.json', import.meta.url)
  await writeFile(fileUrl, JSON.stringify(tasks))
  return newTask
}

export async function deleteTask(taskId) {
  const tasks = await getTasks()
  const taskIdx = tasks.findIndex(i => i.id === taskId)
  if (taskIdx === -1) {
    return
  }

  // Eliminamos la tarea con splice (modifica tasks in-place)
  tasks.splice(taskIdx, 1)
  const fileUrl = new URL('./tasks.json', import.meta.url)
  await writeFile(fileUrl, JSON.stringify(tasks))
  return tasks
}
