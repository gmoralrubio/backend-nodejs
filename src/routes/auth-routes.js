import express from 'express'
import {
	loginActionController,
	loginPageController,
} from '../controllers/auth-controller.js'

export const authRouter = express.Router()

authRouter.get('/login', loginPageController)
authRouter.post('/login', loginActionController)
