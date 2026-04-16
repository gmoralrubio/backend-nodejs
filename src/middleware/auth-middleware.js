import session from 'express-session'
// Aunque se reinicie el servidor, la sesion no se pierde
// se almacena en DB
import ConnectMongo from 'connect-mongo'

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2

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
