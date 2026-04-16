import mongoose, { Schema } from 'mongoose'
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
			type: String,
		},
	},
	{ timestamps: true },
)

export const User = mongoose.models.User || mongoose.model(MODELS.USER, userSchema)
