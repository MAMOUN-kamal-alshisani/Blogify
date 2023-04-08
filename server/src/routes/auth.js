import { signup,signin,signout } from "../controllers/auth.js";
import express from 'express'
export const authRoute = express.Router()

authRoute.post('/api/signup',signup)
authRoute.post('/api/signin',signin)
authRoute.post('/api/signout',signout)

