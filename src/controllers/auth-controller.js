import { User } from '../models/user-model.js'

export async function loginPageController(req, res, next) {
	res.render('login.html', {
		title: 'Inicia sesión',
		values: {},
	})
}

export async function loginActionController(req, res, next) {
	const redirectUrl = req.query.redirect
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

	const user = await User.findOne({ email: req.body.email }).select('+password')

	if (!user || !(await user.comparePassword(req.body.password))) {
		const errorMessage = 'Credenciales inválidas'

		res.render('login.html', {
			title: 'Inicia sesión',
			errorMessage: errorMessage,
			values: { email: req.body.email },
		})
		return
	}

	req.session.userId = user._id

	res.redirect(redirectUrl || '/')
}

export function logoutActionController(req, res, next) {
	req.session.regenerate(err => {
		if (err) {
			next(err)
			return
		}
		res.redirect('/')
	})
}
