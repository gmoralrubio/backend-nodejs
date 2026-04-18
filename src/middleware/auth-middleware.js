import session from 'express-session'
// Aunque se reinicie el servidor, la sesion no se pierde
// se almacena en DB
import ConnectMongo from 'connect-mongo'

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2

// Hay que evitar que un usuario no logado pueda acceder a urls privadas
// Este middleware hay que usarlo de manera específica, no puede afectar a todas las rutas
export function guard(req, res, next) {
	// Si el usuario intenta ir a una url y no está logado, le vamos a redirigir al login,
	// guardando la url a la que quería ir para que, en caso de lagarse, mandarle allí
	const redirectUrl = `/login?redirect=${encodeURIComponent(req.originalUrl)}`

	if (!req.session.userId) {
		// No hay login
		res.redirect(redirectUrl) // redirigimos a login
		return
	}
	// Si si tienes un usuario, sigues
	next()
}

// Crea la session
export const sessionMiddleware = session({
	name: 'kc20-nodejs',
	secret: process.env.SESSION_SECRET || 'secret',
	saveUninitialized: true, // crea la cookie si no esta creada
	resave: true, // en caso de que expire, la volvemos a guardar
	cookie: {
		maxAge: INACTIVITY_2_DAYS,
	},
	// Almacenamos la sesion en la DB
	store: ConnectMongo.create({
		mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017',
	}),
})

// Almacenamos la sesion de la request en res.locals para usarlo en una vista
export function sessionInViews(req, res, next) {
	res.locals.session = req.session
	next()
}
