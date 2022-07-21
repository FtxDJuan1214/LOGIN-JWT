import {Router} from 'express'
import {
    index, 
    login, 
    register, 
    registerUser,
    loginUser, 
    logout
} from '../controllers/aut.controller'

import { isAuthenticated } from "../middlewares/auth.middleware"

const router = Router()

router.get('/', isAuthenticated, index)

router.get('/login', login)

router.post('/login', loginUser)

router.get('/register', register)

router.post('/register', registerUser)

router.get('/logout', logout)

export default router