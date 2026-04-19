import mongoose, { Schema } from 'mongoose'
import { MODELS } from './models.js'

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
		owner: {
			type: Schema.Types.ObjectId,
			ref: MODELS.USER,
		},
	},
	{ timestamps: true },
)

export const Task = mongoose.models.Task || mongoose.model(MODELS.TASK, taskSchema)
