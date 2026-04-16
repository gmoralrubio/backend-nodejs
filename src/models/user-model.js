import mongoose, { Schema } from 'mongoose'
import { hash, compare } from 'bcrypt'
import { MODELS } from './models.js'

// name, email, password
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			unique: true, // no podemos tener dos emails iguales, lo gestiona la DB
		},
		password: {
			type: String, // Guardar encriptado con bcrypt
		},
	},
	{ timestamps: true },
)

// HASH
// Dado un input dado, siempre devuelve el mismo output
// Desde el output no puedes sacar el input
// Se trata de un método asimétrico

// Mongoose nos permite añadir metodos custom al modelo
// Hay de dos tipos:
// - Métodos que dependen de la clase: Task.find({})
// - Metodos que dependen de la instancia: task.save()

// Lo añadiremos a la instancia cuando tengamos que operar el metodo desde la instancia

// hash:
function hashPassword(clearPassword) {
	return hash(clearPassword, 7)
}

// Metodo de clase
// Lo declaramos como arrow para que no tenga contexto, por el this
// userSchema.statics es un objeto donde almacena metodos de clase
userSchema.statics.hashPassword = clearPassword => {
	return hash(clearPassword, 7)
}

// compare -> determina si el origen es el mismo
// Necesito acceder a la propia instncia para concer su hash
// function comparePassword(plainPassword, hash) {
// 	return compare(plainPassword, hash)
// }

// Metodo de instancia
// Al estar dentro de una instancia, this es el usuario
// userSchema.methods es un objeto con los metodos de instancia
// Al ser una instancia, ya tiene su password hasehada para comparar
userSchema.methods.comparePassword = function (plainPassword) {
	return compare(plainPassword, this.password)
}

export const User = mongoose.models.User || mongoose.model(MODELS.USER, userSchema)
