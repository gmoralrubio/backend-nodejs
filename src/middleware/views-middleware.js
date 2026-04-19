import { countPendingTasks } from '../data/tasksRepository.js'

export async function dataInViews(req, res, next) {
	const pendingTasks = await countPendingTasks()
	res.locals.pendingTasks = pendingTasks
	res.locals.errorMessage = null
	next()
}
