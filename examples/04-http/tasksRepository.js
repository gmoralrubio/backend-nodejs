import { readFile } from 'node:fs/promises'; // importamos para leer archivos con promesas

// Función para obtener el contenido del json
// Conviene no importar el .json
export async function getTasks() {
  const fileUrl = new URL('./tasks.json', import.meta.url);
  const fileContents = await readFile(fileUrl, 'utf-8');
  return JSON.parse(fileContents);
}

export async function countPendingTasks() {
  const tasks = await getTasks();
  return tasks.filter(task => task.done === false).length;
}
