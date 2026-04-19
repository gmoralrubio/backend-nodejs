import app from '../app.js'
import { connectToDB } from '../lib/database.js'

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '127.0.0.1'

await connectToDB()

app.listen(PORT, HOST, () => {
	console.log(`Express.js app listening on http://${HOST}:${PORT}`)
})
