// importamos mongoose y el esquema
import mongoose, { Schema } from 'mongoose'

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
	},
	{ timestamps: true },
)

// Model (contenedor o generador)
// Es una clase, va en mayus la primera letra.
// le damos un nombre ('Task) y un Schema (taskSchema)
// Del esquema hacemos un modelo
// Este es el fichero que usaremos cuando queramos usar las tareas
// Nos aseguramos que solo se instancie una vez
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema)
