// Exporta funciones que se encargan de gestionar la aplicación
import { countPendingTasks } from '../data/tasksRepository.js'

export async function homePageController(req, res, next) {
  // Usamos el render de ejs
  // Cualquier ruta que le pasemos a render es relativa a views
  res.render('index.html') // ruta relativa al directorio de vistas

  // TODO: Refactorizar
  return
  res.locals.title = 'Server con Express básico'
  res.locals.pendingTasks = await countPendingTasks()
  res.locals.content =
    '<p>Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health</p>'
  res.locals.html = true
  next()
  return
}
