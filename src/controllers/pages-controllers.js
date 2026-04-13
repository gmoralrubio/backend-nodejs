// Exporta funciones que se encargan de gestionar la aplicación
import { countPendingTasks } from '../data/tasksRepository.js'

export async function homePageController(req, res, next) {
  const pendingTasks = await countPendingTasks()
  // Usamos el render de ejs
  // Cualquier ruta que le pasemos a render es relativa a views
  // Como segundo parametro recibe el contexto de la plantilla
  res.render('index.html', {
    title: 'Servidor HTTP básico',
    content:
      'Este ejemplo ya respira web SSR: una ruta HTML, una lista HTML y una ruta de health',
    pendingTasks: pendingTasks,
  })

  return
}
