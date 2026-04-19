import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

export async function connectToDB() {
	const mongooseInstance = await mongoose.connect(MONGODB_URI, {
		dbName: process.env.DB_NAME || 'demo',
	})

	console.log('Connected to MongoDB')

	return mongooseInstance.connection
}
