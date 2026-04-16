import { countPendingTasks } from '../data/tasksRepository.js'
import { User } from '../models/user-model.js'

export async function loginPageController(req, res, next) {
	res.render('login.html', {
		title: 'Inicia sesión',
		values: {},
	})
}

export async function loginActionController(req, res, next) {
	if (
		!req.body.email ||
		req.body.email === '' ||
		!req.body.password ||
		req.body.password === ''
	) {
		const errorMessage = 'El usuario y la contraseña son obligatorios'

		res.render('login.html', {
			title: 'Inicia sesión',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}
	// Si llegamos aqui, tenemos usuario y contraseña
	const user = await User.findOne({ email: req.body.email }).select('+password') // indicamos que traiga el password
	console.log(user)

	if (!user || !(await user.comparePassword(req.body.password))) {
		const errorMessage = 'Credenciales inválidas'

		res.render('login.html', {
			title: 'Inicia sesión',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}

	// Tenemos usuario y su pass es correcta
	// req.session.userId = user._id
	req.session.userId = user._id
	console.log(req.session)

	res.redirect('/')
}
