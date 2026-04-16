// importamos mongoose y el esquema
import mongoose, { Schema } from 'mongoose'
import { MODELS } from './models.js'

// Un modelo de mongoose se compone de dos piezas
// Un esquema, que es la estructura y un modelo, que es el que se conecta a la base de datos

// Schema (molde o plantilla)
// Definimos la forma que tendran las tareas
const taskSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		done: {
			type: Boolean,
			default: false,
		},
		// Relacionamos Task con User
		owner: {
			type: Schema.Types.ObjectId, // indicamos que es un _id para la relacion
			ref: MODELS.USER, // referenciamos a user
		},
	},
	{ timestamps: true },
)

// Model (contenedor o generador)
// Es una clase, va en mayus la primera letra.
// le damos un nombre ('Task) y un Schema (taskSchema)
// Del esquema hacemos un modelo
// Este es el fichero que usaremos cuando queramos usar las tareas
// Nos aseguramos que solo se instancie una vez
export const Task = mongoose.models.Task || mongoose.model(MODELS.TASK, taskSchema)
