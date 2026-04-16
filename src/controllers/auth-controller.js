import { countPendingTasks } from '../data/tasksRepository.js'

export async function loginPageController(req, res, next) {
	const pendingTasks = await countPendingTasks()
	res.render('login.html', {
		title: 'Inicia sesión',
		pendingTasks: pendingTasks,
	})
}
