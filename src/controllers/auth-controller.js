import { User } from '../models/user-model.js'

export async function loginPageController(req, res, next) {
	res.render('login.html', {
		title: 'Inicia sesión',
		values: {},
	})
}

export async function loginActionController(req, res, next) {
	// almacenamos la url de redirect en caso de que la tenga
	// usamos req.query, que es un query param (?redirect=)
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
	// Vinculamos el usuario a la session, asi podemos saber quien está logado
	req.session.userId = user._id
	console.log(req.session)

	res.redirect(redirectUrl || '/')
}

export function logoutActionController(req, res, next) {
	// req.session es la sesion del usuario
	// Metodo para regenerar la session vacía
	req.session.regenerate(err => {
		// Si falla la regeneracion...
		if (err) {
			next(err)
			return
		}
		// La session se ha borrado bien, enviamos al usuario a la home
		res.redirect('/')
	})
}
